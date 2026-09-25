import React, { useState, useEffect } from 'react';
import { ArticleCard } from '../../../../components/cards/ArticleCard';
import { Newspaper } from 'lucide-react';
import { api } from '../../../../services/api';
import type { Article } from '../../../../types/blog';
import { articlesData } from '../../../../data/blogData';
import LatticeLoadingBlock from '../../../../components/ui/LatticeLoadingBlock';

const categories = [
  'All Articles',
  'Solar Basics',
  'Batteries',
  'Buying Solar',
  'Technical',
  'Existing Solar',
] as const;

export const BlogGridSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Articles');
  const [articles, setArticles] = useState<Article[]>(() => articlesData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchArticles = async () => {
      try {
        const res = await api.getBlogs(selectedCategory);
        if (isMounted && res?.data && res.data.length > 0) {
          setArticles(res.data);
        } else if (isMounted) {
          const fallbackFiltered = selectedCategory === 'All Articles'
            ? articlesData
            : articlesData.filter((a) => a.category === selectedCategory);
          setArticles(fallbackFiltered);
        }
      } catch (err) {
        if (isMounted) {
          const fallbackFiltered = selectedCategory === 'All Articles'
            ? articlesData
            : articlesData.filter((a) => a.category === selectedCategory);
          setArticles(fallbackFiltered);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchArticles();

    return () => {
      isMounted = false;
    };
  }, [selectedCategory]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      {/* Header & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4 mb-8">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Recent Publications</h3>
          <p className="text-xs text-slate-500 mt-0.5">Explore our latest field reports, price guides, and case studies</p>
        </div>

        {/* Category filter pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <LatticeLoadingBlock label="Loading articles" />
      ) : articles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
          <Newspaper className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-800">No articles in this category</h4>
          <p className="text-xs text-slate-500 mt-1">Please select another category above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              basePath="/learn/blog"
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default BlogGridSection;
