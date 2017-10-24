import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Header.css';
import {NavLink, withRouter} from 'react-router-dom';

const Header = () => {

    return (
        <header>
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#udsNav">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="udsNav">
                        <ul className="nav navbar-nav">
                            <li className="menu-item"><NavLink exact to="/" className="menu-item-link" id="chatbots">
                                <i className="fa fa-book" aria-hidden="true"/>
                                <span>Індивідуальний Звіт</span>
                            </NavLink></li>
                            <li className="menu-item center">
                                <img alt="logo image" src="images/logo.png"/>
                                <div className="university-title">
                                    <span>львівський</span>
                                    <span>університет</span>
                                </div>
                            </li>
                            <li className="menu-item"><a className="menu-item-link" href="https://23b325de.ngrok.io/logout">
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
