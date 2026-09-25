import React from 'react';
import { Article } from '../../../../types/blog';
import { ArticleCard } from '../../../../components/cards/ArticleCard';
import { BookOpen } from 'lucide-react';
import LatticeLoadingBlock from '../../../../components/ui/LatticeLoadingBlock';

interface KnowledgeHubGridSectionProps {
  articles: Article[];
  basePath?: string;
  loading?: boolean;
}

export const KnowledgeHubGridSection: React.FC<KnowledgeHubGridSectionProps> = ({
  articles,
  basePath = '/learn/knowledge-hub',
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LatticeLoadingBlock label="Loading guides" />
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No guides found</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try choosing a different topic category from the filters above.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            article={article}
            basePath={basePath}
          />
        ))}
      </div>
    </section>
  );
};

export default KnowledgeHubGridSection;
