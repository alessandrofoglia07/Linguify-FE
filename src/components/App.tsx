import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import TranslatePage from '@/pages/TranslatePage';
import '@/style/index.scss';

const App: React.FC<any> = () => {
    return (
        <div id='App'>
            <Router>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/translate' element={<TranslatePage />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
