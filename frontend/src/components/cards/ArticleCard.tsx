import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Calendar } from 'lucide-react';
import { Article } from '../../types/blog';
import { Badge } from '../ui/Badge';

export interface ArticleCardProps {
  article: Article;
  basePath?: string; // '/learn/knowledge-hub' or '/learn/blog'
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  basePath = '/learn/knowledge-hub',
}) => {
  return (
    <Link
      to={`${basePath}/${article.slug}`}
      className="group bg-white rounded-lg border border-slate-200/80 overflow-hidden shadow-lg hover:shadow-xl shadow-black/50 hover:border-[#2B3CB8]/70 hover:shadow-[#2B3CB8]/10 transition-all duration-300 flex flex-col cursor-pointer"
    >
      <div className="relative aspect-video lg:aspect-auto lg:h-48 overflow-hidden bg-slate-100">
        <img
          src={article.imageUrl || '/images/blog/default.webp'}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.endsWith('/images/blog/default.webp')) {
              target.src = '/images/blog/default.webp';
            }
          }}
        />
        <div className="absolute top-3 left-3">
          <Badge variant="blue" size="sm">
            {article.category}
          </Badge>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {article.publishDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {article.readTime}
            </span>
          </div>

          <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#2B3CB8] transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>

          <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            By <span className="font-semibold text-slate-700">{article.author}</span>
          </div>
          <span
            className="inline-flex items-center gap-1 text-xs font-bold text-[#2B3CB8] group-hover:text-[#1D2984] transition-colors"
          >
            Read Guide
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};
