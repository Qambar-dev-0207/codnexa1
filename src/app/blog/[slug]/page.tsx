'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Tag, ArrowUpRight } from 'lucide-react';
import { BlogArticle } from '@/lib/samplePosts';

function renderFormattedContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      elements.push(<div key={`space-${idx}`} style={{ height: 16 }} />);
    } else if (trimmed.startsWith('### ')) {
      elements.push(
        <h3
          key={`h3-${idx}`}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.8rem',
            fontWeight: 400,
            lineHeight: 1.3,
            color: 'var(--text)',
            marginTop: 28,
            marginBottom: 14,
          }}
        >
          {trimmed.replace('### ', '')}
        </h3>
      );
    } else if (trimmed.startsWith('## ')) {
      elements.push(
        <h2
          key={`h2-${idx}`}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2.2rem',
            fontWeight: 300,
            lineHeight: 1.2,
            color: 'var(--text)',
            marginTop: 36,
            marginBottom: 16,
          }}
        >
          {trimmed.replace('## ', '')}
        </h2>
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      elements.push(
        <li
          key={`li-${idx}`}
          style={{
            marginLeft: 20,
            marginBottom: 8,
            color: 'var(--text-2)',
            fontSize: '1.05rem',
            lineHeight: 1.7,
          }}
        >
          {trimmed.replace(/^[-*]\s+/, '')}
        </li>
      );
    } else if (/^\d+\.\s+/.test(trimmed)) {
      elements.push(
        <li
          key={`oli-${idx}`}
          style={{
            marginLeft: 24,
            marginBottom: 8,
            color: 'var(--text-2)',
            fontSize: '1.05rem',
            lineHeight: 1.7,
          }}
        >
          {trimmed.replace(/^\d+\.\s+/, '')}
        </li>
      );
    } else if (/^!\[(.*?)\]\((.*?)\)$/.test(trimmed)) {
      const match = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
      const alt = match ? match[1] : 'Article image';
      const src = match ? match[2] : '';
      elements.push(
        <div key={`img-${idx}`} style={{ marginTop: 24, marginBottom: 24, borderRadius: 2, overflow: 'hidden', border: '1px solid var(--border)' }}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', maxHeight: 520, objectFit: 'cover', display: 'block' }}
          />
        </div>
      );
    } else {
      elements.push(
        <p
          key={`p-${idx}`}
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.75,
            color: 'var(--text-2)',
            marginBottom: 16,
          }}
        >
          {trimmed}
        </p>
      );
    }
  });

  return elements;
}

export default function SingleBlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/blogs/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setPost(data.data);
        } else {
          setError(data.error || 'Post not found');
        }
      })
      .catch((err) => {
        console.error('Error fetching post:', err);
        setError('Failed to load article');
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{ paddingTop: 160, paddingBottom: 100, textAlign: 'center', color: 'var(--text-3)' }}>
        Loading article...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ paddingTop: 160, paddingBottom: 100, textAlign: 'center', maxWidth: 600, marginInline: 'auto' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: 16, color: 'var(--text)' }}>Article Not Found</h2>
        <p style={{ color: 'var(--text-2)', marginBottom: 24 }}>The article you are looking for does not exist or has been removed.</p>
        <Link href="/blog" className="btn btn-primary">
          <ArrowLeft size={16} /> Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <article style={{ paddingTop: 120, paddingBottom: 120 }}>
      <div style={{ maxWidth: 840, marginInline: 'auto', paddingInline: 'var(--gutter)' }}>
        
        {/* Back Link */}
        <Link
          href="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: '0.85rem',
            color: 'var(--text-2)',
            textDecoration: 'none',
            marginBottom: 32,
            transition: 'color 0.2s',
          }}
        >
          <ArrowLeft size={16} /> Back to all articles
        </Link>

        {/* Article Meta Header */}
        <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ background: 'var(--accent)', color: '#fff', fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: 2, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {post.category}
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-3)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Calendar size={13} /> {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-3)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Clock size={13} /> {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 300, lineHeight: 1.15, marginBottom: 24, letterSpacing: '-0.02em', color: 'var(--text)' }}>
          {post.title}
        </h1>

        {/* Author Line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 32, borderBottom: '1px solid var(--border)', marginBottom: 40 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
            {post.author.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)' }}>{post.author}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>Codnexa Engineering & Design</div>
          </div>
        </div>

        {/* Cover Image */}
        {post.coverImage && (
          <div style={{ marginBottom: 48, borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)' }}>
            <img
              src={post.coverImage}
              alt={post.title}
              style={{ width: '100%', maxHeight: 480, objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}

        {/* Article Body */}
        <div style={{ marginBottom: 60 }}>
          {renderFormattedContent(post.content)}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', paddingTop: 24, borderTop: '1px solid var(--border)', marginBottom: 60 }}>
            <Tag size={14} style={{ color: 'var(--text-3)' }} />
            {post.tags.map((t) => (
              <span key={t} style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-mid)', color: 'var(--text-2)', fontSize: '0.78rem', padding: '4px 12px', borderRadius: 2 }}>
                {t}
              </span>
            ))}
          </div>
        )}

        {/* CTA Card */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 36, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--text)' }}>
            Building an ambitious digital product?
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-2)', lineHeight: 1.6 }}>
            Codnexa helps forward-thinking companies design, architect, and ship high-performance software applications.
          </p>
          <div style={{ paddingTop: 8 }}>
            <Link href="/contact" className="btn btn-primary" style={{ display: 'inline-flex' }}>
              Start a Conversation <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </article>
  );
}
