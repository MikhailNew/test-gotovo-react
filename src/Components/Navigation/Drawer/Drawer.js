import React, {Component} from 'react';
import './Drawer.css';
import {NavLink} from 'react-router-dom';
import Backdrop from '../../UI/Backdrop/Backdrop';

class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose()
    }

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key = {index}>
                    <NavLink
                        to={link.path}
                        exact={link.exact}
                        activeClassName="active"
                        onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const cls = ["Drawer"]

        if (!this.props.isOpen) {
            cls.push("close")
        }

        const links = [
            {path: "/", label: "Список", exact: true}            
        ]
        
        if (this.props.isAuthenticated) {
            links.push({path: "/dish-creator", label: "Добавить блюдо", exact: false})
            links.push({path: "/logout", label: "Выйти", exact: false})
        } else {
            links.push({path: "/auth", label: "Авторизация", exact: false})
        }

        return (
            <>
                <nav className = {cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick = {this.props.onClose} /> : null}
            </>
        )
    }
}

export default Drawer