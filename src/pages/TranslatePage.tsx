import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ChooseLang from '@/components/ChooseLang';
import '@/style/TranslatePage.scss';
import { Language } from '@/types';
import axios from 'axios';
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';
import { IconButton } from '@mui/material';

const SwapIcon = SwapHorizRoundedIcon;

const TranslatePage: React.FC<any> = () => {
    const [possibleLangs, setPossibleLangs] = useState<Language[]>([]);
    const [lang1, setLang1] = useState<Language>({ name: 'Detect Language', code: '/' });
    const [lang2, setLang2] = useState<Language>({ name: 'Italian', code: 'it' });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [initText, setInitText] = useState<string>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [translatedText, setTranslatedText] = useState<string>('Translation');

    useEffect(() => {
        getPossibleLanguages();
    }, []);

    const getPossibleLanguages = async (): Promise<void> => {
        const res = await axios.get('http://localhost:4000/languages');
        setPossibleLangs(res.data.map((lang: Language) => ({ name: lang.name, code: lang.code })));
    };

    const swapLangs = (): void => {
        const temp = lang1;
        setLang1(lang2);
        setLang2(temp);
    };

    return (
        <div id='TranslatePage'>
            <header>
                <Navbar />
            </header>
            <main>
                <div className='container'>
                    <div className='languages'>
                        <ChooseLang num={1} lang={lang1} setLang={setLang1} possibleLangs={possibleLangs} />
                        <IconButton className='swapBtn' onClick={swapLangs}>
                            <SwapIcon className='swapIcon' />
                        </IconButton>
                        <ChooseLang num={2} lang={lang2} setLang={setLang2} possibleLangs={possibleLangs} />
                    </div>
                    <div className='text'></div>
                </div>
            </main>
        </div>
    );
};

export default TranslatePage;
