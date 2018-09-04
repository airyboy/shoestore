import React from 'react';

export default function SidebarSection(props) {
    return (
        <section className="sidebar__division">
            <div className={`sidebar__${props.classSuffix}`}>
                <div className="sidebar__division-title">
                    <h3>{props.title}</h3><div className="opener-up"></div>
                    {props.children}
                </div>
            </div>
        </section>
    )
}