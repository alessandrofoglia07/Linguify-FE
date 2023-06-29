import Navbar from '@/components/Navbar';
import React from 'react';

const HomePage: React.FC<any> = () => {
    return (
        <div id='HomePage'>
            <h1>Home Page</h1>
            <Navbar />
            {/* Test */}
            <div style={{ height: '10000px' }} />
        </div>
    );
};

export default HomePage;
