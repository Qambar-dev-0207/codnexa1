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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get('admin') === 'true';

    const conn = await dbConnect();

    if (conn) {
      const query = isAdmin ? {} : { published: true };
      const posts = await BlogPost.find(query).sort({ createdAt: -1 }).lean();
      return NextResponse.json({ success: true, source: 'mongodb', data: posts });
    }

    // Fallback to in-memory store
    const filtered = isAdmin ? memoryBlogPosts : memoryBlogPosts.filter((p) => p.published);
    return NextResponse.json({ success: true, source: 'memory', data: filtered });
  } catch (error: any) {
    console.error('API GET /api/blogs error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const adminKey = req.headers.get('x-admin-key');
    if (adminKey !== ADMIN_SECRET) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Invalid Admin Key' }, { status: 401 });
    }

    const body = await req.json();
    const { title, excerpt, content, coverImage, author, category, readTime, tags, published, featured } = body;

    if (!title || !excerpt || !content) {
      return NextResponse.json({ success: false, error: 'Title, Excerpt, and Content are required fields.' }, { status: 400 });
    }

    const slug = body.slug ? generateSlug(body.slug) : generateSlug(title);
    const conn = await dbConnect();

    if (conn) {
      const existing = await BlogPost.findOne({ slug });
      const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

      const newPost = await BlogPost.create({
        title,
        slug: finalSlug,
        excerpt,
        content,
        coverImage: coverImage || '',
        author: author || 'Codnexa Editorial',
        category: category || 'Engineering',
        readTime: readTime || '5 min read',
        tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : [],
        published: published ?? true,
        featured: featured ?? false,
      });

      return NextResponse.json({ success: true, source: 'mongodb', data: newPost }, { status: 201 });
    }

    // Memory store fallback
    const newMemoryPost = {
      _id: `post-${Date.now()}`,
      title,
      slug: `${slug}-${Date.now()}`,
      excerpt,
      content,
      coverImage: coverImage || '',
      author: author || 'Codnexa Editorial',
      category: category || 'Engineering',
      readTime: readTime || '5 min read',
      tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : [],
      published: published ?? true,
      featured: featured ?? false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    memoryBlogPosts.unshift(newMemoryPost);
    return NextResponse.json({ success: true, source: 'memory', data: newMemoryPost }, { status: 201 });
  } catch (error: any) {
    console.error('API POST /api/blogs error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
