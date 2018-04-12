import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Header.css';
import {NavLink, withRouter} from 'react-router-dom';
import {slide as Menu} from 'react-burger-menu';

const Header = () => {

    var styles = {
        bmBurgerButton: {
            position: 'fixed',
            width: '36px',
            height: '30px',
            left: '36px',
            top: '36px'
        },
        bmBurgerBars: {
            background: '#373a47'
        },
        bmCrossButton: {
            height: '24px',
            width: '24px'
        },
        bmCross: {
            background: '#bdc3c7'
        },
        bmMenu: {
            background: '#373a47',
            padding: '2.5em 1.5em 0',
            fontSize: '1.15em'
        },
        bmMorphShape: {
            fill: '#373a47'
        },
        bmItemList: {
            color: '#b8b7ad',
            padding: '0.8em'
        },
        bmOverlay: {
            background: 'rgba(0, 0, 0, 0.3)'
        }
    }

    return (
        <header>
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    {/*<div className="navbar-header">*/}
                        {/*<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#udsNav">*/}
                            {/*<span className="icon-bar"></span>*/}
                            {/*<span className="icon-bar"></span>*/}
                            {/*<span className="icon-bar"></span>*/}
                        {/*</button>*/}
                    {/*</div>*/}
                    <Menu styles={styles}>
                        <a id="home" className="menu-item" href="/profile"><i className="fa fa-user" /><span>Профіль</span></a>
                        <a id="about" className="menu-item" href="/"><i className="fa fa-vcard-o" /><span>Індивідуальний звіт</span></a>
                        <a id="contact" className="menu-item" href="/logout"><i className="fa fa-sign-out" /><span>Вихід</span></a>
                        {/*<a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>*/}
                    </Menu>

                    <div className="collapse navbar-collapse" id="udsNav">
                        <ul className="nav navbar-nav">
                            <li className="menu-item"><NavLink exact to="/" className="menu-item-link">
                                <i className="fa fa-book" aria-hidden="true"/>
                                <span>Індивідуальний Звіт</span>
                            </NavLink></li>

                            <li className="menu-item center">
                                <img alt="logo image" src="../images/logo.png"/>
                                <div className="university-title">
                                    <span>львівський</span>
                                    <span>університет</span>
                                </div>
                            </li>
                            <li className="menu-item"><NavLink to="/profile" className="menu-item-link">
                                <i className="fa fa-user" aria-hidden="true"/>
                                <span>Профіль</span>
                            </NavLink></li>
                            <li className="menu-item"><a className="menu-item-link"
                                                         href="../logout">
                                {/*<li className="menu-item"><a className="menu-item-link" href="https://lnu.botscrew.com/logout">*/}
                                <i className="fa fa-sign-out" aria-hidden="true"/>
                                <span>Вихід</span>
                            </a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );

};

export default withRouter(Header);
