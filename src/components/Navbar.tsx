import React from 'react';
import { AppBar, Toolbar, Typography, Button, Link, IconButton } from '@mui/material';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import '@/style/Navbar.scss';
import useWindowWidth from '@/hooks/useWindowWidth';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

const TranslateIcon = TranslateRoundedIcon;

const Navbar: React.FC<any> = () => {
    const width: number = useWindowWidth();
    const homepage: boolean = window.location.pathname === '/';

    return (
        <AppBar id='Navbar' className='navbar' data-homepage={homepage}>
            <Toolbar className='toolbar'>
                <Link href='/' className='linkToHomePage'>
                    <Typography className='logoText'>
                        {width > 768 && <TranslateIcon className='logoIcon' />}
                        <b>Linguify</b>
                    </Typography>
                </Link>
                <div className='navBtns' data-mobile={width < 768}>
                    {width > 768 ? (
                        <>
                            <Button disableRipple href='/'>
                                Home
                            </Button>
                            <Button disableRipple href='/translate'>
                                Translate
                            </Button>
                        </>
                    ) : (
                        <>
                            <IconButton disableRipple href='/'>
                                <HomeRoundedIcon />
                            </IconButton>
                            <IconButton disableRipple href='/translate'>
                                <TranslateIcon />
                            </IconButton>
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
