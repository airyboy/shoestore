import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Pager(props) {
    console.log(props)
    if (+props.totalPages < 2) {
        return null;
    }

    const pageNums = []

    if (props.totalPages < 6) {
        pageNums.push(...[...Array(props.totalPages).keys()].map(k => k + 1))
    } else {
        pageNums.push(1)
        if (props.currentPage - 2 > 1 & props.currentPage + 2 < props.totalPages) {
            pageNums.push(null)
            pageNums.push(props.currentPage - 2)
            pageNums.push(props.currentPage - 1)
            pageNums.push(props.currentPage)
            pageNums.push(props.currentPage + 1)
            pageNums.push(props.currentPage + 2)            
            pageNums.push(null)
        } else if (props.currentPage - 2 <= 1) {
            pageNums.push(2)
            pageNums.push(3)
            pageNums.push(4)
            pageNums.push(null)
        } else if (props.currentPage + 2 >= props.totalPages) {
            pageNums.push(null)
            pageNums.push(props.totalPages - 3)
            pageNums.push(props.totalPages - 2)
            pageNums.push(props.totalPages - 1)
        }
        
        pageNums.push(props.totalPages)
    }

    return (
            <div className="product-catalogue__pagination">
                <div className="page-nav-wrapper">
                <div className="angle-back"><a href="#"></a></div>
                <ul>
                    {pageNums.map(p => 
                        <li key={p !== null ? p : Math.random(props.totalPages + 1, 10000)} 
                            className={p === props.currentPage ? 'active' : ''}>

                            <NavLink to={props.to + p}>
                                {p === null ? '...' : p}
                            </NavLink>

                        </li>)}
                </ul>
                <div className="angle-forward"><a href="#"></a></div>
                </div>
            </div>
    )
}