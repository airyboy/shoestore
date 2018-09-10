import React from 'react'
import { NavLink } from 'react-router-dom';
import MenuList from "./MenuList"
import { encodeObject } from "../../utils"
import { resetFilter } from "../../reset_filter"

export default class QuickFiltersMenu extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            types: [],
            brands: [],
            reasons: [],
            seasons: []   
        }
    }

    componentDidMount() {
        fetch('https://neto-api.herokuapp.com/bosa-noga/filters')        
        .then(resp => resp.json())
        .then(json => {
            const brands = json.data.brand.sort()

            this.setState({
                types: json.data.type, 
                brands: brands,
                reasons: json.data.reason,
                seasons: json.data.season
            })
        })
    }

    composeUrl = (key, val) => {
        const filter = Object.assign({}, resetFilter);
        filter.categoryId = this.props.categoryId;
        filter[key] = val;

        return `/catalog/filter/${encodeObject(filter)}/page/1`
    }   

    render() {
        return (
            <div className={'dropped-menu' + (this.props.visible ? ' dropped-menu_visible' : '')}>
                <div className="wrapper">
                    <MenuList title="Повод:">
                        {this.state.reasons.map(reason => (
                            <li key={reason} className="dropped-menu__item">
                                <NavLink to={this.composeUrl('reason', reason)} onClick={()=>this.props.onHidePanel()}>{reason}</NavLink>
                            </li>
                        ))}
                    </MenuList>
                    <MenuList  title="Категории:">
                        {this.state.types.map(type => (
                            <li key={type} className="dropped-menu__item">
                                <NavLink to={this.composeUrl('type', type)} onClick={()=>this.props.onHidePanel()}>{type}</NavLink>
                            </li>
                        ))}
                    </MenuList>
                    <MenuList  title="Сезон:">
                        {this.state.seasons.map(season => (
                            <li key={season} className="dropped-menu__item">
                                <NavLink to={this.composeUrl('season', season)} onClick={()=>this.props.onHidePanel()}>{season}</NavLink>
                            </li>
                        ))}
                    </MenuList>
                    <MenuList  title="Бренды:" columns="4">
                        {this.state.brands.map(brand => (
                            <li key={brand} className="dropped-menu__item">
                                <NavLink to={this.composeUrl('brand', brand)} onClick={()=>this.props.onHidePanel()}>{brand}</NavLink>
                            </li>
                        ))}
                    </MenuList>
                </div>
            </div>
        )
    }
}