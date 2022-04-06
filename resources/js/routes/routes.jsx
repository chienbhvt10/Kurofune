import React from 'react';
import App from './../pages/home/index';
import Text from './../pages/home/index';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
const appRouter = () => (
    <BrowserRouter>
        <div>
            <Routes>
                <Route path="/" element={<App/>} exact={true} />
                <Route path="/test" element={<Text/>} exact={true} />
            </Routes>
        </div>
    </BrowserRouter>
);

export default appRouter;