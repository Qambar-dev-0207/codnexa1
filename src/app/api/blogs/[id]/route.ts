import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import { memoryBlogPosts } from '@/lib/samplePosts';

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || 'codnexa_admin_2026';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const conn = await dbConnect();

    if (conn) {
      // Check if valid ObjectId, else query by slug
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
      const post = isObjectId
        ? await BlogPost.findById(id).lean()
        : await BlogPost.findOne({ slug: id }).lean();

      if (!post) {
        return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, source: 'mongodb', data: post });
    }

    // Memory fallback
    const memoryPost = memoryBlogPosts.find((p) => p._id === id || p.slug === id);
    if (!memoryPost) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, source: 'memory', data: memoryPost });
  } catch (error: any) {
    console.error('API GET /api/blogs/[id] error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const adminKey = req.headers.get('x-admin-key');
    if (adminKey !== ADMIN_SECRET) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Invalid Admin Key' }, { status: 401 });
    }

    const body = await req.json();
    const conn = await dbConnect();

    if (body.title && !body.slug) {
      body.slug = generateSlug(body.title);
    }

    if (conn) {
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
      const updatedPost = isObjectId
        ? await BlogPost.findByIdAndUpdate(id, { $set: body }, { returnDocument: 'after', runValidators: true })
        : await BlogPost.findOneAndUpdate({ slug: id }, { $set: body }, { returnDocument: 'after', runValidators: true });

      if (!updatedPost) {
        return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, source: 'mongodb', data: updatedPost });
    }

    // Memory store update
    const idx = memoryBlogPosts.findIndex((p) => p._id === id || p.slug === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }

    memoryBlogPosts[idx] = {
      ...memoryBlogPosts[idx],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, source: 'memory', data: memoryBlogPosts[idx] });
  } catch (error: any) {
    console.error('API PUT /api/blogs/[id] error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const adminKey = req.headers.get('x-admin-key');
    if (adminKey !== ADMIN_SECRET) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Invalid Admin Key' }, { status: 401 });
    }

    const conn = await dbConnect();

    if (conn) {
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
      const deleted = isObjectId
        ? await BlogPost.findByIdAndDelete(id)
        : await BlogPost.findOneAndDelete({ slug: id });

      if (!deleted) {
        return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, source: 'mongodb', message: 'Post deleted successfully' });
    }

    // Memory store delete
    const idx = memoryBlogPosts.findIndex((p) => p._id === id || p.slug === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }

    memoryBlogPosts.splice(idx, 1);
    return NextResponse.json({ success: true, source: 'memory', message: 'Post deleted successfully' });
  } catch (error: any) {
    console.error('API DELETE /api/blogs/[id] error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
