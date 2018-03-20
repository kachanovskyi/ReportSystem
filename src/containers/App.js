import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import Header from '../components/Header';
import Main from '../components/Main';

import './App.css';

class App extends Component {

    render() {

        let inner = <div><Header/><Main/></div>;

        return (
            <div className="container-fluid">
                <div className="row">
                    {inner}
                </div>
            </div>
        )

    }
}

export default withRouter(App);
