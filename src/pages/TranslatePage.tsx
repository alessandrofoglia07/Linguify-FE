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
    const [lang1, setLang1State] = useState<Language>({ name: 'Detect Language', code: '/' });
    const [lang2, setLang2State] = useState<Language>({ name: 'Italian', code: 'it' });
    const [initText, setInitText] = useState<string>('');
    const [translatedText, setTranslatedText] = useState<string>('');

    useEffect(() => {
        getPossibleLanguages();
    }, []);

    useEffect(() => {
        if (initText === '') setTranslatedText('');
    }, [initText]);

    const getPossibleLanguages = async (): Promise<void> => {
        const res = await axios.get('http://localhost:4000/languages');
        setPossibleLangs(res.data.map((lang: Language) => ({ name: lang.name, code: lang.code })));
    };

    const translate = async (text = initText): Promise<void> => {
        if (text === '') return setTranslatedText('');

        let lang1Code = lang1.code;
        const lang2Code = lang2.code;

        try {
            // detect language
            if (lang1Code === '/') {
                const res = await axios.post(`http://localhost:4000/detect?q=${text}`);
                lang1Code = res.data[0].language;
            }

            // translate
            const res = await axios.post(`http://localhost:4000/translate?q=${text}&source=${lang1Code}&target=${lang2Code}`);
            setTranslatedText(res.data.translatedText);
        } catch (err: any) {
            throw new Error(err);
        }
    };

    const setLang1 = (lang: Language): void => {
        setLang1State(lang);
        translate();
    };

    const setLang2 = (lang: Language): void => {
        setLang2State(lang);
        translate();
    };

    const swapLangs = (): void => {
        const temp = lang1;
        setLang1(lang2);
        setLang2(temp);
    };

    let timeout: NodeJS.Timeout;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        clearTimeout(timeout);

        setInitText(e.target.value);
        if (/[^A-Za-z]/.test(e.target.value.charAt(e.target.value.length - 1))) {
            translate(e.target.value);
        } else {
            timeout = setTimeout(() => {
                translate(e.target.value);
            }, 500);
        }
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
                                <TextField autoComplete='off' multiline rows={5} className='input' onChange={handleInputChange} value={initText} />
                                <TextField autoComplete='off' multiline rows={5} className='input' disabled placeholder={'Translation'} value={translatedText} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='init'>
                                <ChooseLang num={1} lang={lang1} setLang={setLang1} possibleLangs={possibleLangs} />
                                <TextField autoComplete='off' multiline rows={5} className='input' onChange={handleInputChange} value={initText} />
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
                </div>
            </main>
        </div>
    );
};

export default TranslatePage;
