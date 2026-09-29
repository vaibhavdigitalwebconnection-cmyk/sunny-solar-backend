import React from 'react';
import {
  BookOpen,
  Plus,
  ExternalLink,
  Edit3,
  RotateCcw,
  Trash2
} from 'lucide-react';
import { KnowledgeItem, TimelineHealth } from '../types';

interface KnowledgeGridProps {
  sortedFilteredKnowledge: KnowledgeItem[];
  handleOpenCreateKnowledge: () => void;
  handleOpenEditKnowledge: (item: KnowledgeItem) => void;
  handleTogglePublishKnowledge: (item: KnowledgeItem) => void;
  handleDeleteKnowledge: (id: string, title: string) => void;
  handleRestoreKnowledge: (id: string, title: string) => void;
  getTimelineHealth: (item: { isPublished: boolean; isDeleted?: boolean; views: number }) => TimelineHealth;
}

export const KnowledgeGrid: React.FC<KnowledgeGridProps> = ({
  sortedFilteredKnowledge,
  handleOpenCreateKnowledge,
  handleOpenEditKnowledge,
  handleTogglePublishKnowledge,
  handleDeleteKnowledge,
  handleRestoreKnowledge,
  getTimelineHealth
}) => {
  if (sortedFilteredKnowledge.length === 0) {
    return (
      <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center text-neutral-400">
        <BookOpen className="w-10 h-10 mx-auto mb-3 text-neutral-300" />
        <p className="font-bold text-sm text-neutral-800">No Knowledge Hub found</p>
        <p className="text-xs text-neutral-400 mt-1">
          Try adjusting your search query, filter criteria, or add a new guide.
        </p>
        <button
          type="button"
          onClick={handleOpenCreateKnowledge}
          className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 text-white text-xs font-medium rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Technical Guide</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedFilteredKnowledge.map((item) => {
        const health = getTimelineHealth(item);
        return (
          <div
            key={item._id}
            className="bg-white rounded-xl border border-neutral-300/90 shadow-md hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group"
          >
            {/* Card Image Header with Floating Glass Badges */}
            <div className="relative h-44 w-full overflow-hidden bg-neutral-100">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover  transition-transform duration-500"
                  onError={(e: any) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-neutral-800 to-neutral-950 flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-neutral-600" />
                </div>
              )}

              {/* Top Floating Glass Badges & Action Buttons */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium backdrop-blur-md border ${item.isDeleted
                      ? 'bg-black/50 text-amber-300 border-amber-400/30'
                      : item.isPublished
                        ? 'bg-black/50 text-blue-400 border-blue-400/30'
                        : 'bg-black/50 text-neutral-300 border-white/20'
                    }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${item.isDeleted
                        ? 'bg-amber-400'
                        : item.isPublished
                          ? 'bg-blue-600'
                          : 'bg-black'
                      }`}
                  />
                  {item.isDeleted ? 'Archived' : item.isPublished ? 'Active' : 'Draft'}
                </span>

                <div className="flex items-center gap-1.5">
                  <a
                    href={`/learn/knowledge-hub/${item.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white/90 flex items-center justify-center border border-white/15 transition-colors cursor-pointer"
                    title="Open Public Link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleOpenEditKnowledge(item)}
                    className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white/90 flex items-center justify-center border border-white/15 transition-colors cursor-pointer"
                    title="Edit Technical Guide"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-4.5 pt-14 pointer-events-none">

                <h3 className="text-base font-bold text-white line-clamp-1 transition-colors drop-shadow-xs">
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4.5 flex-1 flex flex-col justify-between space-y-4">
              {/* Cycle Line */}
              <div>

                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-xs font-bold text-neutral-900">{item.category}</span>
                  <span className="text-[11px] text-neutral-900">
                    {item.readTime || '6 min read'}
                  </span>
                </div>
              </div>


              {/* Meta Stats Grid: 2 Columns */}
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <span className="text-[10px] font-medium text-black block">Due date</span>
                  <span className="text-xs font-bold text-black/80 block truncate mt-0.5">
                    {item.publishDate || '22 Feb 2026'}
                  </span>

                </div>

                <div>
                  <span className="text-[10px] font-medium text-black/70 block">
                    Tasks closed
                  </span>
                  <span className="text-xs font-bold text-neutral-900 block truncate mt-0.5">
                    {item.isPublished ? 'Live on site' : 'Draft Mode'}
                  </span>
                  <span className="text-[10px] text-blue-600 block truncate font-medium">
                    {item.views || 0} total reads
                  </span>
                </div>
              </div>
            </div>

            {/* Card Bottom Action Footer */}
            <div className="border-t border-neutral-100 px-4.5 py-3 bg-neutral-50/50 flex items-center justify-between text-xs">
              {item.isDeleted ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Archived in DB
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleTogglePublishKnowledge(item)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer transition-all border ${item.isPublished
                      ? 'bg-blue-50/40 text-blue-900 border-blue-200 hover:bg-blue-100'
                      : 'bg-white text-black border-neutral-200 hover:bg-neutral-100'
                    }`}
                  title="Toggle Live / Draft Status"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${item.isPublished ? 'bg-blue-600' : 'bg-black'
                      }`}
                  />
                  <span>{item.isPublished ? 'Live' : 'Draft'}</span>
                </button>
              )}

              <div className="flex items-center gap-1">
                {item.isDeleted ? (
                  <button
                    type="button"
                    onClick={() => handleRestoreKnowledge(item._id, item.title)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-medium cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Restore</span>
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => handleOpenEditKnowledge(item)}
                      className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50/50 rounded-md transition-colors cursor-pointer border border-transparent"
                      title="Edit Guide"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteKnowledge(item._id, item.title)}
                      className="p-1.5 text-red-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer border border-transparent hover:border-rose-200"
                      title="Move to Recycle Bin"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
