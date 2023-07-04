import Navbar, { TranslateIcon } from '@/components/Navbar';
import React from 'react';
import '@/style/HomePage.scss';
import { Typography } from '@mui/material';

const HomePage: React.FC<any> = () => {
    return (
        <div id='HomePage'>
            <header className='topper'>
                <Typography className='title'>
                    <TranslateIcon className='titleIcon' />
                    <b>Linguify</b>
                </Typography>
                <Typography className='subtitle'>
                    The only <span>translator</span> you'll ever need.
                </Typography>
            </header>
            <Navbar />
            <main className='content'>
                <div className='container'></div>
                <div className='container'></div>
                <div className='container'></div>
            </main>
            <footer className='footer'></footer>
        </div>
    );
};

export default HomePage;
