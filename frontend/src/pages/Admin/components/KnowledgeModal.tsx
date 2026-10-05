import React, { useEffect, useRef } from 'react';
import {
  BookOpen,
  X,
  Image as ImageIcon,
  Upload,
  Trash2,
  Cpu,
  Sliders,
  Plus,
  Table,
  HelpCircle
} from 'lucide-react';
import {
  KnowledgeFormData,
  KnowledgeItem,
  KnowledgeModalTab,
  MatrixRow,
  categories
} from '../types';
import RichTextEditor from './RichTextEditor';
import { api } from '../../../services/api';

interface KnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  knowledgeModalTab: KnowledgeModalTab;
  setKnowledgeModalTab: (tab: KnowledgeModalTab) => void;
  editingKnowledge: KnowledgeItem | null;
  knowledgeFormData: KnowledgeFormData;
  setKnowledgeFormData: React.Dispatch<React.SetStateAction<KnowledgeFormData>>;
  knowledgeFormLoading: boolean;
  uploadingKnowledgeImage: boolean;
  handleKnowledgeImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showContentPreview?: boolean;
  setShowContentPreview?: (show: boolean) => void;
  handleKnowledgeFormSubmit: (e: React.FormEvent) => void;
  applyKnowledgeFormatting?: (tagStart: string, tagEnd?: string) => void;
  handleInsertKnowledgeLink?: () => void;
  handleClearKnowledgeFormatting?: () => void;
  knowledgeContentRef?: React.RefObject<HTMLTextAreaElement | null>;
  handleAddQuickStat: () => void;
  handleRemoveQuickStat: (index: number) => void;
  handleUpdateQuickStat: (index: number, field: 'label' | 'value', val: string) => void;
  handleUpdateMatrixHeader: (index: number, val: string) => void;
  handleAddMatrixRow: () => void;
  handleRemoveMatrixRow: (index: number) => void;
  handleUpdateMatrixRow: (index: number, field: keyof MatrixRow, val: string) => void;
  handleAddFaq: () => void;
  handleRemoveFaq: (index: number) => void;
  handleUpdateFaq: (index: number, field: 'question' | 'answer', val: string) => void;
}

