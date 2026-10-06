import React from 'react';
import { FileText, ExternalLink, Edit3, Trash2, RotateCcw } from 'lucide-react';
import { BlogItem, TimelineHealth } from '../types';

interface BlogTableProps {
  sortedFilteredBlogs: BlogItem[];
  handleOpenEdit: (blog: BlogItem) => void;
  handleTogglePublish: (blog: BlogItem) => void;
  handleDeleteBlog: (id: string, title: string) => void;
  handleRestoreBlog?: (id: string, title: string) => void;
  getTimelineHealth: (item: { isPublished: boolean; isDeleted?: boolean; views: number }) => TimelineHealth;
}

export const BlogTable: React.FC<BlogTableProps> = ({
  sortedFilteredBlogs,
  handleOpenEdit,
  handleTogglePublish,
  handleDeleteBlog,
  handleRestoreBlog,
}) => {
  return (
    <div data-lenis-prevent className="bg-white border border-neutral-200 rounded-xl shadow-2xs overflow-hidden w-full">
      {sortedFilteredBlogs.length === 0 ? (
        <div className="py-12 px-4 text-center text-neutral-400">
          <FileText className="w-8 h-8 mx-auto mb-2 text-neutral-300" />
          <p className="font-semibold text-sm text-neutral-700">No blog articles found</p>
          <p className="text-xs text-neutral-400 mt-1">
            Try adjusting your filters or search query.
          </p>
        </div>
      ) : (
        <>
          {/* ── MOBILE LIST VIEW (< sm screens: 100% full width, zero clipping) ── */}
          <div className="sm:hidden divide-y divide-neutral-100 max-h-[calc(100vh-280px)] overflow-y-auto">
            {sortedFilteredBlogs.map((blog) => (
              <div key={blog._id} className="p-3.5 space-y-2.5 hover:bg-neutral-50/60 transition-colors">
                <div className="flex items-start gap-3">
                  {blog.imageUrl && (
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-11 h-11 rounded-lg object-cover shrink-0 border border-neutral-200"
                      onError={(e: any) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-neutral-900 block text-xs leading-snug line-clamp-2">
                      {blog.title}
                    </span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">
                      by {blog.author || 'Admin'} • {blog.publishDate || 'Recent'}
                    </span>
                  </div>
                </div>

                {/* Metadata & Actions Bar */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-neutral-100">
                  <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                    {/* Category */}
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 text-neutral-700 truncate max-w-28">
                      {blog.category}
                    </span>

                    {/* Status Badge */}
                    {blog.isDeleted ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>Archived</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(blog)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold cursor-pointer transition-all border ${
                          blog.isPublished
                            ? 'bg-blue-50/50 text-blue-900 border-blue-200'
                            : 'bg-white text-neutral-700 border-neutral-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            blog.isPublished ? 'bg-blue-600' : 'bg-neutral-400'
                          }`}
                        />
                        <span>{blog.isPublished ? 'Live' : 'Draft'}</span>
                      </button>
                    )}

                    {/* Views */}
                    <span className="text-[10px] text-blue-600 font-bold whitespace-nowrap">
                      {blog.views || 0} reads
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <a
                      href={`/learn/blog/${blog.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-md transition-colors"
                      title="Preview"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    {blog.isDeleted ? (
                      handleRestoreBlog && (
                        <button
                          type="button"
                          onClick={() => handleRestoreBlog(blog._id, blog.title)}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-md text-[10px] font-medium cursor-pointer transition-colors"
                          title="Restore Article"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Restore</span>
                        </button>
                      )
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(blog)}
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50/50 rounded-md transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteBlog(blog._id, blog.title)}
                          className="p-1.5 text-red-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── DESKTOP TABLE VIEW (sm+ screens) ── */}
          <div data-lenis-prevent className="hidden sm:block overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)]">
            <table className="w-full min-w-200 text-left border-collapse text-xs">
              <thead className="sticky top-0 z-10 bg-neutral-50/95 backdrop-blur-xs border-b border-neutral-200 shadow-2xs">
                <tr className="text-black font-bold uppercase tracking-wider">
                  <th className="py-3 px-5 whitespace-nowrap">Article Info</th>
                  <th className="py-3 px-5 whitespace-nowrap">Category</th>
                  <th className="py-3 px-5 whitespace-nowrap">Status</th>
                  <th className="py-3 px-5 whitespace-nowrap">Reads</th>
                  <th className="py-3 px-5 whitespace-nowrap">Due Date</th>
                  <th className="py-3 px-5 text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-600 font-medium">
                {sortedFilteredBlogs.map((blog) => {
                  return (
                    <tr key={blog._id} className="hover:bg-neutral-50/60 transition-colors">
                      <td className="py-3 px-5 min-w-60">
                        <div className="flex items-center gap-3">
                          {blog.imageUrl && (
                            <img
                              src={blog.imageUrl}
                              alt={blog.title}
                              className="w-9 h-9 rounded-lg object-cover shrink-0 border border-neutral-200"
                              onError={(e: any) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          )}
                          <div className="min-w-0">
                            <span className="font-bold text-neutral-900 block truncate max-w-xs text-xs">
                              {blog.title}
                            </span>
                            <span className="text-[10px] text-neutral-400 block truncate">
                              by {blog.author || 'Admin'}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-5 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-neutral-100 text-neutral-800">
                          {blog.category}
                        </span>
                      </td>

                      <td className="py-3 px-5 whitespace-nowrap">
                        {blog.isDeleted ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span>Archived</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleTogglePublish(blog)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer transition-all border ${
                              blog.isPublished
                                ? 'bg-blue-50/40 text-blue-900 border-blue-200 hover:bg-blue-100'
                                : 'bg-white text-black border-neutral-200 hover:bg-neutral-100'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                blog.isPublished ? 'bg-blue-600' : 'bg-black'
                              }`}
                            />
                            <span>{blog.isPublished ? 'Live' : 'Draft'}</span>
                          </button>
                        )}
                      </td>

                      <td className="py-3 px-5 font-bold text-blue-600 whitespace-nowrap">
                        {blog.views || 0}
                      </td>

                      <td className="py-3 px-5 text-neutral-800 font-medium whitespace-nowrap">
                        {blog.publishDate || 'Recent'}
                      </td>

                      <td className="py-3 px-5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <a
                            href={`/learn/blog/${blog.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-md transition-colors"
                            title="Preview"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          {blog.isDeleted ? (
                            handleRestoreBlog && (
                              <button
                                type="button"
                                onClick={() => handleRestoreBlog(blog._id, blog.title)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-medium cursor-pointer transition-colors"
                                title="Restore Article"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Restore</span>
                              </button>
                            )
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => handleOpenEdit(blog)}
                                className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50/50 rounded-md transition-colors cursor-pointer"
                                title="Edit"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteBlog(blog._id, blog.title)}
                                className="p-1.5 text-red-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
