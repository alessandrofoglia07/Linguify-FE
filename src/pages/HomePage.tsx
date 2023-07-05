import Navbar, { TranslateIcon } from '@/components/Navbar';
import React from 'react';
import '@/style/HomePage.scss';
import { Typography } from '@mui/material';
import useWindowWidth from '@/hooks/useWindowWidth';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC<any> = () => {
    const width = useWindowWidth();
    const navigate = useNavigate();

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
            <main className='content'>
                <Navbar />
                <Typography className='contentTitle'>
                    Why choose <b>Linguify</b>?
                </Typography>
                <div className='container'>
                    {width <= 768 && <img src='/img1.jpg' />}
                    <Typography className='text'>
                        <b>Fast</b> and <b>accurate</b> translations.
                    </Typography>
                    {width > 768 && <img src='/img1.jpg' />}
                </div>
                <div className='container'>
                    <img src='/img3.jpg' />
                    <Typography className='text'>
                        <b>Easy</b> to use.
                    </Typography>
                </div>
                <div className='container'>
                    {width <= 768 && <img src='/img2.jpg' />}
                    <Typography className='text'>
                        100% <b>free</b>.
                    </Typography>
                    {width > 768 && <img src='/img2.jpg' />}
                </div>
            </main>
            <footer>
                <div>
                    <Typography className='footerText'>
                        Start using <b>Linguify</b> today,
                        <br /> for free.
                    </Typography>
                    <button className='footerBtn' onClick={() => navigate('/translate')}>
                        Here
                    </button>
                </div>
                <Typography className='finalText'>
                    Made by{' '}
                    <a href='https://github.com/alessandrofoglia07' target='_blank'>
                        Alexxino
                    </a>
                    🧙‍♂️
                </Typography>
            </footer>
        </div>
    );
};

export default HomePage;
