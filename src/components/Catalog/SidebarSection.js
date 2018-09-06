import React from 'react';

export default class SidebarSection extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            collapsed: false
        }
    }

    render() {
    return (
        <section className="sidebar__division">
            <div className={`sidebar__${this.props.classSuffix}`}>
                <div className="sidebar__division-title">
                    <h3>{this.props.title}</h3><div onClick={() => this.setState(prevState => ({ collapsed: !prevState.collapsed  }))} className={this.state.collapsed ? 'opener-up' : 'opener-down'}></div>
                    {!this.state.collapsed && this.props.children}
                </div>
            </div>
        </section>
    )}
}