import nodemailer from 'nodemailer';
import { Resend } from 'resend';

export interface OrderEmailItem {
  name: string;
  image?: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

export interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  city: string;
  address: string;
  paymentMethod: string;
  paymentStatus: string;
  subtotal: number;
  discount: number;
  couponCode?: string | null;
  shipping: number;
  total: number;
  items: OrderEmailItem[];
  createdAt?: Date | string;
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

/**
 * Creates Nodemailer Transporter using Gmail SMTP or custom configuration
 */
function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Sends a detailed new order notification email to the admin
 */
export async function sendOrderNotificationEmail(orderData: OrderEmailData) {
  try {
    const recipientEmail =
      process.env.ADMIN_NOTIFICATION_EMAIL ||
      process.env.GMAIL_USER ||
      'omaraboghazi192002@gmail.com';

    const resend = getResendClient();
    const transporter = !resend ? createTransporter() : null;

    if (!resend && !transporter) {
      // In test/development mode without SMTP credentials:
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🔔 [إشعار طلب جديد وارد - وضع الاختبار]');
      console.log(`📧 سيتم إرسال الإشعار إلى: ${recipientEmail}`);
      console.log(`📦 رقم الطلب: ${orderData.orderNumber}`);
      console.log(`👤 العميل: ${orderData.customerName} (${orderData.customerPhone} | ${orderData.customerEmail})`);
      console.log(`📍 العنوان: ${orderData.city} - ${orderData.address}`);
      console.log(`💰 الإجمالي: ${orderData.total} درهم (طريقة الدفع: ${orderData.paymentMethod})`);
      console.log(`🛍️ عدد المنتجات: ${orderData.items.length}`);
      console.log('💡 ملاحظة: لتفعيل الإرسال الحقيقي عبر Resend، أضف RESEND_API_KEY في ملف .env');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      return { success: true, simulated: true, recipient: recipientEmail };
    }


    const paymentMethodLabel =
      orderData.paymentMethod === 'STRIPE' || orderData.paymentMethod === 'card'
        ? 'بطاقة بنكية (Stripe)'
        : 'الدفع عند الاستلام (COD)';

    const paymentStatusLabel =
      orderData.paymentStatus === 'PAID' ? 'تم الدفع بنجاح (PAID)' : 'بانتظار الدفع (PENDING)';

    const itemsHtml = orderData.items
      .map(
        (item) => `
        <tr style="border-bottom: 1px solid #E7E5E4;">
          <td style="padding: 12px 8px; text-align: right;">
            <div style="display: flex; align-items: center; gap: 12px;">
              ${item.image
            ? `<img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; border: 1px solid #E7E5E4;" />`
            : ''
          }
              <div>
                <strong style="color: #1C1917; font-size: 14px; display: block;">${item.name}</strong>
                <span style="color: #78716C; font-size: 12px;">المقاس: <b>${item.size}</b> | اللون: <b>${item.color}</b></span>
              </div>
            </div>
          </td>
          <td style="padding: 12px 8px; text-align: center; color: #1C1917; font-weight: bold;">${item.quantity}</td>
          <td style="padding: 12px 8px; text-align: center; color: #78716C;">${item.price} درهم</td>
          <td style="padding: 12px 8px; text-align: left; font-weight: bold; color: #1C1917;">${(item.price * item.quantity).toFixed(2)} درهم</td>
        </tr>
      `
      )
      .join('');

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #FAF7F2; margin: 0; padding: 20px; direction: rtl; }
        .container { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #E7E5E4; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background: #1C1917; color: #FAF7F2; padding: 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; }
        .header p { margin: 6px 0 0 0; font-size: 13px; color: #D7C4B7; }
        .section { padding: 20px 24px; border-bottom: 1px solid #F5F5F4; }
        .customer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .info-card { background: #FAF7F2; padding: 12px 16px; border-radius: 12px; border: 1px solid #E7E5E4; }
        .info-title { font-size: 11px; color: #78716C; margin-bottom: 4px; font-weight: bold; }
        .info-value { font-size: 13px; color: #1C1917; font-weight: bold; }
        table { width: 100%; border-collapse: collapse; margin-top: 12px; }
        th { background: #F5F5F4; padding: 10px 8px; font-size: 12px; color: #44403C; text-align: right; }
        .total-box { background: #FAF7F2; border-radius: 12px; padding: 16px; margin-top: 16px; border: 1px solid #E7E5E4; }
        .total-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; color: #57534E; }
        .grand-total { font-size: 18px; font-weight: 800; color: #1C1917; border-top: 2px solid #E7E5E4; padding-top: 10px; margin-top: 8px; }
        .cta-btn { display: inline-block; background: #1C1917; color: #ffffff; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 14px; margin-top: 16px; }
        .footer { text-align: center; padding: 16px; font-size: 11px; color: #A8A29E; }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <h1>🎉 إشعار بطلب جديد وارد!</h1>
          <p>رقم الطلب: <strong style="color: #ffffff; font-family: monospace; font-size: 16px;">${orderData.orderNumber}</strong></p>
        </div>

        <!-- Customer Details -->
        <div class="section">
          <h2 style="font-size: 16px; color: #1C1917; margin-top: 0; margin-bottom: 12px;">👤 بيانات العميل والشحن:</h2>
          <div class="customer-grid">
            <div class="info-card">
              <div class="info-title">اسم العميل</div>
              <div class="info-value">${orderData.customerName}</div>
            </div>
            <div class="info-card">
              <div class="info-title">رقم الهاتف</div>
              <div class="info-value" dir="ltr" style="text-align: right;">
                <a href="tel:${orderData.customerPhone}" style="color: #1C1917; text-decoration: none;">${orderData.customerPhone}</a>
                <a href="https://wa.me/${orderData.customerPhone.replace(/[^0-9]/g, '')}" style="color: #16A34A; margin-right: 8px; font-size: 11px; font-weight: bold; text-decoration: underline;">[واتساب]</a>
              </div>
            </div>
            <div class="info-card">
              <div class="info-title">البريد الإلكتروني</div>
              <div class="info-value"><a href="mailto:${orderData.customerEmail}" style="color: #1C1917; text-decoration: none;">${orderData.customerEmail}</a></div>
            </div>
            <div class="info-card">
              <div class="info-title">المدينة / العنوان</div>
              <div class="info-value">${orderData.city} - ${orderData.address}</div>
            </div>
            <div class="info-card">
              <div class="info-title">طريقة الدفع</div>
              <div class="info-value">${paymentMethodLabel}</div>
            </div>
            <div class="info-card">
              <div class="info-title">حالة الدفع</div>
              <div class="info-value" style="color: ${orderData.paymentStatus === 'PAID' ? '#16A34A' : '#D97706'};">${paymentStatusLabel}</div>
            </div>
          </div>
        </div>

        <!-- Items Table -->
        <div class="section">
          <h2 style="font-size: 16px; color: #1C1917; margin-top: 0; margin-bottom: 12px;">🛍️ المنتجات المطلوبة (${orderData.items.length}):</h2>
          <table>
            <thead>
              <tr>
                <th style="text-align: right;">المنتج</th>
                <th style="text-align: center;">الكمية</th>
                <th style="text-align: center;">السعر</th>
                <th style="text-align: left;">الإجمالي</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <!-- Financial Breakdown -->
          <div class="total-box">
            <div class="total-row">
              <span>المجموع الفرعي (قبل الخصم):</span>
              <strong>${orderData.subtotal.toFixed(2)} درهم</strong>
            </div>

            ${orderData.discount > 0
        ? `
            <div class="total-row" style="color: #16A34A;">
              <span>خصم الكوبون ${orderData.couponCode ? `(${orderData.couponCode})` : ''}:</span>
              <strong>-${orderData.discount.toFixed(2)} درهم</strong>
            </div>
            `
        : ''
      }

            <div class="total-row">
              <span>رسوم الشحن والتوصيل:</span>
              <strong>${orderData.shipping === 0 ? 'مجاني' : `${orderData.shipping.toFixed(2)} درهم`}</strong>
            </div>

            <div class="total-row grand-total">
              <span>المبلغ الإجمالي النهائي:</span>
              <span style="color: #9E866C;">${orderData.total.toFixed(2)} درهم</span>
            </div>
          </div>

          <div style="text-align: center; margin-top: 20px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/orders" class="cta-btn">
              عرض الطلب في لوحة الإدارة ←
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          هذا إشعار تلقائي صادر من منصة المتجر الإلكتروني راقِي (RAQI).
        </div>
      </div>
    </body>
    </html>
    `;

    if (resend) {
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'متجر راقِي <onboarding@resend.dev>';
      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: [recipientEmail],
        subject: `🛍️ طلب جديد وارد #${orderData.orderNumber} - ${orderData.customerName} (${orderData.total} درهم)`,
        html: htmlContent,
      });

      if (error) {
        throw new Error(error.message);
      }

      console.log(`[Resend Service] Order notification email sent successfully for #${orderData.orderNumber}: ${data?.id}`);
      return { success: true, messageId: data?.id };
    }

