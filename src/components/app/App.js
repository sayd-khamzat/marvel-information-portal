import React from 'react';
import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from '../pages/MainPage';
import ComicsPage from '../pages/ComicsPage';
import SingleComicPage from '../pages/SingleComicPage';
import Spinner from '../spinner/spinner';

const Page404 = React.lazy(() => import ('../pages/404'));

const App = () => {
    return (
        <React.Suspense fallback={<Spinner/>}>
            <BrowserRouter>
                <div className="app">
                    <AppHeader/>
                    <main>
                        <Routes>
                            <Route path='/' element={<MainPage/>}/>
                            <Route path='/comics' element={<ComicsPage/>}/>
                            <Route path='/comics/:comicId' element={<SingleComicPage/>}/>
                            <Route path='*' element={Page404}/>
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </React.Suspense>
    )
}

export default App;