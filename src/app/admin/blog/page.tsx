'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lock, Plus, Edit3, Trash2, Eye, EyeOff, Sparkles, CheckCircle2, AlertCircle, ArrowLeft, RefreshCw, X, Database } from 'lucide-react';
import { BlogArticle } from '@/lib/samplePosts';

export default function AdminBlogCMSPage() {
  const [passcode, setPasscode] = useState('');
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [authError, setAuthError] = useState('');

  const [posts, setPosts] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<string>('unknown');

  // Form State for Create / Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    author: 'Codnexa Editorial',
    category: 'Engineering',
    readTime: '5 min read',
    tags: '',
    published: true,
    featured: false,
  });

  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Restore stored session token on mount
  useEffect(() => {
    const storedToken = typeof window !== 'undefined' ? sessionStorage.getItem('codnexa_admin_token') : null;
    if (storedToken) {
      setAdminToken(storedToken);
    }
  }, []);

  // Fetch all posts (including drafts) when authenticated
  const fetchAdminPosts = () => {
    if (!adminToken) return;
    setLoading(true);
    fetch('/api/blogs?admin=true')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setPosts(data.data);
          setDataSource(data.source || 'mongodb');
        }
      })
      .catch((err) => console.error('Failed to fetch admin posts:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (adminToken) {
      fetchAdminPosts();
    }
  }, [adminToken]);

  // Handle Login
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/blogs/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        setAdminToken(data.token);
        sessionStorage.setItem('codnexa_admin_token', data.token);
      } else {
        setAuthError(data.error || 'Invalid passcode');
      }
    } catch {
      setAuthError('Authentication failed');
    }
  };

  const handleLogout = () => {
    setAdminToken(null);
    sessionStorage.removeItem('codnexa_admin_token');
  };

  // Open Create Modal
  const openCreateModal = () => {
    setEditingPostId(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      coverImage: '',
      author: 'Codnexa Editorial',
      category: 'Engineering',
      readTime: '5 min read',
      tags: 'Engineering, Architecture',
      published: true,
      featured: false,
    });
    setModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (post: BlogArticle) => {
    setEditingPostId(post._id);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage || '',
      author: post.author || 'Codnexa Editorial',
      category: post.category || 'Engineering',
      readTime: post.readTime || '5 min read',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
      published: post.published,
      featured: post.featured,
    });
    setModalOpen(true);
  };

  // Handle Save (Create or Update)
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;

    setSaving(true);
    setStatusMessage(null);

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    try {
      const url = editingPostId ? `/api/blogs/${editingPostId}` : '/api/blogs';
      const method = editingPostId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminToken,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setStatusMessage({
          type: 'success',
          text: editingPostId ? 'Article updated successfully!' : 'New article created successfully!',
        });
        setModalOpen(false);
        fetchAdminPosts();
      } else {
        setStatusMessage({ type: 'error', text: data.error || 'Failed to save post' });
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Error communicating with server' });
    } finally {
      setSaving(false);
    }
  };

  // Toggle Published Status
  const handleTogglePublish = async (post: BlogArticle) => {
    if (!adminToken) return;
    try {
      const res = await fetch(`/api/blogs/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminToken,
        },
        body: JSON.stringify({ published: !post.published }),
      });
      const data = await res.json();
      if (data.success) {
        fetchAdminPosts();
      }
    } catch (err) {
      console.error('Failed to toggle publish:', err);
    }
  };

  // Delete Post
  const handleDeletePost = async (post: BlogArticle) => {
    if (!adminToken) return;
    if (!confirm(`Are you sure you want to delete "${post.title}"?`)) return;

    try {
      const res = await fetch(`/api/blogs/${post._id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminToken },
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage({ type: 'success', text: 'Post deleted successfully.' });
        fetchAdminPosts();
      } else {
        setStatusMessage({ type: 'error', text: data.error || 'Delete failed' });
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // 1. Passcode Screen
  if (!adminToken) {
    return (
      <div style={{ paddingTop: 160, paddingBottom: 100, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 420, width: '100%', marginInline: 'auto', padding: 36, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--accent)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>
            <Lock size={16} /> Admin Portal Authentication
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 400, marginBottom: 12 }}>
            Codnexa Blog CMS
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 24 }}>
            Enter your admin secret key to access the content management system.
          </p>

          <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 6 }}>
                Admin Passcode
              </label>
              <input
                type="password"
                placeholder="Enter admin key..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
              <span style={{ fontSize: '0.72rem', color: 'var(--text-3)', marginTop: 4, display: 'block' }}>
                Default key: <code>codnexa_admin_2026</code>
              </span>
            </div>

            {authError && (
              <div style={{ color: '#ef4444', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                <AlertCircle size={14} /> {authError}
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Authenticate CMS
            </button>
          </form>

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Link href="/blog" style={{ fontSize: '0.8rem', color: 'var(--text-3)', textDecoration: 'none' }}>
              ← Return to Public Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Admin Dashboard
  return (
    <div style={{ paddingTop: 120, paddingBottom: 100, minHeight: '100vh' }}>
      <div style={{ maxWidth: 'var(--container)', marginInline: 'auto', paddingInline: 'var(--gutter)' }}>
        
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 40, borderBottom: '1px solid var(--border)', paddingBottom: 24 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 400 }}>
                Blog Content Management
              </h1>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: dataSource === 'mongodb' ? 'rgba(34,197,94,0.1)' : 'rgba(234,179,8,0.1)', color: dataSource === 'mongodb' ? '#22c55e' : '#eab308', border: '1px solid currentColor', fontSize: '0.72rem', fontWeight: 600, borderRadius: 2 }}>
                <Database size={12} /> {dataSource === 'mongodb' ? 'MongoDB Atlas Connected' : 'Sample Data Mode'}
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-2)' }}>
              Create, edit, toggle publish status, and remove blog posts.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={fetchAdminPosts} style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)', padding: '8px 14px', fontSize: '0.8rem', color: 'var(--text-2)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <RefreshCw size={14} /> Refresh
            </button>
            <button onClick={openCreateModal} className="btn btn-primary" style={{ fontSize: '0.82rem', padding: '9px 18px' }}>
              <Plus size={16} /> New Article
            </button>
            <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-3)', padding: '8px 14px', fontSize: '0.8rem', cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        </div>

        {/* Status Alert Banner */}
        {statusMessage && (
          <div style={{ padding: '12px 18px', background: statusMessage.type === 'success' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${statusMessage.type === 'success' ? '#22c55e' : '#ef4444'}`, color: statusMessage.type === 'success' ? '#22c55e' : '#ef4444', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{statusMessage.text}</span>
            <X size={16} style={{ cursor: 'pointer' }} onClick={() => setStatusMessage(null)} />
          </div>
        )}

        {/* Posts Table */}
        {loading ? (
          <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--text-3)' }}>Loading CMS records...</div>
        ) : posts.length === 0 ? (
          <div style={{ padding: '60px 0', textAlign: 'center', background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <p style={{ color: 'var(--text-2)', marginBottom: 16 }}>No blog articles currently stored.</p>
            <button onClick={openCreateModal} className="btn btn-primary">
              <Plus size={16} /> Create Your First Article
            </button>
          </div>
        ) : (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-alt)', color: 'var(--text-3)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '14px 20px' }}>Title & Category</th>
                  <th style={{ padding: '14px 20px' }}>Author</th>
                  <th style={{ padding: '14px 20px' }}>Status</th>
                  <th style={{ padding: '14px 20px' }}>Date</th>
                  <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post._id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
                        {post.title} {post.featured && <span style={{ color: 'var(--accent)', fontSize: '0.7rem', border: '1px solid var(--accent)', padding: '1px 5px', marginLeft: 6 }}>FEATURED</span>}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>
                        Category: {post.category} | Read: {post.readTime}
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', color: 'var(--text-2)' }}>{post.author}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <button
                        onClick={() => handleTogglePublish(post)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: post.published ? '#22c55e' : '#eab308',
                        }}
                      >
                        {post.published ? <Eye size={14} /> : <EyeOff size={14} />}
                        {post.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td style={{ padding: '16px 20px', color: 'var(--text-3)', fontSize: '0.8rem' }}>
                      {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: 8 }}>
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)', color: 'var(--text-2)', padding: '6px 10px', fontSize: '0.78rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                        >
                          View
                        </Link>
                        <button
                          onClick={() => openEditModal(post)}
                          style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)', color: 'var(--text-2)', padding: '6px 10px', fontSize: '0.78rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                        >
                          <Edit3 size={12} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeletePost(post)}
                          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '6px 10px', fontSize: '0.78rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal for Create / Edit */}
        {modalOpen && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', width: '100%', maxWidth: 720, maxHeight: '90vh', overflowY: 'auto', padding: 32, borderRadius: 2 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 400 }}>
                  {editingPostId ? 'Edit Blog Article' : 'Create New Blog Article'}
                </h3>
                <X size={20} style={{ cursor: 'pointer', color: 'var(--text-3)' }} onClick={() => setModalOpen(false)} />
              </div>

              <form onSubmit={handleSavePost} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 6 }}>
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Article title..."
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 6 }}>
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none' }}
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Strategy">Strategy</option>
                      <option value="Technology">Technology</option>
                      <option value="Culture">Culture</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 6 }}>
                      Read Time
                    </label>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      placeholder="e.g. 5 min read"
                      style={{ width: '100%', padding: '10px 12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* Cover Image Upload */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-3)' }}>
                      Cover Image (Optional)
                    </label>
                    {formData.coverImage && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, coverImage: '' })}
                        style={{ background: 'transparent', border: 'none', color: '#ef4444', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
                      >
                        Remove Image
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                    <input
                      type="url"
                      value={formData.coverImage}
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      placeholder="Paste Image URL or select file below..."
                      style={{ flex: 1, padding: '10px 12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none' }}
                    />
                    <label style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-mid)', padding: '10px 14px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text)', cursor: 'pointer', whiteSpace: 'nowrap', borderRadius: 2 }}>
                      Upload File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setSaving(true);
                          try {
                            const data = new FormData();
                            data.append('file', file);
                            const res = await fetch('/api/upload', { method: 'POST', body: data });
                            const json = await res.json();
                            if (json.success && json.url) {
                              setFormData((prev) => ({ ...prev, coverImage: json.url }));
                            } else {
                              alert(json.error || 'Upload failed');
                            }
                          } catch {
                            alert('Upload error');
                          } finally {
                            setSaving(false);
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>

                  {formData.coverImage ? (
                    <div style={{ position: 'relative', width: 120, height: 70, overflow: 'hidden', border: '1px solid var(--border)', borderRadius: 2 }}>
                      <img src={formData.coverImage} alt="Cover Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-3)' }}>
                      No cover image selected. If left empty, no image will be displayed on the blog post.
                    </span>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 6 }}>
                    Excerpt *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Short summary of the article..."
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-3)' }}>
                      Article Content *
                    </label>
                    <label style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-mid)', padding: '4px 10px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)', cursor: 'pointer', borderRadius: 2 }}>
                      + Bulk Upload Article Images
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={async (e) => {
                          const files = e.target.files;
                          if (!files || files.length === 0) return;
                          setSaving(true);
                          try {
                            const data = new FormData();
                            Array.from(files).forEach((f) => data.append('files', f));
                            const res = await fetch('/api/upload', { method: 'POST', body: data });
                            const json = await res.json();
                            if (json.success && Array.isArray(json.urls)) {
                              const markdownImages = json.urls.map((u: string, idx: number) => `![Uploaded Image ${idx + 1}](${u})`).join('\n\n');
                              setFormData((prev) => ({
                                ...prev,
                                content: prev.content ? `${prev.content}\n\n${markdownImages}` : markdownImages,
                              }));
                            } else {
                              alert(json.error || 'Bulk upload failed');
                            }
                          } catch {
                            alert('Upload error');
                          } finally {
                            setSaving(false);
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                  <textarea
                    required
                    rows={8}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write article content here..."
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none', resize: 'vertical', fontFamily: 'monospace', fontSize: '0.88rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 6 }}>
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 6 }}>
                      Tags (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="Next.js, Design, API"
                      style={{ width: '100%', padding: '10px 12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 24, paddingTop: 10 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    />
                    Published Immediately
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    Featured Article Spotlight
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                  <button type="button" onClick={() => setModalOpen(false)} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-2)', padding: '10px 20px', cursor: 'pointer' }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="btn btn-primary">
                    {saving ? 'Saving...' : editingPostId ? 'Update Article' : 'Publish Article'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
