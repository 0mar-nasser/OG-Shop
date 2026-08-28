import nodemailer from 'nodemailer';

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

/**
 * Creates Nodemailer Transporter using Gmail SMTP or custom configuration
 */
function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.warn('[Mail Service] GMAIL_USER or GMAIL_APP_PASSWORD is not set in .env. Email sending skipped.');
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
 * Sends a detailed new order notification email to the admin's Gmail
 */
export async function sendOrderNotificationEmail(orderData: OrderEmailData) {
  try {
    const recipientEmail =
      process.env.ADMIN_NOTIFICATION_EMAIL ||
      process.env.GMAIL_USER ||
      'omaraboghazi192002@gmail.com';

    const transporter = createTransporter();

    if (!transporter) {
      // In test/development mode without SMTP credentials:
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🔔 [إشعار طلب جديد وارد - وضع الاختبار]');
      console.log(`📧 سيتم إرسال الإشعار إلى: ${recipientEmail}`);
      console.log(`📦 رقم الطلب: ${orderData.orderNumber}`);
      console.log(`👤 العميل: ${orderData.customerName} (${orderData.customerPhone} | ${orderData.customerEmail})`);
      console.log(`📍 العنوان: ${orderData.city} - ${orderData.address}`);
      console.log(`💰 الإجمالي: ${orderData.total} درهم (طريقة الدفع: ${orderData.paymentMethod})`);
      console.log(`🛍️ عدد المنتجات: ${orderData.items.length}`);
      console.log('💡 ملاحظة: لتفعيل الإرسال الحقيقي عبر Gmail، أضف GMAIL_USER و GMAIL_APP_PASSWORD في .env.local');
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
              ${
                item.image
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

            ${
              orderData.discount > 0
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

    const info = await transporter.sendMail({
      from: `"متجر راقِي" <${process.env.GMAIL_USER}>`,
      to: recipientEmail,
      subject: `🛍️ طلب جديد وارد #${orderData.orderNumber} - ${orderData.customerName} (${orderData.total} درهم)`,
      html: htmlContent,
    });

    console.log(`[Mail Service] Order notification email sent successfully for #${orderData.orderNumber}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('[Mail Service] Error sending order notification email:', error);
    return { success: false, error: error.message };
  }
}
