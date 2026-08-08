'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Search, Clock, Tag, Sparkles, Lock } from 'lucide-react';
import { BlogArticle } from '@/lib/samplePosts';

export default function BlogIndexPage() {
  const [posts, setPosts] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setPosts(data.data);
        }
      })
      .catch((err) => console.error('Failed to load blog posts:', err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', 'Engineering', 'Design', 'Strategy'];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const regularPosts = filteredPosts.filter((p) => p._id !== featuredPost?._id);

  return (
    <div style={{ paddingTop: 120, paddingBottom: 100, minHeight: '100vh' }}>
      <div style={{ maxWidth: 'var(--container)', marginInline: 'auto', paddingInline: 'var(--gutter)' }}>
        
        {/* Header Hero */}
        <header style={{ marginBottom: 60, borderBottom: '1px solid var(--border)', paddingBottom: 40 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', border: '1px solid var(--border-mid)', borderRadius: 2, background: 'var(--bg-alt)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: 20 }}>
            <Sparkles size={14} /> Codnexa Insights
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: 20, letterSpacing: '-0.02em' }}>
            Thoughts on Technology, Design & Digital Strategy
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-2)', maxWidth: 680, lineHeight: 1.6 }}>
            Perspectives from our engineers, designers, and strategists building high-fidelity platforms for ambitious brands.
          </p>

          {/* Controls: Search & Category Filter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 40 }} className="blog-controls">
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--surface)', border: '1px solid var(--border)', padding: '10px 16px', gap: 12, maxWidth: 450 }}>
              <Search size={16} style={{ color: 'var(--text-3)' }} />
              <input
                type="text"
                placeholder="Search articles, topics, technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', width: '100%', fontSize: '0.88rem' }}
              />
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    background: selectedCategory === cat ? 'var(--accent)' : 'var(--bg-alt)',
                    color: selectedCategory === cat ? '#ffffff' : 'var(--text-2)',
                    border: '1px solid var(--border-mid)',
                    padding: '8px 18px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    borderRadius: 2,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {loading ? (
          <div style={{ padding: '80px 0', textAlign: 'center', color: 'var(--text-3)' }}>
            Loading articles...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div style={{ padding: '80px 0', textAlign: 'center', color: 'var(--text-2)' }}>
            No articles found matching your query. Try resetting your search filters.
          </div>
        ) : (
          <>
            {/* Featured Post Spotlight (When showing 'All' and no search term) */}
            {selectedCategory === 'All' && !searchTerm && featuredPost && (
              <div style={{ marginBottom: 60 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-3)', marginBottom: 16 }}>
                  Featured Spotlight
                </div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: featuredPost.coverImage ? 'repeat(auto-fit, minmax(320px, 1fr))' : '1fr',
                    gap: 32,
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    padding: 32,
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'border-color 0.3s ease, transform 0.3s ease',
                  }}
                  className="hover-card"
                >
                  {featuredPost.coverImage && (
                    <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: 'var(--bg-alt)', borderRadius: 2 }}>
                      <img
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        loading="lazy"
                        decoding="async"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                      <span style={{ background: 'var(--accent)', color: '#fff', fontSize: '0.68rem', fontWeight: 700, padding: '3px 8px', borderRadius: 2, textTransform: 'uppercase' }}>
                        {featuredPost.category}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-3)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={12} /> {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 400, lineHeight: 1.2, marginBottom: 16, color: 'var(--text)' }}>
                      {featuredPost.title}
                    </h2>

                    <p style={{ fontSize: '0.95rem', color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 24 }}>
                      {featuredPost.excerpt}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-2)' }}>
                        By {featuredPost.author}
                      </span>
                      <span style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        Read Article <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Articles Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 32 }}>
              {(selectedCategory === 'All' && !searchTerm ? regularPosts : filteredPosts).map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    padding: 24,
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'border-color 0.3s ease, transform 0.3s ease',
                  }}
                  className="hover-card"
                >
                  {post.coverImage && (
                    <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: 'var(--bg-alt)', borderRadius: 2, marginBottom: 20 }}>
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <span style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-mid)', color: 'var(--text-2)', fontSize: '0.68rem', fontWeight: 600, padding: '2px 8px', borderRadius: 2, textTransform: 'uppercase' }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 400, lineHeight: 1.3, marginBottom: 12, color: 'var(--text)' }}>
                    {post.title}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 20, flex: 1 }}>
                    {post.excerpt}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: 14, marginTop: 'auto' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>
                      {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span style={{ color: 'var(--accent)', fontSize: '0.82rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      Read <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Footer Admin Link */}
        <div style={{ marginTop: 80, borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>
            Codnexa Insights & Editorial Platform
          </span>
          <Link
            href="/admin/blog"
            style={{ fontSize: '0.8rem', color: 'var(--text-3)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <Lock size={12} /> Admin Portal
          </Link>
        </div>

      </div>

      <style>{`
        .hover-card:hover {
          border-color: var(--accent) !important;
          transform: translateY(-4px);
        }
      `}</style>
    </div>
  );
}
