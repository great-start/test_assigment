import React from 'react';
import {Routes, Route} from "react-router-dom";

import {Users} from './components';

const App = () => {

        return (
            <Routes>
                <Route path={'users'} element={<Users/>}/>
                {/*<Route path={'/users/:id'} element={<UserInfo/>}>*/}
                    {/*<Route index element={<Carousel/>}/>*/}
                    {/*<Route path={'popular'} element={<MoviesList/>}/>*/}
                    {/*<Route path={'/movies/:id'} element={<MovieInfo/>}/>*/}
                    {/*<Route path={'genres/:genre'} element={<MoviesList/>}/>*/}
                    {/*<Route path={'*'} element={<Navigate to={'/'} replace={true}/>}/>*/}
                {/*</Route>*/}
            </Routes>
        );
    };

export default App;

