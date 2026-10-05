import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { api, getAdminToken, getStoredAdminUser } from '../../services/api';
import {
  AdminTab,
  BlogFormData,
  BlogItem,
  BlogModalTab,
  KnowledgeFormData,
  KnowledgeItem,
  KnowledgeModalTab,
  MatrixRow,
  SortBy,
  StatusFilter,
  ToastInfo,
  ViewMode
} from './types';
import {
  getTimelineHealth,
  getDefaultBlogFormData,
  getDefaultKnowledgeFormData
} from './utils/adminHelpers';

import { AdminLogin } from './components/AdminLogin';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminHeader } from './components/AdminHeader';
import { AdminToast } from './components/AdminToast';
import { AdminActionBar } from './components/AdminActionBar';
import { AdminOverview } from './components/AdminOverview';
import { BlogGrid } from './components/BlogGrid';
import { BlogTable } from './components/BlogTable';
import { KnowledgeGrid } from './components/KnowledgeGrid';
import { KnowledgeTable } from './components/KnowledgeTable';
import { BlogModal } from './components/BlogModal';
import { KnowledgeModal } from './components/KnowledgeModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';

export const AdminPage: React.FC = () => {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getAdminToken());
  const [adminUser, setAdminUser] = useState<any>(getStoredAdminUser());

  // Active navigation tab: 'articles' | 'knowledge' | 'overview'
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Dashboard Data states (hydrated from localStorage for instant 0ms initial render)
  const [stats, setStats] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('sunny_admin_stats_v2');
      if (saved) return JSON.parse(saved);
      // Purge any stale legacy cached stats containing old backfilled 11 count
      localStorage.removeItem('sunny_admin_stats');
      return null;
    } catch {
      return null;
    }
  });
  const [blogs, setBlogs] = useState<BlogItem[]>(() => {
    try {
      const saved = localStorage.getItem('sunny_admin_blogs_v2');
      if (saved) return JSON.parse(saved);
      // Purge any stale legacy cached blogs containing old 11 views
      localStorage.removeItem('sunny_admin_blogs');
      return [];
    } catch {
      return [];
    }
  });
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [toast, setToast] = useState<ToastInfo | null>(null);

  // Blog Filter & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');

  // View states
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('newest');
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('admin_sidebar_open');
      if (saved !== null) {
        return saved === 'true';
      }
      return window.innerWidth >= 1024;
    }
    return true;
  });

  const handleToggleSidebar = (val?: boolean | ((prev: boolean) => boolean)) => {
    setSidebarOpen(prev => {
      const next = typeof val === 'function' ? val(prev) : (typeof val === 'boolean' ? val : !prev);
      try {
        localStorage.setItem('admin_sidebar_open', String(next));
      } catch (e) {
        // ignore localStorage error
      }
      return next;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarOpen && typeof window !== 'undefined' && window.innerWidth < 1024) {
        handleToggleSidebar(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  // Blog Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<BlogModalTab>('info');
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [uploadingBlogImage, setUploadingBlogImage] = useState(false);

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const longContentRef = useRef<HTMLTextAreaElement>(null);

  const [formData, setFormData] = useState<BlogFormData>(
    getDefaultBlogFormData(
      new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    )
  );

  // Knowledge Hub states (hydrated from localStorage for instant 0ms initial render)
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>(() => {
    try {
      const saved = localStorage.getItem('sunny_admin_knowledge');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [loadingKnowledge, setLoadingKnowledge] = useState(false);
  const [searchKnowledge, setSearchKnowledge] = useState('');
  const [statusFilterKnowledge, setStatusFilterKnowledge] = useState<StatusFilter>('all');
  const [categoryFilterKnowledge, setCategoryFilterKnowledge] = useState('All Categories');

  // Knowledge Modal states
  const [isKnowledgeModalOpen, setIsKnowledgeModalOpen] = useState(false);
  const [knowledgeModalTab, setKnowledgeModalTab] = useState<KnowledgeModalTab>('info');
  const [editingKnowledge, setEditingKnowledge] = useState<KnowledgeItem | null>(null);
  const [knowledgeFormLoading, setKnowledgeFormLoading] = useState(false);
  const [uploadingKnowledgeImage, setUploadingKnowledgeImage] = useState(false);
  const [showContentPreview, setShowContentPreview] = useState(false);

  const knowledgeContentRef = useRef<HTMLTextAreaElement>(null);

  const [knowledgeFormData, setKnowledgeFormData] = useState<KnowledgeFormData>(
    getDefaultKnowledgeFormData(
      new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    )
  );

  // Delete Confirmation Modal State
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    type: 'blog' | 'knowledge';
    id: string;
    title: string;
    isDeleting: boolean;
  }>({
    isOpen: false,
    type: 'blog',
    id: '',
    title: '',
    isDeleting: false
  });

  // Listen for global auth:unauthorized events from api service
  useEffect(() => {
    const handleUnauthorized = (e: any) => {
      setIsAuthenticated(false);
      setAdminUser(null);
      const msg = e.detail?.message || 'Session expired or unauthorized. Please sign in again.';
      setLoginError(msg);
      showToast('error', msg);
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  // Data Loading & Auto-refresh (Stale-While-Revalidate)
  const loadDashboardData = async (silent: boolean = false) => {
    if (!getAdminToken()) {
      setIsAuthenticated(false);
      setAdminUser(null);
      return;
    }

    if (!silent) {
      setLoadingBlogs(true);
      setLoadingKnowledge(true);
    }
    try {
      const [statsRes, blogsRes, knowledgeRes] = await Promise.all([
        api.getStats().catch((err) => {
          if (err?.status === 401) throw err;
          return null;
        }),
        api.getAllAdminBlogs().catch((err) => {
          if (err?.status === 401) throw err;
          return null;
        }),
        api.getAllAdminKnowledge().catch((err) => {
          if (err?.status === 401) throw err;
          return null;
        })
      ]);

      if (statsRes?.stats) {
        setStats(statsRes.stats);
        try {
          localStorage.setItem('sunny_admin_stats_v2', JSON.stringify(statsRes.stats));
        } catch {
          // ignore storage quota error
        }
      }

      if (blogsRes?.data) {
        setBlogs(blogsRes.data);
        try {
          localStorage.setItem('sunny_admin_blogs_v2', JSON.stringify(blogsRes.data));
        } catch {
          // ignore storage quota error
        }
      }

      if (knowledgeRes?.data) {
        setKnowledgeItems(knowledgeRes.data);
        try {
          localStorage.setItem('sunny_admin_knowledge', JSON.stringify(knowledgeRes.data));
        } catch {
          // ignore storage quota error
        }
      }
    } catch (err: any) {
      if (err?.status === 401 || err?.message?.includes('authorized') || err?.message?.includes('token')) {
        api.logout();
        setIsAuthenticated(false);
        setAdminUser(null);
        setLoginError(err.message || 'Session expired or unauthorized. Please sign in again.');
        showToast('error', 'Session expired. Please sign in again.');
        return;
      }
      if (!silent) {
        showToast('error', err.message || 'Failed to fetch data from MongoDB');
      }
    } finally {
      if (!silent) {
        setLoadingBlogs(false);
        setLoadingKnowledge(false);
      }
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    if (!getAdminToken()) {
      setIsAuthenticated(false);
      setAdminUser(null);
      return;
    }

    // If cache is already present, fetch silently without showing blocking spinners
    const hasCachedContent = (blogs && blogs.length > 0) || (knowledgeItems && knowledgeItems.length > 0) || !!stats;
    loadDashboardData(hasCachedContent);

    const intervalId = setInterval(() => {
      if (!isModalOpen && !isKnowledgeModalOpen) {
        loadDashboardData(true);
      }
    }, 25000);

    let lastFocusTime = Date.now();
    const handleFocus = () => {
      const now = Date.now();
      if (now - lastFocusTime > 15000 && !isModalOpen && !isKnowledgeModalOpen) {
        lastFocusTime = now;
        loadDashboardData(true);
      }
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', handleFocus);
    };
  }, [isAuthenticated, isModalOpen, isKnowledgeModalOpen]);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  // Rich Text Editor Helpers (Blog)
  const applyFormatting = (
    field: 'content' | 'longContent',
    tagStart: string,
    tagEnd: string = ''
  ) => {
    const ref = field === 'content' ? contentRef.current : longContentRef.current;
    if (!ref) return;

    const start = ref.selectionStart;
    const end = ref.selectionEnd;
    const currentText = formData[field] || '';
    const selectedText = currentText.substring(start, end);

    const replacement = selectedText
      ? `${tagStart}${selectedText}${tagEnd}`
      : `${tagStart}${tagEnd}`;

    const updatedText =
      currentText.substring(0, start) + replacement + currentText.substring(end);

    setFormData((prev) => ({ ...prev, [field]: updatedText }));

    setTimeout(() => {
      ref.focus();
      const newPos = selectedText ? start + replacement.length : start + tagStart.length;
      ref.setSelectionRange(newPos, newPos);
    }, 0);
  };

  const handleInsertLink = (field: 'content' | 'longContent') => {
    const ref = field === 'content' ? contentRef.current : longContentRef.current;
    if (!ref) return;

    const start = ref.selectionStart;
    const end = ref.selectionEnd;
    const currentText = formData[field] || '';
    const selectedText = currentText.substring(start, end);

    const url = window.prompt('Enter link destination URL:', 'https://');
    if (!url) return;

    const linkText = selectedText || window.prompt('Enter link text:', 'click here') || url;
    const linkHtml = `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;

    const updatedText =
      currentText.substring(0, start) + linkHtml + currentText.substring(end);

    setFormData((prev) => ({ ...prev, [field]: updatedText }));
  };

  const handleClearFormatting = (field: 'content' | 'longContent') => {
    const ref = field === 'content' ? contentRef.current : longContentRef.current;
    if (!ref) return;

    const start = ref.selectionStart;
    const end = ref.selectionEnd;
    const currentText = formData[field] || '';
    const selectedText = currentText.substring(start, end);

    if (!selectedText) {
      if (window.confirm('Clear all content in this editor?')) {
        setFormData((prev) => ({ ...prev, [field]: '' }));
      }
      return;
    }

    const cleaned = selectedText.replace(/<\/?[^>]+(>|$)/g, '');
    const updatedText =
      currentText.substring(0, start) + cleaned + currentText.substring(end);

    setFormData((prev) => ({ ...prev, [field]: updatedText }));
  };

  // Rich Text Editor Helpers (Knowledge)
  const applyKnowledgeFormatting = (tagStart: string, tagEnd: string = '') => {
    const ref = knowledgeContentRef.current;
    if (!ref) return;

    const start = ref.selectionStart;
    const end = ref.selectionEnd;
    const currentText = knowledgeFormData.content || '';
    const selectedText = currentText.substring(start, end);

    const replacement = selectedText
      ? `${tagStart}${selectedText}${tagEnd}`
      : `${tagStart}${tagEnd}`;

    const updatedText =
      currentText.substring(0, start) + replacement + currentText.substring(end);

    setKnowledgeFormData((prev) => ({ ...prev, content: updatedText }));

    setTimeout(() => {
      ref.focus();
      const newPos = selectedText ? start + replacement.length : start + tagStart.length;
      ref.setSelectionRange(newPos, newPos);
    }, 0);
  };

  const handleInsertKnowledgeLink = () => {
    const ref = knowledgeContentRef.current;
    if (!ref) return;

    const start = ref.selectionStart;
    const end = ref.selectionEnd;
    const currentText = knowledgeFormData.content || '';
    const selectedText = currentText.substring(start, end);

    const url = window.prompt('Enter link destination URL:', 'https://');
    if (!url) return;

    const linkText = selectedText || window.prompt('Enter link text:', 'click here') || url;
    const linkHtml = `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;

    const updatedText =
      currentText.substring(0, start) + linkHtml + currentText.substring(end);

    setKnowledgeFormData((prev) => ({ ...prev, content: updatedText }));
  };

  const handleClearKnowledgeFormatting = () => {
    const ref = knowledgeContentRef.current;
    if (!ref) return;

    const start = ref.selectionStart;
    const end = ref.selectionEnd;
    const currentText = knowledgeFormData.content || '';
    const selectedText = currentText.substring(start, end);

    if (!selectedText) {
      if (window.confirm('Clear all content in this editor?')) {
        setKnowledgeFormData((prev) => ({ ...prev, content: '' }));
      }
      return;
    }

    const cleaned = selectedText.replace(/<\/?[^>]+(>|$)/g, '');
    const updatedText =
      currentText.substring(0, start) + cleaned + currentText.substring(end);

    setKnowledgeFormData((prev) => ({ ...prev, content: updatedText }));
  };

  // Dynamic Blueprint Spec Helpers
  const handleAddQuickStat = () => {
    setKnowledgeFormData((prev) => ({
      ...prev,
      quickStats: [...prev.quickStats, { label: '', value: '' }]
    }));
  };

  const handleRemoveQuickStat = (index: number) => {
    setKnowledgeFormData((prev) => ({
      ...prev,
      quickStats: prev.quickStats.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateQuickStat = (index: number, field: 'label' | 'value', val: string) => {
    setKnowledgeFormData((prev) => {
      const updated = [...prev.quickStats];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, quickStats: updated };
    });
  };

  const handleUpdateMatrixHeader = (index: number, val: string) => {
    setKnowledgeFormData((prev) => {
      const updated = [...prev.matrixHeaders];
      updated[index] = val;
      return { ...prev, matrixHeaders: updated };
    });
  };

  const handleAddMatrixRow = () => {
    setKnowledgeFormData((prev) => ({
      ...prev,
      matrixRows: [...prev.matrixRows, { feature: '', col1: '', col2: '', col3: '' }]
    }));
  };

  const handleRemoveMatrixRow = (index: number) => {
    setKnowledgeFormData((prev) => ({
      ...prev,
      matrixRows: prev.matrixRows.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateMatrixRow = (index: number, field: keyof MatrixRow, val: string) => {
    setKnowledgeFormData((prev) => {
      const updated = [...prev.matrixRows];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, matrixRows: updated };
    });
  };

  const handleAddFaq = () => {
    setKnowledgeFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const handleRemoveFaq = (index: number) => {
    setKnowledgeFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateFaq = (index: number, field: 'question' | 'answer', val: string) => {
    setKnowledgeFormData((prev) => {
      const updated = [...prev.faqs];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, faqs: updated };
    });
  };

  // Image Upload Handlers (Cloudinary)
  const handleKnowledgeImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast('error', 'Image size should be less than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      if (typeof reader.result === 'string') {
        const base64Data = reader.result;
        setKnowledgeFormData((prev) => ({
          ...prev,
          imageUrl: base64Data
        }));

        setUploadingKnowledgeImage(true);
        try {
          const res = await api.uploadImage(base64Data, 'sunny-solar/knowledge');
          if (res?.url) {
            setKnowledgeFormData((prev) => ({
              ...prev,
              imageUrl: res.url
            }));
            showToast('success', 'Image uploaded to Cloudinary successfully!');
          }
        } catch (uploadErr: any) {
          console.warn('Cloudinary upload fallback to controller auto-upload:', uploadErr);
          showToast('error', `Cloudinary direct upload failed: ${uploadErr.message || 'Will upload on save'}`);
        } finally {
          setUploadingKnowledgeImage(false);
        }
      }
    };
    reader.onerror = () => {
      showToast('error', 'Failed to read image file');
    };
    reader.readAsDataURL(file);
  };

  const handleBlogImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast('error', 'Image size should be less than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      if (typeof reader.result === 'string') {
        const base64Data = reader.result;
        setFormData((prev) => ({
          ...prev,
          imageUrl: base64Data
        }));

        setUploadingBlogImage(true);
        try {
          const res = await api.uploadImage(base64Data, 'sunny-solar/blogs');
          if (res?.url) {
            setFormData((prev) => ({
              ...prev,
              imageUrl: res.url
            }));
            showToast('success', 'Image uploaded to Cloudinary successfully!');
          }
        } catch (uploadErr: any) {
          console.warn('Cloudinary upload fallback to controller auto-upload:', uploadErr);
          showToast('error', `Cloudinary direct upload failed: ${uploadErr.message || 'Will upload on save'}`);
        } finally {
          setUploadingBlogImage(false);
        }
      }
    };
    reader.onerror = () => {
      showToast('error', 'Failed to read image file');
    };
    reader.readAsDataURL(file);
  };

  // Authentication Handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    try {
      const res = await api.login({ email, password });
      setIsAuthenticated(true);
      setAdminUser(res.admin);
      showToast('success', `Welcome back, ${res.admin.name || 'Admin'}!`);
    } catch (err: any) {
      setLoginError(err.message || 'Invalid email or password. Please verify credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    api.logout();
    setIsAuthenticated(false);
    setAdminUser(null);
    try {
      localStorage.removeItem('sunny_admin_stats');
      localStorage.removeItem('sunny_admin_blogs');
      localStorage.removeItem('sunny_admin_knowledge');
    } catch {
      // ignore
    }
  };

  // Blog CRUD Actions
  const handleTogglePublish = async (blog: BlogItem) => {
    try {
      const res = await api.togglePublishBlog(blog._id);
      setBlogs((prev) =>
        prev.map((b) => (b._id === blog._id ? { ...b, isPublished: res.isPublished } : b))
      );
      showToast('success', `Article is now ${res.isPublished ? 'Live' : 'Draft'}.`);
      await loadDashboardData(true);
    } catch (err: any) {
      showToast('error', err.message || 'Could not update status');
    }
  };

  const handleDeleteBlog = (id: string, title: string) => {
    setDeleteModalState({
      isOpen: true,
      type: 'blog',
      id,
      title,
      isDeleting: false
    });
  };

  const handleRestoreBlog = async (id: string, title: string) => {
    try {
      await api.restoreBlog(id);
      setBlogs((prev) =>
        prev.map((b) => (b._id === id ? { ...b, isDeleted: false, deletedAt: undefined } : b))
      );
      showToast('success', `"${title}" restored successfully from database!`);
      await loadDashboardData(true);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to restore article');
    }
  };

  const handleOpenEdit = (blog: BlogItem) => {
    setEditingBlog(blog);
    setModalTab('info');
    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      excerpt: blog.excerpt || '',
      category: blog.category || 'Solar Basics',
      readTime: blog.readTime || '5 min read',
      publishDate: blog.publishDate || '',
      author: blog.author || 'Trent Palmer',
      authorRole: blog.authorRole || 'Founder & Master Electrician',
      imageUrl: blog.imageUrl || '',
      content:
        typeof blog.content === 'string'
          ? blog.content
          : Array.isArray(blog.content)
            ? blog.content.join('\n\n')
            : '',
      keyTakeaways: Array.isArray(blog.keyTakeaways) ? blog.keyTakeaways.join('\n') : '',
      metaTitle: blog.metaTitle || '',
      canonicalUrl: blog.canonicalUrl || '',
      keywords: blog.keywords || '',
      metaDescription: blog.metaDescription || '',
      schema: blog.schema || '',
      longContent: blog.longContent || '',
      isPublished: blog.isPublished !== undefined ? blog.isPublished : true
    });
    setIsModalOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingBlog(null);
    setModalTab('info');
    const todayFormatted = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    setFormData(getDefaultBlogFormData(todayFormatted));
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.excerpt?.trim()) {
      showToast('error', 'Title and excerpt are required');
      return;
    }

    setFormLoading(true);

    try {
      // Ensure a valid, clean slug
      const rawSlug = formData.slug ? formData.slug.replace(/^\/?(learn\/blog\/)?/, '').trim() : '';
      const cleanSlug =
        rawSlug
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '') ||
        formData.title
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');

      // Content fallback if user only filled first tab
      const cleanContent = formData.content?.trim()
        ? formData.content
        : `<p>${formData.excerpt.trim()}</p>`;

      const rawTakeaways: unknown = formData.keyTakeaways;
      const keyTakeaways =
        typeof rawTakeaways === 'string'
          ? rawTakeaways.split('\n').map((k) => k.trim()).filter(Boolean)
          : Array.isArray(rawTakeaways)
            ? rawTakeaways.map((k) => String(k).trim()).filter(Boolean)
            : [];

      const payload = {
        ...formData,
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim(),
        slug: cleanSlug,
        content: cleanContent,
        keyTakeaways
      };

      if (editingBlog) {
        const res = await api.updateBlog(editingBlog._id, payload);
        setBlogs((prev) => prev.map((b) => (b._id === editingBlog._id ? res.data : b)));
        showToast('success', 'Article updated successfully!');
      } else {
        const res = await api.createBlog(payload);
        setBlogs((prev) => [res.data, ...prev]);
        showToast('success', 'New article published successfully!');
      }

      setIsModalOpen(false);
      await loadDashboardData(true);
    } catch (err: any) {
      showToast('error', err.message || 'Error saving article');
    } finally {
      setFormLoading(false);
    }
  };

  // Knowledge Hub CRUD Actions
  const handleTogglePublishKnowledge = async (item: KnowledgeItem) => {
    try {
      const res = await api.togglePublishKnowledge(item._id);
      setKnowledgeItems((prev) =>
        prev.map((k) => (k._id === item._id ? { ...k, isPublished: res.isPublished } : k))
      );
      showToast('success', `Knowledge guide is now ${res.isPublished ? 'Live' : 'Draft'}.`);
      await loadDashboardData(true);
    } catch (err: any) {
      showToast('error', err.message || 'Could not update guide status');
    }
  };

  const handleDeleteKnowledge = (id: string, title: string) => {
    setDeleteModalState({
      isOpen: true,
      type: 'knowledge',
      id,
      title,
      isDeleting: false
    });
  };

  const handleConfirmDelete = async () => {
    const { id, title, type } = deleteModalState;
    if (!id) return;

    setDeleteModalState((prev) => ({ ...prev, isDeleting: true }));

    try {
      if (type === 'blog') {
        const targetBlog = blogs.find((b) => b._id === id);
        const removedViews = targetBlog?.views || 0;

        await api.deleteBlog(id);
        setBlogs((prev) =>
          prev.map((b) =>
            b._id === id
              ? { ...b, isDeleted: true, isPublished: false, views: 0, deletedAt: new Date().toISOString() }
              : b
          )
        );

        // Optimistically update stats immediately so Total Reads drops with zero lag
        setStats((prev: any) => {
          if (!prev) return prev;
          return {
            ...prev,
            totalBlogs: Math.max(0, (prev.totalBlogs ?? 1) - 1),
            publishedBlogs: targetBlog?.isPublished ? Math.max(0, (prev.publishedBlogs ?? 1) - 1) : prev.publishedBlogs,
            archivedBlogs: (prev.archivedBlogs ?? 0) + 1,
            totalViews: Math.max(0, (prev.totalViews ?? removedViews) - removedViews)
          };
        });

        showToast('success', `"${title}" moved to archive. Safely preserved in database!`);
      } else {
        const targetKnowledge = knowledgeItems.find((k) => k._id === id);
        const removedViews = targetKnowledge?.views || 0;

        await api.deleteKnowledge(id);
        setKnowledgeItems((prev) =>
          prev.map((k) =>
            k._id === id
              ? { ...k, isDeleted: true, isPublished: false, views: 0, deletedAt: new Date().toISOString() }
              : k
          )
        );

        // Optimistically update stats immediately
        setStats((prev: any) => {
          if (!prev) return prev;
          return {
            ...prev,
            totalKnowledge: Math.max(0, (prev.totalKnowledge ?? 1) - 1),
            publishedKnowledge: targetKnowledge?.isPublished ? Math.max(0, (prev.publishedKnowledge ?? 1) - 1) : prev.publishedKnowledge,
            archivedKnowledge: (prev.archivedKnowledge ?? 0) + 1,
            totalKnowledgeViews: Math.max(0, (prev.totalKnowledgeViews ?? removedViews) - removedViews)
          };
        });

        showToast('success', `"${title}" moved to archive. Safely preserved in database!`);
      }

      setDeleteModalState({
        isOpen: false,
        type: 'blog',
        id: '',
        title: '',
        isDeleting: false
      });
      await loadDashboardData(true);
    } catch (err: any) {
      showToast('error', err.message || `Failed to remove ${type === 'blog' ? 'article' : 'guide'}`);
      setDeleteModalState((prev) => ({ ...prev, isDeleting: false }));
    }
  };

  const handleRestoreKnowledge = async (id: string, title: string) => {
    try {
      await api.restoreKnowledge(id);
      setKnowledgeItems((prev) =>
        prev.map((k) => (k._id === id ? { ...k, isDeleted: false, deletedAt: undefined } : k))
      );
      showToast('success', `"${title}" restored successfully from database!`);
      await loadDashboardData(true);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to restore knowledge guide');
    }
  };

  const handleOpenEditKnowledge = (item: KnowledgeItem) => {
    setEditingKnowledge(item);
    setKnowledgeModalTab('info');
    setShowContentPreview(false);
    setKnowledgeFormData({
      title: item.title || '',
      slug: item.slug || '',
      excerpt: item.excerpt || '',
      category: item.category || 'Solar Basics',
      readTime: item.readTime || '6 min read',
      publishDate: item.publishDate || '',
      author: item.author || 'Trent Palmer',
      authorRole: item.authorRole || 'Founder & Master Electrician',
      imageUrl: item.imageUrl || '',
      content: typeof item.content === 'string' ? item.content : '',
      keyTakeaways: Array.isArray(item.keyTakeaways) ? item.keyTakeaways.join('\n') : '',
      blueprintTitle: item.blueprintTitle || '',
      blueprintBadge: item.blueprintBadge || '',
      quickStats: item.quickStats && item.quickStats.length > 0 ? item.quickStats : [
        { label: 'Recommended Inverter Oversizing', value: '1.33x DC-to-AC Ratio' },
        { label: 'Annual Degradation Limit', value: '< 0.40% / year' }
      ],
      matrixHeaders: item.matrixHeaders && item.matrixHeaders.length === 4 ? item.matrixHeaders : ['Specification', 'Budget Entry', 'Premium Standard', 'Commercial Grade'],
      matrixRows: item.matrixRows && item.matrixRows.length > 0 ? item.matrixRows : [
        { feature: 'Cell Architecture', col1: 'P-Type Mono PERC', col2: 'N-Type TOPCon / IBC', col3: 'Heterojunction (HJT)' }
      ],
      faqs: item.faqs && item.faqs.length > 0 ? item.faqs : [
        { question: 'What is the optimal orientation for Melbourne roofs?', answer: 'True North at a 25-30 degree pitch maximizes annual yield.' }
      ],
      metaTitle: item.metaTitle || '',
      canonicalUrl: item.canonicalUrl || '',
      keywords: item.keywords || '',
      metaDescription: item.metaDescription || '',
      schema: item.schema || '',
      isPublished: item.isPublished !== undefined ? item.isPublished : true
    });
    setIsKnowledgeModalOpen(true);
  };

  const handleOpenCreateKnowledge = () => {
    setEditingKnowledge(null);
    setKnowledgeModalTab('info');
    setShowContentPreview(false);
    const todayFormatted = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    setKnowledgeFormData(getDefaultKnowledgeFormData(todayFormatted));
    setIsKnowledgeModalOpen(true);
  };

  const handleKnowledgeFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!knowledgeFormData.title?.trim() || !knowledgeFormData.excerpt?.trim()) {
      showToast('error', 'Title and excerpt are required');
      return;
    }

    setKnowledgeFormLoading(true);

    try {
      // Ensure clean slug
      const rawSlug = knowledgeFormData.slug ? knowledgeFormData.slug.replace(/^\/?(learn\/knowledge\/)?/, '').trim() : '';
      const cleanSlug =
        rawSlug
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '') ||
        knowledgeFormData.title
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');

      // Content fallback if user only filled first tab
      const cleanContent = knowledgeFormData.content?.trim()
        ? knowledgeFormData.content
        : `<p>${knowledgeFormData.excerpt.trim()}</p>`;

      const rawTakeaways: unknown = knowledgeFormData.keyTakeaways;
      const keyTakeaways =
        typeof rawTakeaways === 'string'
          ? rawTakeaways.split('\n').map((k) => k.trim()).filter(Boolean)
          : Array.isArray(rawTakeaways)
            ? rawTakeaways.map((k) => String(k).trim()).filter(Boolean)
            : [];

      const payload = {
        ...knowledgeFormData,
        title: knowledgeFormData.title.trim(),
        excerpt: knowledgeFormData.excerpt.trim(),
        slug: cleanSlug,
        content: cleanContent,
        keyTakeaways,
        quickStats: (knowledgeFormData.quickStats || []).filter((s) => s.label.trim() || s.value.trim()),
        matrixRows: (knowledgeFormData.matrixRows || []).filter((r) => r.feature.trim() || r.col1.trim() || r.col2.trim() || r.col3.trim()),
        faqs: (knowledgeFormData.faqs || []).filter((f) => f.question.trim() || f.answer.trim())
      };

      if (editingKnowledge) {
        const res = await api.updateKnowledge(editingKnowledge._id, payload);
        setKnowledgeItems((prev) => prev.map((k) => (k._id === editingKnowledge._id ? res.data : k)));
        showToast('success', 'Knowledge Hub guide updated successfully!');
      } else {
        const res = await api.createKnowledge(payload);
        setKnowledgeItems((prev) => [res.data, ...prev]);
        showToast('success', 'New Knowledge Hub guide published successfully!');
      }

      setIsKnowledgeModalOpen(false);
      await loadDashboardData(true);
    } catch (err: any) {
      showToast('error', err.message || 'Error saving Knowledge guide');
    } finally {
      setKnowledgeFormLoading(false);
    }
  };

  // Blog counts
  const activeBlogs = blogs.filter((b) => !b.isDeleted);
  const publishedBlogs = blogs.filter((b) => b.isPublished && !b.isDeleted);

  // Knowledge counts
  const activeKnowledge = knowledgeItems.filter((k) => !k.isDeleted);
  const publishedKnowledge = knowledgeItems.filter((k) => k.isPublished && !k.isDeleted);

  // Filtered Blogs logic
  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all'
        ? !b.isDeleted
        : statusFilter === 'published'
          ? b.isPublished && !b.isDeleted
          : statusFilter === 'draft'
            ? !b.isPublished && !b.isDeleted
            : b.isDeleted; // 'archived'

    const matchesCategory =
      categoryFilter === 'All Categories' ? true : b.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Filtered Knowledge logic
  const filteredKnowledge = knowledgeItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchKnowledge.toLowerCase()) ||
      item.category.toLowerCase().includes(searchKnowledge.toLowerCase()) ||
      item.author.toLowerCase().includes(searchKnowledge.toLowerCase()) ||
      (item.blueprintTitle && item.blueprintTitle.toLowerCase().includes(searchKnowledge.toLowerCase()));

    const matchesStatus =
      statusFilterKnowledge === 'all'
        ? !item.isDeleted
        : statusFilterKnowledge === 'published'
          ? item.isPublished && !item.isDeleted
          : statusFilterKnowledge === 'draft'
            ? !item.isPublished && !item.isDeleted
            : item.isDeleted; // 'archived'

    const matchesCategory =
      categoryFilterKnowledge === 'All Categories' ? true : item.category === categoryFilterKnowledge;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Sort logic based on sortBy state
  const sortedFilteredBlogs = [...filteredBlogs].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt || b.publishDate || 0).getTime() - new Date(a.createdAt || a.publishDate || 0).getTime();
    if (sortBy === 'oldest') return new Date(a.createdAt || a.publishDate || 0).getTime() - new Date(b.createdAt || b.publishDate || 0).getTime();
    if (sortBy === 'views') return (b.views || 0) - (a.views || 0);
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  const sortedFilteredKnowledge = [...filteredKnowledge].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt || b.publishDate || 0).getTime() - new Date(a.createdAt || a.publishDate || 0).getTime();
    if (sortBy === 'oldest') return new Date(a.createdAt || a.publishDate || 0).getTime() - new Date(b.createdAt || b.publishDate || 0).getTime();
    if (sortBy === 'views') return (b.views || 0) - (a.views || 0);
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  // VIEW 1: DEDICATED CLEAN WHITE LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <AdminLogin
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loginLoading={loginLoading}
        loginError={loginError}
        handleLogin={handleLogin}
      />
    );
  }

  // VIEW 2: DEDICATED FULL ADMIN PANEL
  return (
    <div className="min-h-screen bg-[#ffffff] text-slate-900 flex font-sans antialiased">
      <Helmet>
        <title>Admin Dashboard | Sunny Solar Management Portal</title>
        <meta
          name="description"
          content="Sunny Solar internal administration, lead management, and content management dashboard."
        />
      </Helmet>

      {/* Toast Notification */}
      <AdminToast toast={toast} onClose={() => setToast(null)} />

      {/* Mobile backdrop overlay */}
      {sidebarOpen && (
        <div
          onClick={() => handleToggleSidebar(false)}
          className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs z-25 lg:hidden transition-opacity duration-300 cursor-pointer"
          aria-label="Close navigation overlay"
        />
      )}

      {/* 1. LEFT SIDEBAR */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={handleToggleSidebar}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setStatusFilter={setStatusFilter}
        setStatusFilterKnowledge={setStatusFilterKnowledge}
        adminUser={adminUser}
        handleLogout={handleLogout}
      />

      {/* 2. MAIN CONTENT AREA */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${sidebarOpen ? 'lg:pl-64' : 'lg:pl-18 pl-0'}`}>
        {/* Top Navbar Header */}
        <AdminHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={handleToggleSidebar}
          activeTab={activeTab}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchKnowledge={searchKnowledge}
          setSearchKnowledge={setSearchKnowledge}
          loadDashboardData={loadDashboardData}
          loadingBlogs={loadingBlogs}
          loadingKnowledge={loadingKnowledge}
        />

        {/* Content Container */}
        <main className="p-3.5 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-4 sm:space-y-6">
          {/* Key Metric Stats Cards & Overview */}
          {activeTab === 'overview' && (
            <AdminOverview
              stats={stats}
              activeBlogs={activeBlogs}
              blogs={blogs}
              activeKnowledge={activeKnowledge}
              knowledgeItems={knowledgeItems}
              publishedBlogs={publishedBlogs}
              publishedKnowledge={publishedKnowledge}
              setActiveTab={setActiveTab}
              handleOpenEdit={handleOpenEdit}
              handleOpenEditKnowledge={handleOpenEditKnowledge}
            />
          )}

          {/* SUBHEADER & ACTION BAR (Only for Blog & Knowledge Hub views) */}
          {activeTab !== 'overview' && (
            <AdminActionBar
              activeTab={activeTab}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchKnowledge={searchKnowledge}
              setSearchKnowledge={setSearchKnowledge}
              sortBy={sortBy}
              setSortBy={setSortBy}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              categoryFilterKnowledge={categoryFilterKnowledge}
              setCategoryFilterKnowledge={setCategoryFilterKnowledge}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              statusFilterKnowledge={statusFilterKnowledge}
              setStatusFilterKnowledge={setStatusFilterKnowledge}
              viewMode={viewMode}
              setViewMode={setViewMode}
              handleOpenCreate={handleOpenCreate}
              handleOpenCreateKnowledge={handleOpenCreateKnowledge}
            />
          )}

          {/* VIEW: ARTICLES & BLOGS */}
          {activeTab === 'articles' && (
            <>
              {viewMode === 'grid' && (
                <BlogGrid
                  sortedFilteredBlogs={sortedFilteredBlogs}
                  handleOpenCreate={handleOpenCreate}
                  handleOpenEdit={handleOpenEdit}
                  handleTogglePublish={handleTogglePublish}
                  handleDeleteBlog={handleDeleteBlog}
                  handleRestoreBlog={handleRestoreBlog}
                  getTimelineHealth={getTimelineHealth}
                />
              )}
              {viewMode === 'table' && (
                <BlogTable
                  sortedFilteredBlogs={sortedFilteredBlogs}
                  handleOpenEdit={handleOpenEdit}
                  handleTogglePublish={handleTogglePublish}
                  handleDeleteBlog={handleDeleteBlog}
                  handleRestoreBlog={handleRestoreBlog}
                  getTimelineHealth={getTimelineHealth}
                />
              )}
            </>
          )}

          {/* VIEW: Knowledge Hub & BLUEPRINTS (KNOWLEDGE HUB) */}
          {activeTab === 'knowledge' && (
            <>
              {viewMode === 'grid' && (
                <KnowledgeGrid
                  sortedFilteredKnowledge={sortedFilteredKnowledge}
                  handleOpenCreateKnowledge={handleOpenCreateKnowledge}
                  handleOpenEditKnowledge={handleOpenEditKnowledge}
                  handleTogglePublishKnowledge={handleTogglePublishKnowledge}
                  handleDeleteKnowledge={handleDeleteKnowledge}
                  handleRestoreKnowledge={handleRestoreKnowledge}
                  getTimelineHealth={getTimelineHealth}
                />
              )}
              {viewMode === 'table' && (
                <KnowledgeTable
                  sortedFilteredKnowledge={sortedFilteredKnowledge}
                  handleOpenEditKnowledge={handleOpenEditKnowledge}
                  handleTogglePublishKnowledge={handleTogglePublishKnowledge}
                  handleDeleteKnowledge={handleDeleteKnowledge}
                  handleRestoreKnowledge={handleRestoreKnowledge}
                  getTimelineHealth={getTimelineHealth}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* 4. MODAL: COMPOSE / EDIT BLOG ARTICLE */}
      <BlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalTab={modalTab}
        setModalTab={setModalTab}
        editingBlog={editingBlog}
        formData={formData}
        setFormData={setFormData}
        formLoading={formLoading}
        uploadingBlogImage={uploadingBlogImage}
        handleBlogImageUpload={handleBlogImageUpload}
        handleFormSubmit={handleFormSubmit}
        applyFormatting={applyFormatting}
        handleInsertLink={handleInsertLink}
        handleClearFormatting={handleClearFormatting}
        contentRef={contentRef}
      />

      {/* 5. MODAL: COMPOSE / EDIT KNOWLEDGE HUB TECHNICAL GUIDE */}
      <KnowledgeModal
        isOpen={isKnowledgeModalOpen}
        onClose={() => setIsKnowledgeModalOpen(false)}
        knowledgeModalTab={knowledgeModalTab}
        setKnowledgeModalTab={setKnowledgeModalTab}
        editingKnowledge={editingKnowledge}
        knowledgeFormData={knowledgeFormData}
        setKnowledgeFormData={setKnowledgeFormData}
        knowledgeFormLoading={knowledgeFormLoading}
        uploadingKnowledgeImage={uploadingKnowledgeImage}
        handleKnowledgeImageUpload={handleKnowledgeImageUpload}
        showContentPreview={showContentPreview}
        setShowContentPreview={setShowContentPreview}
        handleKnowledgeFormSubmit={handleKnowledgeFormSubmit}
        applyKnowledgeFormatting={applyKnowledgeFormatting}
        handleInsertKnowledgeLink={handleInsertKnowledgeLink}
        handleClearKnowledgeFormatting={handleClearKnowledgeFormatting}
        knowledgeContentRef={knowledgeContentRef}
        handleAddQuickStat={handleAddQuickStat}
        handleRemoveQuickStat={handleRemoveQuickStat}
        handleUpdateQuickStat={handleUpdateQuickStat}
        handleUpdateMatrixHeader={handleUpdateMatrixHeader}
        handleAddMatrixRow={handleAddMatrixRow}
        handleRemoveMatrixRow={handleRemoveMatrixRow}
        handleUpdateMatrixRow={handleUpdateMatrixRow}
        handleAddFaq={handleAddFaq}
        handleRemoveFaq={handleRemoveFaq}
        handleUpdateFaq={handleUpdateFaq}
      />

      {/* 6. MODAL: DELETE / ARCHIVE CONFIRMATION */}
      <DeleteConfirmModal
        isOpen={deleteModalState.isOpen}
        onClose={() =>
          !deleteModalState.isDeleting &&
          setDeleteModalState((prev) => ({ ...prev, isOpen: false }))
        }
        onConfirm={handleConfirmDelete}
        title={deleteModalState.title}
        type={deleteModalState.type}
        isDeleting={deleteModalState.isDeleting}
      />
    </div>
  );
};

export default AdminPage;
