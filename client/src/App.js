import React from 'react';
import {Routes, Route} from "react-router-dom";

import {Positions, UserInfo, Users} from './components';

const App = () => {

    return (
        <Routes>
            <Route path={'users'} element={<Users/>}/>
            <Route path={'users/:id'} element={<UserInfo/>}/>
            <Route path={'positions'} element={<Positions/>}/>
        </Routes>
    );
};

export default App;

