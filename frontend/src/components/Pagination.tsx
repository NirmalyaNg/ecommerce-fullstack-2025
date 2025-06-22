'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageClick = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i} className={`page-item  ${i === currentPage ? 'active' : ''}`}>
          <button className='page-link' onClick={() => handlePageClick(i)}>
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <nav>
      <ul className='pagination justify-content-center mt-4'>{renderPageNumbers()}</ul>
    </nav>
  );
};

export default Pagination;
