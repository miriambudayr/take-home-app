import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './PageNavigation.css';

const renderLeftEnd = () => {
  return (
    <Fragment>
      <Link to={'/1'} className='number'>
        {'<'}
      </Link>
    </Fragment>
  );
};

const renderRightEnd = (pageCount) => {
  return (
    <Fragment>
      <Link to={`/${pageCount}`} className='number'>
        {'>'}
      </Link>
    </Fragment>
  );
};

const renderPageNumbers = (pageCount, currentPage) => {
  return (
    <Fragment>
      {[...Array(pageCount)].map(function (val, i) {
        const className = i + 1 === currentPage ? 'number active' : 'number';

        return (
          <Link to={`/${i + 1}`} className={className}>
            {i + 1}
          </Link>
        );
      })}
    </Fragment>
  );
};

export default function PageNavigation({ pageCount, currentPage }) {
  return (
    <div className='page-numbers'>
      {renderLeftEnd()}
      {renderPageNumbers(pageCount, currentPage)}
      {renderRightEnd(pageCount)}
    </div>
  );
}