    if (transporter) {
      const info = await transporter.sendMail({
        from: `"متجر راقِي" <${process.env.GMAIL_USER}>`,
        to: recipientEmail,
        subject: `🛍️ طلب جديد وارد #${orderData.orderNumber} - ${orderData.customerName} (${orderData.total} درهم)`,
        html: htmlContent,
      });

      console.log(`[Mail Service] Order notification email sent successfully for #${orderData.orderNumber}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    }

    return { success: true, simulated: true };
  } catch (error: any) {
    console.error('[Mail Service] Error sending order notification email:', error);
    return { success: false, error: error.message };
  }
}

export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

/**
 * Sends a contact form message email to the admin (omaraboghazi192002@gmail.com) via Resend
 */
export async function sendContactMessageEmail(data: ContactEmailData) {
  try {
    const recipientEmail =
      process.env.ADMIN_NOTIFICATION_EMAIL ||
      process.env.GMAIL_USER ||
      'omaraboghazi192002@gmail.com';

    const resend = getResendClient();
    const transporter = !resend ? createTransporter() : null;

    if (!resend && !transporter) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📩 [رسالة تواصل جديدة واردة - وضع الاختبار]');
      console.log(`📧 المستلم: ${recipientEmail}`);
      console.log(`👤 الاسم: ${data.name}`);
      console.log(`✉️ البريد: ${data.email}`);
      console.log(`📱 الهاتف: ${data.phone || 'غير محدد'}`);
      console.log(`📌 الموضوع: ${data.subject}`);
      console.log(`💬 نص الرسالة:\n${data.message}`);
      console.log('💡 ملاحظة: لتفعيل الإرسال الحقيقي، أضف RESEND_API_KEY في ملف .env');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      return { success: true, simulated: true, recipient: recipientEmail };
    }

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #FAF7F2; margin: 0; padding: 20px; direction: rtl; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #E7E5E4; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background: #1C1917; color: #FAF7F2; padding: 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 20px; color: #ffffff; }
        .header p { margin: 6px 0 0 0; font-size: 13px; color: #D7C4B7; }
        .section { padding: 24px; }
        .info-card { background: #FAF7F2; padding: 14px 18px; border-radius: 12px; border: 1px solid #E7E5E4; margin-bottom: 12px; }
        .info-title { font-size: 11px; color: #78716C; margin-bottom: 4px; font-weight: bold; }
        .info-value { font-size: 14px; color: #1C1917; font-weight: 600; }
        .message-box { background: #ffffff; border: 1px solid #D6D3D1; border-radius: 12px; padding: 18px; font-size: 14px; line-height: 1.7; color: #292524; white-space: pre-wrap; margin-top: 10px; }
        .reply-btn { display: inline-block; background: #1C1917; color: #ffffff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 13px; margin-top: 16px; }
        .footer { text-align: center; padding: 16px; font-size: 11px; color: #A8A29E; border-top: 1px solid #F5F5F4; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📩 رسالة جديدة من نموذج التواصل</h1>
          <p>متجر راقِي - خدمة العملاء</p>
        </div>

        <div class="section">
          <div class="info-card">
            <div class="info-title">👤 اسم المرسل:</div>
            <div class="info-value">${data.name}</div>
          </div>

          <div class="info-card">
            <div class="info-title">✉️ البريد الإلكتروني:</div>
            <div class="info-value">
              <a href="mailto:${data.email}" style="color: #9E866C; text-decoration: none;">${data.email}</a>
            </div>
          </div>

          ${data.phone
        ? `
          <div class="info-card">
            <div class="info-title">📱 رقم الهاتف / واتساب:</div>
            <div class="info-value" dir="ltr" style="text-align: right;">
              <a href="tel:${data.phone}" style="color: #1C1917; text-decoration: none;">${data.phone}</a>
              <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}" style="color: #16A34A; margin-right: 10px; font-size: 12px; text-decoration: underline;">[واتساب]</a>
            </div>
          </div>
          `
        : ''
      }

          <div class="info-card">
            <div class="info-title">📌 موضوع الرسالة:</div>
            <div class="info-value">${data.subject}</div>
          </div>

          <div style="margin-top: 18px;">
            <strong style="font-size: 13px; color: #44403C;">💬 نص الرسالة:</strong>
            <div class="message-box">${data.message}</div>
          </div>

          <div style="text-align: center; margin-top: 20px;">
            <a href="mailto:${data.email}?subject=رد: ${encodeURIComponent(data.subject)}" class="reply-btn">
              الرد مباشرة على العميل (${data.email}) ←
            </a>
          </div>
        </div>

        <div class="footer">
          تم إرسال هذه الرسالة عبر نموذج التواصل الخاص بمتجر راقِي.
        </div>
      </div>
    </body>
    </html>
    `;

    if (resend) {
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'متجر راقِي <onboarding@resend.dev>';
      const { data: resendData, error: resendError } = await resend.emails.send({
        from: fromEmail,
        to: [recipientEmail],
        replyTo: data.email,
        subject: `📩 رسالة جديدة من: ${data.name} - ${data.subject}`,
        html: htmlContent,
      });

      if (resendError) {
        throw new Error(resendError.message);
      }

      console.log(`[Resend Service] Contact message email sent successfully: ${resendData?.id}`);
      return { success: true, messageId: resendData?.id };
    }

    if (transporter) {
      const info = await transporter.sendMail({
        from: `"نموذج التواصل - متجر راقِي" <${process.env.GMAIL_USER}>`,
        to: recipientEmail,
        replyTo: data.email,
        subject: `📩 رسالة جديدة من: ${data.name} - ${data.subject}`,
        html: htmlContent,
      });

      console.log(`[Mail Service] Contact message email sent successfully: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    }

    return { success: true, simulated: true };
  } catch (error: any) {
    console.error('[Mail Service] Error sending contact message email:', error);
    return { success: false, error: error.message };
  }
}
