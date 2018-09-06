import React from 'react';

import SidebarSection from "./SidebarSection"
import PriceSlider from "./PriceSlider"

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            types: [],
            brands: [],
            sizes: [],
            heelSizes: [],
            colors: [],
            reasons: [],
            seasons: [],
            filteredBrands: [],
            brandSearch: ''
        }
    }

    componentDidMount() {
        fetch('https://neto-api.herokuapp.com/bosa-noga/filters')        
        .then(resp => resp.json())
        .then(json => {
            const colors = json.data.color.sort()
            const brands = json.data.brand.sort()

            this.setState({
                types: json.data.type, 
                brands: brands,
                filteredBrands: brands,
                sizes: json.data.sizes,
                heelSizes: json.data.heelSize,
                colors: colors,
                reasons: json.data.reason,
                seasons: json.data.season
            })
        })
    }

    onResetFilter = (e) => {
        e.preventDefault()
        this.props.onResetFilter()
    }

    isSizeChecked = (filter, val) => {
        if (!filter) return false;
        const splitted = filter.split(',').map(a => parseInt(a))
        return splitted.findIndex(a => a === val) > -1
    }

    handleBrandSearchInput = (e) => {
        const search = e.target.value

        this.setState(prevState => {
            if (search === '') {
                return { filteredBrands: [...prevState.brands], brandSearch: '' }
            } else {
                const filtered = prevState.brands.filter(a => a.toLowerCase().indexOf(search.toLowerCase()) > -1)

                return { filteredBrands: filtered, brandSearch: search }
            }
        })
    }

    render() {
        return (
            <section className="sidebar">
            <SidebarSection title="Каталог" classSuffix="catalogue-list">
                <ul>
                    {this.state.types.map(opt => 
                        <li key={opt} className={opt === this.props.filters.type ? 'active' : ''} onClick={() => this.props.onFilterChange('type', opt)}>{opt}</li>
                    )}
                </ul>
            </SidebarSection>
            <div className="separator-150 separator-150-1"></div>
            <SidebarSection title="Цена" classSuffix="price" collapsed={false}>
                <PriceSlider 
                    minPrice={this.props.filters.minPrice} 
                    maxPrice={this.props.filters.maxPrice} 
                    onRangeChange={(key, val) => this.props.onFilterChange(key, val)} 
                    maxValue={100000} 
                    step={1000} />
            </SidebarSection>            
            <div className="separator-150 separator-150-2"></div>
            <SidebarSection title="Цвет" classSuffix="color" collapsed={false}>
                <ul>
                    {this.state.colors.map(opt => 
                        <li key={opt} className={opt === this.props.filters.color ? 'active' : ''} onClick={() => this.props.onFilterChange('color', opt)}>
                                <span className="color-name">{opt}</span>
                        </li>    
                    )}
                </ul>
            </SidebarSection>
            <div className="separator-150 separator-150-3"></div>         
            <SidebarSection title="Размер" classSuffix="size">
                <ul>
                    <div className="list-1">
                        {this.state.sizes.filter((s, i) => i % 2 === 0).map(opt => 
                            <li key={opt}>
                                <label>
                                    <input type="checkbox" className="checkbox" onChange={() => this.props.onFilterChange('size', opt)}
                                        checked={ this.isSizeChecked(this.props.filters.size, opt) } name={`checkbox-${opt}`} />
                                    <span className="checkbox-custom"></span> 
                                    <span className="label">{opt}</span>
                                </label>
                            </li>
                        )}
                    </div>
                    <div className="list-2">
                        {this.state.sizes.filter((s, i) => i % 2 > 0).map(opt => 
                            <li key={opt}>
                                <label>
                                    <input type="checkbox" className="checkbox" onChange={() => this.props.onFilterChange('size', opt)}
                                        checked={ this.isSizeChecked(this.props.filters.size, opt) } name={`checkbox-${opt}`} />
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
                        {this.state.heelSizes.filter(s => s%2 > 0).map(opt => 
                            <li key={opt}>
                                <label>
                                    <input type="checkbox" className="checkbox" onChange={() => this.props.onFilterChange('heelSize', opt)}
                                        checked={ this.isSizeChecked(this.props.filters.heelSize, opt) } name={`checkbox-${opt}`} />
                                    <span className="checkbox-custom"></span>
                                    <span className="label">{opt}</span>
                                </label>
                            </li>
                        )}
                </div>
                    <div className="list-2">
                        {this.state.heelSizes.filter(s => s%2 === 0).map(opt => 
                            <li key={opt}>
                                <label>
                                    <input type="checkbox" className="checkbox" onChange={() => this.props.onFilterChange('heelSize', opt)}
                                        checked={ this.isSizeChecked(this.props.filters.heelSize, opt) } name={`checkbox-${opt}`} />
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
                    {this.state.reasons.map(opt => 
                        <li key={opt} className={opt === this.props.filters.reason ? 'active' : ''} onClick={() => this.props.onFilterChange('reason', opt)}>{opt}</li>
                    )}
                </ul>
            </SidebarSection>
            <div className="separator-150 separator-150-6"></div>       
            <SidebarSection title="Сезон" classSuffix="season">
                <ul>
                    {this.state.seasons.map(opt => 
                        <li key={opt} className={opt === this.props.filters.season ? 'active' : ''} onClick={() => this.props.onFilterChange('season', opt)}>{opt}</li>
                    )}
                </ul>
            </SidebarSection>        
            <div className="separator-150 separator-150-7"></div>            
            <section className="sidebar__division">
                <div className="sidebar__brand">
                    <h3>Бренд</h3>
                    <form action="post" className="brand-search">
                        <input type="search" className="brand-search" id="brand-search" placeholder="Поиск" value={this.state.brandSearch} onChange={this.handleBrandSearchInput} />
                        <input type="submit" name="" value="" className="submit" />
                    </form>

                    <ul>
                        {this.state.filteredBrands.map(opt =>
                            <li key={opt} className={opt === this.props.filters.brand ? 'active' : ''} onClick={() => this.props.onFilterChange('brand', opt)}>{opt}</li>
                        )}
                    </ul>
                </div>

                <label><input type="checkbox" className="checkbox" name="checkbox-disc" checked={this.props.filters.discounted}
                    onChange={(e) => this.props.onFilterChange('discounted', e.target.checked || null)} />
                <span className="checkbox-discount"></span> 
                <span className="text-discount">Со скидкой</span></label>                         

                <div className="separator-240"></div>
            </section>
                
            <section className="sidebar__division">    
                <div className="drop-down">
                    <a href="#" onClick={this.onResetFilter}><span className="drop-down-icon"></span>Сбросить</a>
                </div>
            </section>
            </section>
        )
    }
}   