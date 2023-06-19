import React from 'react';
import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from '../pages/MainPage';
import ComicsPage from '../pages/ComicsPage';
import Page404 from '../pages/404';
import SingleComicPage from '../pages/SingleComicPage';

const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path='/' element={<MainPage/>}/>
                        <Route path='/comics' element={<ComicsPage/>}/>
                        <Route path='/comics/:comicId' element={<SingleComicPage/>}/>
                        <Route path='*' element={<Page404/>}/>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App;