import React from 'react';
import { FilterOptions, types } from "../../catalog_filter_options"

import SidebarSection from "./SidebarSection"

const filterOptions = new FilterOptions()
console.log(filterOptions)

export default function Sidebar(props) {
    const onFilterChange =  (key, val) => {
        props.onFilterChange(key, val)
    }

        return (
            <section className="sidebar">
            <SidebarSection title="Каталог" classSuffix="catalogue-list">
                <ul>
                    {filterOptions.types.map(opt => 
                        <li key={opt} className={opt === props.filters.type ? 'active' : ''} onClick={() => props.onFilterChange('type', opt)}>{opt}</li>
                    )}
                </ul>
            </SidebarSection>
            <div className="separator-150 separator-150-1"></div>
            <SidebarSection title="Цена" classSuffix="price">
                <div className="price-slider">
                    <div className="circle-container">
                        <div className="circle-1"></div>
                        <div className="line-white"></div>
                        <div className="line-colored"></div>
                        <div className="circle-2"></div>
                    </div>
                    <div className="counter">
                        <input type="text" className="input-1" value={props.filters.minPrice} onChange={(e) => props.onFilterChange('minPrice', e.target.value)} />
                        <div className="input-separator"></div>
                        <input type="text" className="input-2" value={props.filters.maxPrice} onChange={(e) => props.onFilterChange('maxPrice', e.target.value)} />
                    </div>
                </div>
            </SidebarSection>
            <div className="separator-150 separator-150-2"></div>
            <SidebarSection title="Цвет" classSuffix="color">
                <ul>
                    {filterOptions.colors.map(opt => 
                        <li key={opt.class} className={opt.name === props.filters.color ? 'active' : ''} onClick={() => props.onFilterChange('color', opt.name)}>
                                <div className={`color ${opt.class}`}></div>
                                <span className="color-name">{opt.name}</span>
                        </li>    
                    )}
                </ul>
            </SidebarSection>
            <div className="separator-150 separator-150-3"></div>         
            <SidebarSection title="Размер" classSuffix="size">
                <ul>
                    <div className="list-1">
                        {filterOptions.sizes.odd.map(opt => 
                            <li key={opt}>
                                <label>
                                    <input type="checkbox" className="checkbox" onClick={() => props.onFilterChange('size', opt)}
                                        checked={props.filters.size === opt} name={`checkbox-${opt}`} />
                                    <span className="checkbox-custom"></span> 
                                    <span className="label">{opt}</span>
                                </label>
                            </li>
                        )}
                    </div>
                    <div className="list-2">
                        {filterOptions.sizes.even.map(opt => 
                            <li key={opt}>
                                <label>
                                    <input type="checkbox" className="checkbox" onClick={() => props.onFilterChange('size', opt)}
                                        checked={props.filters.size === opt} name={`checkbox-${opt}`} />
                                    <span className="checkbox-custom"></span>
                                    <span className="label">{opt}</span>
                                </label>
                            </li>
                        )}
                    </div>
                </ul>
            </SidebarSection>
            <div className="separator-150 separator-150-4"></div> 
            <SidebarSection title="Размер каблука" classSuffix="heel-height">
                <ul>
                    <div className="list-1">
                        {filterOptions.heelSizes.odd.map(opt => 
                            <li key={opt}>
                                <label>
                                    <input type="checkbox" className="checkbox" onClick={() => props.onFilterChange('heelSize', opt)}
                                        checked={props.filters.heelSize === opt} name={`checkbox-${opt}`} />
                                    <span className="checkbox-custom"></span>
                                    <span className="label">{opt}</span>
                                </label>
                            </li>
                        )}
                </div>
                    <div className="list-2">
                        {filterOptions.heelSizes.even.map(opt => 
                            <li key={opt}>
                                <label>
                                    <input type="checkbox" className="checkbox" onClick={() => props.onFilterChange('heelSize', opt)}
                                        checked={props.filters.heelSize === opt} name={`checkbox-${opt}`} />
                                    <span className="checkbox-custom"></span>
                                    <span className="label">{opt}</span>
                                </label>
                            </li>
                        )}
                </div>
                </ul>
            </SidebarSection>        
            <div className="separator-150 separator-150-5"></div>            
            <SidebarSection title="Повод" classSuffix="occasion">
                <ul>
                    {filterOptions.reasons.map(opt => 
                        <li key={opt} className={opt === props.filters.reason ? 'active' : ''} onClick={() => props.onFilterChange('reason', opt)}>{opt}</li>
                    )}
                </ul>
            </SidebarSection>
            <div className="separator-150 separator-150-6"></div>       
            <SidebarSection title="Сезон" classSuffix="season">
                <ul>
                    {filterOptions.seasons.map(opt => 
                        <li key={opt} className={opt === props.filters.season ? 'active' : ''} onClick={() => props.onFilterChange('season', opt)}>{opt}</li>
                    )}
                </ul>
            </SidebarSection>        
            <div className="separator-150 separator-150-7"></div>            
            <SidebarSection title="Бренд" classSuffix="brand">
            </SidebarSection>        
            <section className="sidebar__division">
                <div className="sidebar__brand">
                    <h3>Бренд</h3>
                    <form action="post" className="brand-search">
                    <input type="search" className="brand-search" id="brand-search" placeholder="Поиск" />
                    <input type="submit" name="" value="" className="submit" />
                    </form>
                </div>

                    <label><input type="checkbox" className="checkbox" name="checkbox-disc" /><span className="checkbox-discount"></span> <span className="text-discount">Со скидкой</span></label>

                <div className="separator-240"></div>
            </section>
                
            <section className="sidebar__division">    
                <div className="drop-down">
                <a href="#"><span className="drop-down-icon"></span>Сбросить</a>
                </div>
            </section>
            </section>
        )
    
}