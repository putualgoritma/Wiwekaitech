'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  pagination?: {
    page: number;
    page_size: number;
    total: number;
    pages: number;
  };
  error?: {
    code: string;
    message: string;
  };
}

interface UseApiDataOptions {
  page?: number;
  page_size?: number;
  [key: string]: any;
}

/**
 * Reusable hook for fetching data from the API
 * Handles loading, error states, and proper typing
 * Automatically uses the correct language based on locale
 */
export function useApiData<T>(
  endpoint: string,
  options?: UseApiDataOptions
) {
  const locale = useLocale();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams({
        lang: locale,
        ...(options?.page && { page: options.page.toString() }),
        ...(options?.page_size && { page_size: options.page_size.toString() }),
        ...Object.fromEntries(
          Object.entries(options || {}).filter(([key]) => !['page', 'page_size'].includes(key))
        )
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}${endpoint}?${params}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result: ApiResponse<T> = await response.json();

      if (!result.success) {
        throw new Error(result.error?.message || 'Unknown API error');
      }

      setData(result.data || null);
      if (result.pagination) {
        setPagination(result.pagination);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [endpoint, locale, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    pagination,
    refetch: fetchData
  };
}
