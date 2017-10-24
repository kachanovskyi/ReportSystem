import React from 'react';
import { Switch, Route} from 'react-router-dom';

import NewIR from './NewIR';

const Main = () => {

    return (
        <main>
            <Switch>
                <Route exact path='/' component={NewIR}/>
            </Switch>
        </main>
    );
};

export default Main;
