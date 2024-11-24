import paginateQueryConf from '@/types/TpaginateConfig'

import React, { Component, FC } from 'react'

import _ from 'lodash'

type navPropType = {
  pageCount: number
  currentPage: number
  goToNumberedPage: Function
  PAGE_SIZE: number
  orderByColumn: string
}

const Pagination: FC<navPropType> = props => {
  const { pageCount, currentPage, PAGE_SIZE, goToNumberedPage, orderByColumn = 'createdAt' } = props
  return (
    <nav aria-label='Page navigation example'>
      <ul className='inline-flex -space-x-px text-sm'>
        {pageCount < 1 || pageCount == 1
          ? ''
          : _.range(1, pageCount + 1).map(page => (
              <li key={page} className={page == currentPage ? 'text-rose-600' : 'text-blue-950'}>
                <a
                  onClick={() =>
                    goToNumberedPage({
                      currentPage: page,
                      pageSize: PAGE_SIZE,
                      orderByColumn: orderByColumn
                    })
                  }
                  className='text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 flex h-8 items-center justify-center border bg-white px-3 leading-tight dark:hover:text-white'
                >
                  {page}
                </a>
              </li>
            ))}
      </ul>
    </nav>
  )
}

export default Pagination
