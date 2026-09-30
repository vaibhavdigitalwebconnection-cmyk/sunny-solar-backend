const RAW_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_BASE_URL = RAW_API_URL.replace(/\/+$/, '');

// Token helpers (stored in localStorage)
export const getAdminToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('sunny_admin_Jwt_token') || localStorage.getItem('sunny_admin_token');
  if (!token || token === 'undefined' || token === 'null' || token.trim() === '') {
    return null;
  }
  return token;
};

export const setAdminToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  if (!token || token === 'undefined' || token === 'null' || token.trim() === '') {
    removeAdminToken();
    return;
  }
  localStorage.setItem('sunny_admin_Jwt_token', token);
};

export const removeAdminToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('sunny_admin_Jwt_token');
  localStorage.removeItem('sunny_admin_token');
  localStorage.removeItem('sunny_admin_user');
};

export const getStoredAdminUser = () => {
  if (typeof window === 'undefined') return null;
  try {
    const user = localStorage.getItem('sunny_admin_user');
    if (!user || user === 'undefined' || user === 'null') return null;
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const setStoredAdminUser = (user: any) => {
  if (typeof window === 'undefined') return;
  if (!user) {
    localStorage.removeItem('sunny_admin_user');
    return;
  }
  localStorage.setItem('sunny_admin_user', JSON.stringify(user));
};

// Generic fetch wrapper with auth header & client telemetry
const request = async (endpoint: string, options: RequestInit = {}) => {
  const clientTimezone =
    typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : '';
  const clientLocale = typeof navigator !== 'undefined' ? navigator.language : '';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-client-timezone': clientTimezone || 'Asia/Kolkata',
    'x-client-locale': clientLocale || 'en-IN',
    ...((options.headers as Record<string, string>) || {})
  };

  // If body is FormData, do not set application/json so browser sets multipart boundary
  if (typeof FormData !== 'undefined' && options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  const token = getAdminToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${cleanEndpoint}`, {
      ...options,
      headers
    });
  } catch (netErr: any) {
    console.error(`[API Network Error] ${options.method || 'GET'} ${cleanEndpoint}:`, netErr);
    throw new Error(
      netErr.message === 'Failed to fetch'
        ? `Could not reach server at ${API_BASE_URL}. Please check your connection or backend status.`
        : netErr.message || 'Network request failed'
    );
  }

  let data: any = {};
  try {
    data = await response.json();
  } catch {
    data = { message: response.statusText || 'API request failed' };
  }

  if (!response.ok) {
    if (response.status === 401) {
      removeAdminToken();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('auth:unauthorized', {
            detail: { message: data.message || 'Session expired or unauthorized. Please sign in again.' }
          })
        );
      }
    }

    const error: any = new Error(data.message || 'API request failed');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

// API Services
export const api = {
  // Auth
  login: async (credentials: { email: string; password: string }) => {
    const res = await request('/admin/login', {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.email.trim().toLowerCase(),
        password: credentials.password
      })
    });
    if (res.token) {
      setAdminToken(res.token);
      setStoredAdminUser(res.admin);
    }
    return res;
  },

  logout: () => {
    removeAdminToken();
  },

  getProfile: () => request('/admin/me'),

  getStats: () => request('/admin/stats'),

  // Health Check & Render Keep-Alive
  getHealth: () => request('/health'),

  // Image Upload to Cloudinary
  uploadImage: (image: string, folder: string = 'sunny-solar'): Promise<{ success: boolean; url: string; public_id?: string; message?: string }> =>
    request('/upload', {
      method: 'POST',
      body: JSON.stringify({ image, folder })
    }),


  // Public Blogs
  getBlogs: (category?: string, search?: string) => {
    const params = new URLSearchParams();
    if (category && category !== 'All Articles') params.append('category', category);
    if (search) params.append('search', search);
    return request(`/blogs?${params.toString()}`);
  },

  getBlogBySlug: (slug: string) => request(`/blogs/${slug}`),

  // Admin Blogs
  getAllAdminBlogs: () => request('/blogs/admin/all'),

  createBlog: (blogData: any) =>
    request('/blogs', {
      method: 'POST',
      body: JSON.stringify(blogData)
    }),

  updateBlog: (id: string, blogData: any) =>
    request(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(blogData)
    }),

  togglePublishBlog: (id: string) =>
    request(`/blogs/${id}/publish`, {
      method: 'PATCH'
    }),

  deleteBlog: (id: string) =>
    request(`/blogs/${id}`, {
      method: 'DELETE'
    }),

  restoreBlog: (id: string) =>
    request(`/blogs/${id}/restore`, {
      method: 'PATCH'
    }),

  // Public Knowledge Hub
  getKnowledge: (category?: string, search?: string) => {
    const params = new URLSearchParams();
    if (category && category !== 'All Guides' && category !== 'All Categories') {
      params.append('category', category);
    }
    if (search) params.append('search', search);
    return request(`/knowledge?${params.toString()}`);
  },

  getKnowledgeBySlug: (slug: string) => request(`/knowledge/${slug}`),

  // Admin Knowledge Hub
  getAllAdminKnowledge: () => request('/knowledge/admin/all'),

  createKnowledge: (knowledgeData: any) =>
    request('/knowledge', {
      method: 'POST',
      body: JSON.stringify(knowledgeData)
    }),

  updateKnowledge: (id: string, knowledgeData: any) =>
    request(`/knowledge/${id}`, {
      method: 'PUT',
      body: JSON.stringify(knowledgeData)
    }),

  togglePublishKnowledge: (id: string) =>
    request(`/knowledge/${id}/publish`, {
      method: 'PATCH'
    }),

  deleteKnowledge: (id: string) =>
    request(`/knowledge/${id}`, {
      method: 'DELETE'
    }),

  restoreKnowledge: (id: string) =>
    request(`/knowledge/${id}/restore`, {
      method: 'PATCH'
    }),

  // Leads & Assessment Inquiries
  createLead: (leadData: any) =>
    request('/leads', {
      method: 'POST',
      body: JSON.stringify(leadData)
    }),

  getLeads: (status?: string, search?: string) => {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (search) params.append('search', search);
    return request(`/leads?${params.toString()}`);
  },

  updateLeadStatus: (id: string, status: string, notes?: string) =>
    request(`/leads/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes })
    })
};