export const KnowledgeModal: React.FC<KnowledgeModalProps> = ({
  isOpen,
  onClose,
  knowledgeModalTab,
  setKnowledgeModalTab,
  editingKnowledge,
  knowledgeFormData,
  setKnowledgeFormData,
  knowledgeFormLoading,
  uploadingKnowledgeImage,
  handleKnowledgeImageUpload,
  showContentPreview,
  setShowContentPreview,
  handleKnowledgeFormSubmit,
  applyKnowledgeFormatting,
  handleInsertKnowledgeLink,
  handleClearKnowledgeFormatting,
  knowledgeContentRef,
  handleAddQuickStat,
  handleRemoveQuickStat,
  handleUpdateQuickStat,
  handleUpdateMatrixHeader,
  handleAddMatrixRow,
  handleRemoveMatrixRow,
  handleUpdateMatrixRow,
  handleAddFaq,
  handleRemoveFaq,
  handleUpdateFaq
}) => {
  const scrollBodyRef = useRef<HTMLDivElement>(null);

  const uploadKnowledgeImage = async (file: File): Promise<string> => {
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
            const res = await api.uploadImage(base64Data, 'sunny-solar/knowledge');
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
        className="bg-white rounded-none sm:rounded-2xl w-full max-w-4xl h-full sm:h-auto max-h-dvh sm:max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border-0 sm:border sm:border-neutral-200"
      >
        {/* Modal Header (Fixed at top) */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-neutral-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 tracking-tight">
                {editingKnowledge ? 'Edit Technical Guide' : 'Add Technical Field Guide'}
              </h3>
              <span className="text-xs text-neutral-500 block">
                Engineering Blueprints, Decision Matrices & Technical Specifications
              </span>
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

        {/* Four Tabs: Guide Info | Content | Blueprint & Specs | Meta Tags (Fixed at top) */}
        <div className="px-6 pt-3 border-b border-neutral-200 flex items-center gap-6 bg-slate-50/50 overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setKnowledgeModalTab('info')}
            className={`pb-2.5 text-xs font-semibold transition-all relative shrink-0 cursor-pointer ${knowledgeModalTab === 'info'
              ? 'text-neutral-900'
              : 'text-neutral-500 hover:text-neutral-800'
              }`}
          >
            Guide Info
            {knowledgeModalTab === 'info' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setKnowledgeModalTab('content')}
            className={`pb-2.5 text-xs font-semibold transition-all relative shrink-0 cursor-pointer ${knowledgeModalTab === 'content'
              ? 'text-neutral-900'
              : 'text-neutral-500 hover:text-neutral-800'
              }`}
          >
            Content & Body
            {knowledgeModalTab === 'content' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setKnowledgeModalTab('blueprint')}
            className={`pb-2.5 text-xs font-semibold transition-all relative shrink-0 cursor-pointer ${knowledgeModalTab === 'blueprint'
              ? 'text-neutral-900'
              : 'text-neutral-500 hover:text-neutral-800'
              }`}
          >
            Blueprint & Specs
            {knowledgeModalTab === 'blueprint' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setKnowledgeModalTab('meta')}
            className={`pb-2.5 text-xs font-semibold transition-all relative shrink-0 cursor-pointer ${knowledgeModalTab === 'meta'
              ? 'text-neutral-900'
              : 'text-neutral-500 hover:text-neutral-800'
              }`}
          >
            SEO & Meta Tags
            {knowledgeModalTab === 'meta' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
            )}
          </button>
        </div>

        {/* Form Container wrapping scrollable body and fixed footer */}
        <form onSubmit={handleKnowledgeFormSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
          {/* Scrollable Form Body */}
          <div
            ref={scrollBodyRef}
            data-lenis-prevent
            className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 space-y-6 overscroll-contain"
          >
            {/* TAB 1: GUIDE INFO */}
            {knowledgeModalTab === 'info' && (
              <div className="border border-slate-200 rounded-2xl p-6 bg-white space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Guide Title</label>
                  <input
                    type="text"
                    required
                    value={knowledgeFormData.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      setKnowledgeFormData((prev) => ({
                        ...prev,
                        title: val,
                        slug:
                          !editingKnowledge || !prev.slug
                            ? val
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, '-')
                              .replace(/(^-|-$)+/g, '')
                            : prev.slug
                      }));
                    }}
                    placeholder="e.g. Solar System Sizing Guide: Finding the Sweet Spot"
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
                      /learn/knowledge-hub/
                    </span>
                    <input
                      type="text"
                      value={knowledgeFormData.slug}
                      onChange={(e) =>
                        setKnowledgeFormData({
                          ...knowledgeFormData,
                          slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                        })
                      }
                      placeholder="solar-system-sizing-guide"
                      className="w-full bg-transparent px-2 py-2.5 text-xs sm:text-sm text-slate-800 font-mono focus:outline-none"
                    />
                  </div>
                </div>

                {/* Category & Read Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">Category</label>
                    <select
                      value={knowledgeFormData.category}
                      onChange={(e) =>
                        setKnowledgeFormData({ ...knowledgeFormData, category: e.target.value })
                      }
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
                      value={knowledgeFormData.readTime}
                      onChange={(e) =>
                        setKnowledgeFormData({ ...knowledgeFormData, readTime: e.target.value })
                      }
                      placeholder="e.g. 6 min read"
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Author Name & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">Author Name</label>
                    <input
                      type="text"
                      value={knowledgeFormData.author}
                      onChange={(e) =>
                        setKnowledgeFormData({ ...knowledgeFormData, author: e.target.value })
                      }
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">Author Role</label>
                    <input
                      type="text"
                      value={knowledgeFormData.authorRole}
                      onChange={(e) =>
                        setKnowledgeFormData({ ...knowledgeFormData, authorRole: e.target.value })
                      }
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Publish Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Publish Date</label>
                  <input
                    type="text"
                    value={knowledgeFormData.publishDate}
                    onChange={(e) =>
                      setKnowledgeFormData({ ...knowledgeFormData, publishDate: e.target.value })
                    }
                    placeholder="e.g. Sep 17, 2026"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Header / Featured Guide Image Upload */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
                      <span>Header / Featured Guide Image</span>
                    </label>
                    {knowledgeFormData.imageUrl && (
                      <button
                        type="button"
                        onClick={() => setKnowledgeFormData((prev) => ({ ...prev, imageUrl: '' }))}
                        className="text-[11px] text-rose-500 hover:text-rose-700 font-semibold cursor-pointer"
                      >
                        Remove Image
                      </button>
                    )}
                  </div>

                  {/* Preview or Upload Dropzone */}
                  {knowledgeFormData.imageUrl ? (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 group mb-3 bg-slate-50">
                      <img
                        src={knowledgeFormData.imageUrl}
                        alt="Knowledge Guide preview"
                        className="w-full h-44 object-cover"
                        onError={(e: any) => {
                          e.target.src = '/images/blog/solar-system-size.webp';
                        }}
                      />
                      {uploadingKnowledgeImage && (
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
                            onChange={handleKnowledgeImageUpload}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => setKnowledgeFormData((prev) => ({ ...prev, imageUrl: '' }))}
                          className="bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-amber-500 hover:bg-amber-50/40 rounded-2xl p-6 cursor-pointer transition-all mb-3 text-center group bg-slate-50/60 relative">
                      {uploadingKnowledgeImage ? (
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
                            Click to upload Knowledge Guide Image
                          </span>
                          <span className="text-[11px] text-slate-400 mt-0.5">
                            Cloudinary Cloud Storage (PNG, JPG, WEBP)
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleKnowledgeImageUpload}
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
                      value={knowledgeFormData.imageUrl}
                      onChange={(e) =>
                        setKnowledgeFormData((prev) => ({ ...prev, imageUrl: e.target.value }))
                      }
                      placeholder="Or enter image URL (e.g. /images/blog/solar-system-size.webp or https://...)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Excerpt / Technical Overview
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={knowledgeFormData.excerpt}
                    onChange={(e) =>
                      setKnowledgeFormData({ ...knowledgeFormData, excerpt: e.target.value })
                    }
                    placeholder="High-level engineering overview displayed in the Knowledge Hub catalog..."
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
                    value={knowledgeFormData.keyTakeaways}
                    onChange={(e) =>
                      setKnowledgeFormData({ ...knowledgeFormData, keyTakeaways: e.target.value })
                    }
                    placeholder="Standardize on N-Type silicon cells for enhanced temperature resilience.&#10;Maintain inverter oversizing between 1.25x and 1.33x.&#10;Ensure Tier-1 structural mounting with AS/NZS 5033:2021 compliance."
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm text-slate-900 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: CONTENT */}
            {knowledgeModalTab === 'content' && (
              <div className="border border-slate-200 rounded-2xl p-6 bg-white space-y-4">
                <RichTextEditor
                  label="Guide Technical Content"
                  placeholder="Write detailed technical content here. Rich formatting, headings, lists, links, and images are fully supported..."
                  value={knowledgeFormData.content}
                  onChange={(html) =>
                    setKnowledgeFormData((prev) => ({ ...prev, content: html }))
                  }
                  onUploadImage={uploadKnowledgeImage}
                />
              </div>
            )}

            {/* TAB 3: BLUEPRINT & SPECS */}
            {knowledgeModalTab === 'blueprint' && (
              <div className="space-y-6">
                {/* Blueprint Title & Badge */}
                <div className="border border-slate-200 rounded-2xl p-6 bg-white space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-amber-500" />
                    <span>Blueprint Section Header</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">Blueprint Title</label>
                      <input
                        type="text"
                        value={knowledgeFormData.blueprintTitle}
                        onChange={(e) =>
                          setKnowledgeFormData({ ...knowledgeFormData, blueprintTitle: e.target.value })
                        }
                        placeholder="e.g. Engineering Blueprint & Specifications"
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">Blueprint Badge Tag</label>
                      <input
                        type="text"
                        value={knowledgeFormData.blueprintBadge}
                        onChange={(e) =>
                          setKnowledgeFormData({ ...knowledgeFormData, blueprintBadge: e.target.value })
                        }
                        placeholder="e.g. Field Specification 2026"
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Technical Specs List */}
                <div className="border border-slate-200 rounded-2xl p-6 bg-white space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-amber-500" />
                        <span>Quick Specifications & Benchmarks</span>
                      </h4>
                      <p className="text-[11px] text-slate-500">Displayed in high-visibility stat boxes on the live page</p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddQuickStat}
                      className="bg-amber-50 hover:bg-amber-100/80 text-amber-800 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 border border-amber-200/60 cursor-pointer transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Stat</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {knowledgeFormData.quickStats.length === 0 ? (
                      <div className="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-400">
                        No quick stats added yet. Click &quot;Add Stat&quot; to configure technical specs.
                      </div>
                    ) : (
                      knowledgeFormData.quickStats.map((stat, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200/70">
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => handleUpdateQuickStat(idx, 'label', e.target.value)}
                            placeholder="Label (e.g. DC Sizing Ratio)"
                            className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                          />
                          <input
                            type="text"
                            value={stat.value}
                            onChange={(e) => handleUpdateQuickStat(idx, 'value', e.target.value)}
                            placeholder="Value (e.g. 1.33x Oversizing)"
                            className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-semibold"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveQuickStat(idx)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                            title="Delete spec"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Comparison Matrix Table */}
                <div className="border border-slate-200 rounded-2xl p-6 bg-white space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <Table className="w-4 h-4 text-blue-500" />
                        <span>Comparison Matrix Table</span>
                      </h4>
                      <p className="text-[11px] text-slate-500">Tiered comparison columns for technical hardware evaluations</p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddMatrixRow}
                      className="bg-blue-50 hover:bg-blue-100/80 text-blue-800 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 border border-blue-200/60 cursor-pointer transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Row</span>
                    </button>
                  </div>

                  {/* Column Headers Config */}
                  <div className="p-3 bg-slate-100 rounded-xl space-y-2">
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                      Table Column Headers (4 Columns)
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {knowledgeFormData.matrixHeaders.map((header, idx) => (
                        <input
                          key={idx}
                          type="text"
                          value={header}
                          onChange={(e) => handleUpdateMatrixHeader(idx, e.target.value)}
                          placeholder={`Col ${idx + 1}`}
                          className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-amber-500"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Matrix Rows */}
                  <div className="space-y-2.5">
                    {knowledgeFormData.matrixRows.length === 0 ? (
                      <div className="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-400">
                        No matrix rows configured. Click &quot;Add Row&quot; to build comparison data.
                      </div>
                    ) : (
                      knowledgeFormData.matrixRows.map((row, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200/70">
                          <input
                            type="text"
                            value={row.feature}
                            onChange={(e) => handleUpdateMatrixRow(idx, 'feature', e.target.value)}
                            placeholder="Feature (e.g. Cell Type)"
                            className="w-1/4 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-amber-500"
                          />
                          <input
                            type="text"
                            value={row.col1}
                            onChange={(e) => handleUpdateMatrixRow(idx, 'col1', e.target.value)}
                            placeholder="Col 1 Value"
                            className="w-1/4 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                          />
                          <input
                            type="text"
                            value={row.col2}
                            onChange={(e) => handleUpdateMatrixRow(idx, 'col2', e.target.value)}
                            placeholder="Col 2 Value"
                            className="w-1/4 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                          />
                          <input
                            type="text"
                            value={row.col3}
                            onChange={(e) => handleUpdateMatrixRow(idx, 'col3', e.target.value)}
                            placeholder="Col 3 Value"
                            className="w-1/4 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveMatrixRow(idx)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                            title="Delete row"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Frequently Asked Questions */}
                <div className="border border-slate-200 rounded-2xl p-6 bg-white space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-emerald-500" />
                        <span>Frequently Asked Technical Questions (FAQs)</span>
                      </h4>
                      <p className="text-[11px] text-slate-500">Rendered in interactive accordions on the live guide</p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddFaq}
                      className="bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 border border-emerald-200/60 cursor-pointer transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add FAQ</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {knowledgeFormData.faqs.length === 0 ? (
                      <div className="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-400">
                        No FAQs added yet. Click &quot;Add FAQ&quot; to include common questions and answers.
                      </div>
                    ) : (
                      knowledgeFormData.faqs.map((faq, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => handleUpdateFaq(idx, 'question', e.target.value)}
                              placeholder="Question (e.g. What is the optimal roof tilt?)"
                              className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-amber-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveFaq(idx)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors shrink-0"
                              title="Delete FAQ"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <textarea
                            rows={2}
                            value={faq.answer}
                            onChange={(e) => handleUpdateFaq(idx, 'answer', e.target.value)}
                            placeholder="Answer explanation..."
                            className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: META TAGS */}
            {knowledgeModalTab === 'meta' && (
              <div className="border border-slate-200 rounded-2xl p-6 bg-white space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Meta Title</label>
                  <input
                    type="text"
                    value={knowledgeFormData.metaTitle}
                    onChange={(e) =>
                      setKnowledgeFormData({ ...knowledgeFormData, metaTitle: e.target.value })
                    }
                    placeholder="Solar Engineering Blueprint | Sunny Solar Knowledge Hub"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Canonical URL</label>
                  <input
                    type="text"
                    value={knowledgeFormData.canonicalUrl}
                    onChange={(e) =>
                      setKnowledgeFormData({ ...knowledgeFormData, canonicalUrl: e.target.value })
                    }
                    placeholder="https://sunnysolar.com.au/learn/knowledge-hub/..."
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Keywords</label>
                  <input
                    type="text"
                    value={knowledgeFormData.keywords}
                    onChange={(e) =>
                      setKnowledgeFormData({ ...knowledgeFormData, keywords: e.target.value })
                    }
                    placeholder="solar blueprint, inverter sizing, engineering specs, battery matrix"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Meta Description</label>
                  <textarea
                    rows={3}
                    value={knowledgeFormData.metaDescription}
                    onChange={(e) =>
                      setKnowledgeFormData({ ...knowledgeFormData, metaDescription: e.target.value })
                    }
                    placeholder="Search engine meta description snippet for technical guide..."
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Schema Markup (JSON-LD)</label>
                  <textarea
                    rows={3}
                    value={knowledgeFormData.schema}
                    onChange={(e) =>
                      setKnowledgeFormData({ ...knowledgeFormData, schema: e.target.value })
                    }
                    placeholder='{ "@context": "https://schema.org", "@type": "TechArticle", ... }'
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm text-slate-900 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            )}

          </div>

          {/* Fixed Modal Footer Actions Bar */}
          <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-slate-50 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 z-10">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="modalKnowledgeIsPublished"
                checked={knowledgeFormData.isPublished}
                onChange={(e) =>
                  setKnowledgeFormData((prev) => ({ ...prev, isPublished: e.target.checked }))
                }
                className="w-4 h-4 text-orange-500 rounded border-slate-300 focus:ring-orange-400 cursor-pointer"
              />
              <label htmlFor="modalKnowledgeIsPublished" className="text-xs font-bold text-slate-800 cursor-pointer select-none">
                Publish immediately on live Knowledge Hub
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
                disabled={knowledgeFormLoading}
                className="flex-1 sm:flex-none bg-neutral-900 hover:bg-black text-white font-semibold px-5 py-2.5 rounded-xl shadow-xs disabled:opacity-50 cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                {knowledgeFormLoading && (
                  <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                )}
                <span>{editingKnowledge ? 'Update Technical Guide' : 'Publish Technical Guide'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
