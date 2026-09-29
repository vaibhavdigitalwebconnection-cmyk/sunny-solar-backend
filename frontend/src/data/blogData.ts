import type { Article } from '../types/blog';

export type { Article };

/**
 * All Blog & Knowledge Hub content is now dynamically fetched directly from the MongoDB backend API.
 * Static mock data has been removed.
 */
export const articlesData: Article[] = [];
