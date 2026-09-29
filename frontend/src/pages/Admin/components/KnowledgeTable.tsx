import React from 'react';
import { BookOpen, ExternalLink, Edit3, Trash2, RotateCcw } from 'lucide-react';
import { KnowledgeItem, TimelineHealth } from '../types';

interface KnowledgeTableProps {
  sortedFilteredKnowledge: KnowledgeItem[];
  handleOpenEditKnowledge: (item: KnowledgeItem) => void;
  handleTogglePublishKnowledge: (item: KnowledgeItem) => void;
  handleDeleteKnowledge: (id: string, title: string) => void;
  handleRestoreKnowledge?: (id: string, title: string) => void;
  getTimelineHealth: (item: { isPublished: boolean; isDeleted?: boolean; views: number }) => TimelineHealth;
}

export const KnowledgeTable: React.FC<KnowledgeTableProps> = ({
  sortedFilteredKnowledge,
  handleOpenEditKnowledge,
  handleTogglePublishKnowledge,
  handleDeleteKnowledge,
  handleRestoreKnowledge,
  getTimelineHealth
}) => {
  return (
    <div data-lenis-prevent className="bg-white border border-neutral-200 rounded-xl shadow-2xs overflow-hidden">
      <div data-lenis-prevent className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)]">
        <table className="w-full min-w-200 text-left border-collapse text-xs">
          <thead className="sticky top-0 z-10 bg-neutral-50/95 backdrop-blur-xs border-b border-neutral-200 shadow-2xs">
            <tr className="text-black font-bold uppercase tracking-wider">
              <th className="py-3 px-5 whitespace-nowrap">Guide Info</th>
              <th className="py-3 px-5 whitespace-nowrap">Category</th>
              <th className="py-3 px-5 whitespace-nowrap">Status</th>
              <th className="py-3 px-5 whitespace-nowrap">Reads</th>
              <th className="py-3 px-5 whitespace-nowrap">Due Date</th>
              <th className="py-3 px-5 text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-neutral-600 font-medium">
            {sortedFilteredKnowledge.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-neutral-400">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 text-neutral-300" />
                  <p className="font-semibold text-sm text-neutral-700">
                    No Knowledge Hub guides found
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">
                    Try adjusting your filters or search query.
                  </p>
                </td>
              </tr>
            ) : (
              sortedFilteredKnowledge.map((item) => {
                const health = getTimelineHealth(item);
                return (
                  <tr key={item._id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-3 px-5 min-w-60">
                      <div className="flex items-center gap-3">
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-9 h-9 rounded-lg object-cover shrink-0 border border-neutral-200"
                            onError={(e: any) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        )}
                        <div className="min-w-0">
                          <span className="font-bold text-neutral-900 block truncate max-w-xs text-xs">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-neutral-400 block truncate">
                            by {item.author || 'Admin'}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-5 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-neutral-100 text-neutral-800">
                        {item.category}
                      </span>
                    </td>

                    <td className="py-3 px-5 whitespace-nowrap">
                      {item.isDeleted ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>Archived</span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleTogglePublishKnowledge(item)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium cursor-pointer transition-all border ${
                            item.isPublished
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:bg-neutral-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.isPublished ? 'bg-emerald-500' : 'bg-neutral-400'
                            }`}
                          />
                          <span>{item.isPublished ? 'Live' : 'Draft'}</span>
                        </button>
                      )}
                    </td>

                    <td className="py-3 px-5 font-bold text-neutral-800 whitespace-nowrap">
                      {item.views || 0}
                    </td>

                    <td className="py-3 px-5 text-neutral-500 whitespace-nowrap">
                      {item.publishDate || 'Recent'}
                    </td>

                    <td className="py-3 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`/learn/knowledge-hub/${item.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-md transition-colors"
                          title="Preview"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    {item.isDeleted ? (
                      handleRestoreKnowledge && (
                        <button
                          type="button"
                          onClick={() => handleRestoreKnowledge(item._id, item.title)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-medium cursor-pointer transition-colors"
                          title="Restore Guide"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Restore</span>
                        </button>
                      )
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleOpenEditKnowledge(item)}
                          className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-md transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteKnowledge(item._id, item.title)}
                          className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-md transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
