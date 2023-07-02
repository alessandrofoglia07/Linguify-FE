import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ChooseLang from '@/components/ChooseLang';
import '@/style/TranslatePage.scss';
import { Language } from '@/types';
import axios from 'axios';
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';
import { IconButton, TextField } from '@mui/material';
import useWindowWidth from '@/hooks/useWindowWidth';

const SwapIcon = SwapHorizRoundedIcon;

const TranslatePage: React.FC<any> = () => {
    const width = useWindowWidth();

    const [possibleLangs, setPossibleLangs] = useState<Language[]>([]);
    const [lang1, setLang1] = useState<Language>({ name: 'Detect Language', code: '/' });
    const [lang2, setLang2] = useState<Language>({ name: 'Italian', code: 'it' });
    const [initText, setInitText] = useState<string>('');
    const [translatedText, setTranslatedText] = useState<string>('');

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
                    {width > 768 ? (
                        <>
                            <div className='languages'>
                                <ChooseLang num={1} lang={lang1} setLang={setLang1} possibleLangs={possibleLangs} />
                                <IconButton className='swapBtn' onClick={swapLangs}>
                                    <SwapIcon className='swapIcon' />
                                </IconButton>
                                <ChooseLang num={2} lang={lang2} setLang={setLang2} possibleLangs={possibleLangs} />
                            </div>
                            <div className='text'>
                                <TextField autoComplete='off' multiline rows={5} className='input' onChange={(e) => setInitText(e.target.value)} value={initText} />
                                <TextField autoComplete='off' multiline rows={5} className='input' disabled placeholder={'Translation'} value={translatedText} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='init'>
                                <ChooseLang num={1} lang={lang1} setLang={setLang1} possibleLangs={possibleLangs} />
                                <TextField autoComplete='off' multiline rows={5} className='input' onChange={(e) => setInitText(e.target.value)} value={initText} />
                            </div>
                            <div className='swap'>
                                <IconButton className='swapBtn' onClick={swapLangs}>
                                    <SwapIcon className='swapIcon' />
                                </IconButton>
                            </div>
                            <div className='translated'>
                                <ChooseLang num={2} lang={lang2} setLang={setLang2} possibleLangs={possibleLangs} />
                                <TextField autoComplete='off' multiline rows={5} className='input' disabled placeholder={'Translation'} value={translatedText} />
                            </div>
                        </>
                    )}
                    <div className='bottom'></div>
                </div>
            </main>
        </div>
    );
};

export default TranslatePage;
