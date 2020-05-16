import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './PageNavigation.css';

export default function PageNavigation({ pageCount, currentPage }) {
  return (
    <div className='page-numbers'>
      <Link to={'/1'} className='number'>
        {'<'}
      </Link>
      {[...Array(pageCount)].map(function (val, i) {
        const className = i + 1 === currentPage ? 'number active' : 'number';

        return (
          <Link to={`/${i + 1}`} className={className}>
            {i + 1}
          </Link>
        );
      })}
      <Link to={`/${pageCount}`} className='number'>
        {'>'}
      </Link>
    </div>
  );
}
