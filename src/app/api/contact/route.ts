import { NextRequest, NextResponse } from 'next/server';
import { sendContactMessageEmail } from '@/lib/mail';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'الاسم مطلوب' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.trim() || !email.includes('@')) {
      return NextResponse.json({ error: 'يرجى إدخال بريد إلكتروني صحيح' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'نص الرسالة مطلوب' }, { status: 400 });
    }

    const emailResult = await sendContactMessageEmail({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : undefined,
      subject: subject ? subject.trim() : 'استفسار عام',
      message: message.trim(),
    });

    if (!emailResult.success) {
      console.error('[Contact API] Failed to send email:', emailResult.error);
      return NextResponse.json(
        { error: emailResult.error || 'تعذر إرسال الرسالة حالياً، يرجى المحاولة لاحقاً أو التواصل عبر واتساب.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'تم استلام رسالتك وإرسالها بنجاح إلى فريق الدعم.',
      simulated: emailResult.simulated,
    });
  } catch (error: any) {
    console.error('[Contact API] Internal error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع أثناء معالجة الطلب.' },
      { status: 500 }
    );
  }
}
