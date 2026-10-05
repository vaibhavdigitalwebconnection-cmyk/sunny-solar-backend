import React, { useEffect, useRef } from 'react';
import { FileText, X, Image as ImageIcon, Upload, Trash2 } from 'lucide-react';
import { BlogFormData, BlogItem, BlogModalTab, categories } from '../types';
import RichTextEditor from './RichTextEditor';
import { api } from '../../../services/api';

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalTab: BlogModalTab;
  setModalTab: (tab: BlogModalTab) => void;
  editingBlog: BlogItem | null;
  formData: BlogFormData;
  setFormData: React.Dispatch<React.SetStateAction<BlogFormData>>;
  formLoading: boolean;
  uploadingBlogImage: boolean;
  handleBlogImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
  applyFormatting?: (field: 'content' | 'longContent', tagStart: string, tagEnd?: string) => void;
  handleInsertLink?: (field: 'content' | 'longContent') => void;
  handleClearFormatting?: (field: 'content' | 'longContent') => void;
  contentRef?: React.RefObject<HTMLTextAreaElement | null>;
}

export const BlogModal: React.FC<BlogModalProps> = ({
  isOpen,
  onClose,
  modalTab,
  setModalTab,
  editingBlog,
  formData,
  setFormData,
  formLoading,
  uploadingBlogImage,
  handleBlogImageUpload,
  handleFormSubmit,
  applyFormatting,
  handleInsertLink,
  handleClearFormatting,
  contentRef
}) => {
  const scrollBodyRef = useRef<HTMLDivElement>(null);

  const uploadBlogImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (file.size > 10 * 1024 * 1024) {
        reject(new Error('Image size should be less than 10MB'));
        return;
      }
      const reader = new FileReader();
      reader.onload = async () => {
        if (typeof reader.result === 'string') {
          const base64Data = reader.result;
          try {
            const res = await api.uploadImage(base64Data, 'sunny-solar/blogs');
            if (res?.url) {
              resolve(res.url);
            } else {
              resolve(base64Data);
            }
          } catch {
            // Fallback to inline base64 data so the editor keeps the image
            resolve(base64Data);
          }
        } else {
          reject(new Error('Failed to read image file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const handleModalWheel = (e: React.WheelEvent) => {
    if (!scrollBodyRef.current) return;
    if (!scrollBodyRef.current.contains(e.target as Node)) {
      scrollBodyRef.current.scrollTop += e.deltaY;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs overflow-hidden"
    >
      <div
        data-lenis-prevent
        onWheel={handleModalWheel}
        className="bg-white rounded-none sm:rounded-2xl w-full max-w-3xl h-full sm:h-auto max-h-dvh sm:max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border-0 sm:border sm:border-slate-200"
      >
        {/* Modal Header (Fixed at top) */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-neutral-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">
                {editingBlog ? 'Edit Blog Article' : 'New Blog Article'}
              </h3>
              <p className="text-[11px] sm:text-xs text-neutral-500">
                Set article details, formatted content, and SEO metadata.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 flex items-center justify-center transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Three Tabs: Blog Info | Content | Meta Tags (Fixed at top) */}
        <div className="px-3 sm:px-6 pt-2 sm:pt-3 border-b border-neutral-200 flex items-center justify-around sm:justify-start gap-2 sm:gap-6 bg-slate-50/70 shrink-0">
          <button
            type="button"
            onClick={() => setModalTab('info')}
            className={`pb-2 text-xs sm:text-sm font-semibold transition-all relative cursor-pointer ${modalTab === 'info' ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-800'
              }`}
          >
            Blog Info
            {modalTab === 'info' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setModalTab('content')}
            className={`pb-2 text-xs sm:text-sm font-semibold transition-all relative cursor-pointer ${modalTab === 'content' ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-800'
              }`}
          >
            Article Content
            {modalTab === 'content' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setModalTab('meta')}
            className={`pb-2 text-xs sm:text-sm font-semibold transition-all relative cursor-pointer ${modalTab === 'meta' ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-800'
              }`}
          >
            SEO & Meta Tags
            {modalTab === 'meta' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
            )}
          </button>
        </div>

        {/* Form Container wrapping scrollable body and fixed footer */}
        <form onSubmit={handleFormSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
          {/* Scrollable Form Body */}
          <div
            ref={scrollBodyRef}
            data-lenis-prevent
            className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 space-y-6 overscroll-contain"
          >
            {/* TAB 1: BLOG INFO */}
            {modalTab === 'info' && (
              <div className="border border-slate-200 rounded-2xl p-6 bg-white space-y-4">
                {/* Blog Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Blog Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        title: val,
                        slug:
                          !editingBlog || !prev.slug
                            ? val
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, '-')
                              .replace(/(^-|-$)+/g, '')
                            : prev.slug
                      }));
                    }}
                    placeholder="e.g. Solar Trends 2024"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
                  />
                </div>

                {/* URL Slug */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    URL Slug <span className="text-slate-400 font-normal">(auto-generated from title)</span>
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 overflow-hidden focus-within:border-amber-500 focus-within:bg-white">
                    <span className="pl-4 pr-1 text-slate-400 font-medium text-xs sm:text-sm  ">
                      /learn/blog/
                    </span>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                        })
                      }
                      placeholder="your-blog-title"
                      className="w-full bg-transparent px-2 py-2.5 text-xs sm:text-sm text-slate-800 font-mono focus:outline-none"
                    />
                  </div>
                </div>

                {/* Category & Read Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                    >
                      {categories
                        .filter((c) => c !== 'All Categories')
                        .map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">Read Time</label>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      placeholder="e.g. 5 min read"
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Author & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">Author Name</label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">Author Role</label>
                    <input
                      type="text"
                      value={formData.authorRole}
                      onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Publish Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Publish Date</label>
                  <input
                    type="text"
                    value={formData.publishDate}
                    onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                    placeholder="e.g. Sep 17, 2026"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Header / Featured Blog Image Upload */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
                      <span>Featured Blog Image</span>
                    </label>
                    {formData.imageUrl && (
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, imageUrl: '' }))}
                        className="text-[11px] text-rose-500 hover:text-rose-700 font-semibold cursor-pointer"
                      >
                        Remove Image
                      </button>
                    )}
                  </div>

                  {/* Preview or Upload Dropzone */}
                  {formData.imageUrl ? (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 group mb-3 bg-slate-50">
                      <img
                        src={formData.imageUrl}
                        alt="Article preview"
                        className="w-full h-44 object-cover"
                        onError={(e: any) => {
                          e.target.src = '/images/blog/default.webp';
                        }}
                      />
                      {uploadingBlogImage && (
                        <div className="absolute inset-0 bg-slate-900/80 flex flex-col items-center justify-center gap-2 text-white z-10 backdrop-blur-xs">
                          <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-xs font-semibold text-amber-300">Uploading to Cloudinary...</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5">
                        <label className="bg-white text-slate-900 hover:bg-slate-100 px-3.5 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5 transition-colors">
                          <Upload className="w-3.5 h-3.5 text-amber-600" />
                          <span>Upload New File</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleBlogImageUpload}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, imageUrl: '' }))}
                          className="bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-amber-500 hover:bg-amber-50/40 rounded-2xl p-6 cursor-pointer transition-all mb-3 text-center group bg-slate-50/60 relative">
                      {uploadingBlogImage ? (
                        <div className="flex flex-col items-center justify-center gap-2 py-4 text-amber-600">
                          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-xs font-bold">Uploading to Cloudinary...</span>
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-bold text-slate-800">
                            Click to upload Article Image
                          </span>
                          <span className="text-[11px] text-slate-400 mt-0.5">
                            Cloudinary Cloud Storage (PNG, JPG, WEBP)
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleBlogImageUpload}
                            className="hidden"
                          />
                        </>
                      )}
                    </label>
                  )}

                  {/* Or enter/edit image URL directly */}
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="Or enter image URL (e.g. /images/blog/... or https://...)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Excerpt / Summary</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Brief summary shown on blog cards..."
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Key Takeaways */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Key Takeaways <span className="text-slate-400 font-normal">(one per line)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.keyTakeaways}
                    onChange={(e) => setFormData({ ...formData, keyTakeaways: e.target.value })}
                    placeholder="Bullet 1&#10;Bullet 2&#10;Bullet 3"
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm text-slate-900 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: CONTENT */}
            {modalTab === 'content' && (
              <div className="border border-slate-200 rounded-2xl p-6 bg-white space-y-4">
                <RichTextEditor
                  label="Article Body Content"
                  placeholder="Write your article body here with rich formatting, headings, lists, links, and images..."
                  value={formData.content}
                  onChange={(html) => setFormData((prev) => ({ ...prev, content: html }))}
                  onUploadImage={uploadBlogImage}
                />
              </div>
            )}

            {/* TAB 3: META TAGS */}
            {modalTab === 'meta' && (
              <div className="border border-slate-200 rounded-2xl p-6 bg-white space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Meta Title</label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    placeholder="SEO Title | Sunny Solar"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Canonical URL</label>
                  <input
                    type="text"
                    value={formData.canonicalUrl}
                    onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                    placeholder="https://sunnysolar.com.au/learn/blog/..."
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Keywords</label>
                  <input
                    type="text"
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    placeholder="solar, panels, battery, inverter"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Meta Description</label>
                  <textarea
                    rows={3}
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    placeholder="Search engine meta description snippet..."
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Schema Markup (JSON-LD)</label>
                  <textarea
                    rows={3}
                    value={formData.schema}
                    onChange={(e) => setFormData({ ...formData, schema: e.target.value })}
                    placeholder='{ "@context": "https://schema.org", ... }'
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm text-slate-900 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            )}

          </div>

          {/* Fixed Modal Footer Actions Bar */}
          <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 z-10">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="modalIsPublished"
                checked={formData.isPublished}
                onChange={(e) => setFormData((prev) => ({ ...prev, isPublished: e.target.checked }))}
                className="w-4 h-4 text-orange-500 rounded border-slate-300 focus:ring-orange-400 cursor-pointer"
              />
              <label htmlFor="modalIsPublished" className="text-xs font-bold text-slate-800 cursor-pointer select-none">
                Publish immediately on live blog
              </label>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-100 font-semibold text-xs sm:text-sm transition-colors cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formLoading}
                className="flex-1 sm:flex-none bg-neutral-900 hover:bg-black text-white font-semibold px-5 py-2.5 rounded-xl shadow-xs disabled:opacity-50 cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                {formLoading && (
                  <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                )}
                <span>{editingBlog ? 'Update Article' : 'Publish Article'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
