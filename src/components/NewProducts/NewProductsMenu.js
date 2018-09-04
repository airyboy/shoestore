export default function NewProductsMenu(props) {
    const changeActiveCategory = (e, id) => {
        e.preventDefault();
        props.onChangeActiveCategory(id);
    }

    return (
    <div className="new-deals__menu">
        <ul className="new-deals__menu-items">
            {props.categories.map(c => 
                <li className={'new-deals__menu-item ' + (c.id === props.aciveCategoryId ? 'new-deals__menu-item_active' : '') } key={c.id}>
                    <a href="#" onClick={e => changeActiveCategory(e, c.id)}>{c.name}</a>
                </li>
            )}
        </ul>
    </div>        
    )
}