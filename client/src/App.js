import React from 'react';
import {Routes, Route} from "react-router-dom";

import {UserInfo, Users} from './components';
import Positions from './components/Positions';

const App = () => {

    return (
        <Routes>
            <Route path={'users'} element={<Users/>}/>
            <Route path={'users/:id'} element={<UserInfo/>}/>
            <Route path={'positions'} element={<Positions/>}/>
            {/*<Route path={'popular'} element={<MoviesList/>}/>*/}
            {/*<Route path={'/movies/:id'} element={<MovieInfo/>}/>*/}
            {/*<Route path={'genres/:genre'} element={<MoviesList/>}/>*/}
            {/*<Route path={'*'} element={<Navigate to={'/'} replace={true}/>}/>*/}
            {/*</Route>*/}
        </Routes>
    );
};

export default App;

