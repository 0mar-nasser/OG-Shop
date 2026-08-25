import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'لم يتم إرسال أي ملف' },
        { status: 400 }
      );
    }

    // Validate type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'يجب اختيار ملف صورة صالح (PNG, JPG, WEBP, etc.)' },
        { status: 400 }
      );
    }

    // Validate size (e.g. 10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'حجم الصورة كبير جداً. الحد الأقصى هو 10 ميجابايت' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    // Generate safe unique filename
    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const ext = path.extname(originalName) || '.png';
    const baseName = path.basename(originalName, ext);
    const uniqueName = `${baseName}_${Date.now()}${ext}`;

    const filePath = path.join(uploadsDir, uniqueName);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${uniqueName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء رفع الصورة. يرجى المحاولة لاحقاً.' },
      { status: 500 }
    );
  }
}
