export { KnowledgeHubPage } from './KnowledgeHub';
export { KnowledgeDetailPage } from './KnowledgeHub/KnowledgeDetailPage';
export { BlogPage } from './Blog';
export { BlogDetailPage } from './Blog/BlogDetailPage';

export default {
  KnowledgeHub: () => import('./KnowledgeHub'),
  Blog: () => import('./Blog'),
};
