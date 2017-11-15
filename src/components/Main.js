import React from 'react';
import { Switch, Route} from 'react-router-dom';

import NewIR from './NewIR';
import Profile from './Profile';

const Main = () => {

    return (
        <main>
            <Switch>
                <Route exact path='/' component={NewIR}/>
                <Route exact path='/profile' component={Profile}/>
            </Switch>
        </main>
    );
};

export default Main;
