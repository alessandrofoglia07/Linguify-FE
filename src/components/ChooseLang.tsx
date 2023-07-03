import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Language } from '@/types';

interface IProps {
    num: 1 | 2;
    lang: Language;
    setLang: (lang: Language) => void;
    possibleLangs: Language[];
}

const ChooseLang: React.FC<IProps> = ({ num, lang, setLang, possibleLangs }: IProps) => {
    const [langToChoose, setLangToChoose] = useState<Language[]>(possibleLangs);
    const [input, setInput] = useState<string>(lang.name);

    useEffect(() => {
        if (possibleLangs !== langToChoose) setLangToChoose(possibleLangs);
        if (num === 1) setLangToChoose([{ name: 'Detect Language', code: '/' }, ...possibleLangs]);
    }, [possibleLangs]);

    useEffect(() => {
        if (lang.name !== input) setInput(lang.name);
        if (num === 2 && lang.name === 'Detect Language') setLang(possibleLangs[0]);
    }, [lang]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;

        setInput(value);
        setLangToChoose(possibleLangs.filter((lang: Language) => lang.name.toLowerCase().slice(0, value.length) === value.toLowerCase()));

        const foundLang = langToChoose.find((lang: Language) => lang.name.toLowerCase() === value.toLowerCase());
        if (foundLang) {
            setLang(foundLang);
            setInput(foundLang.name);
        }
    };

    const handleAutocompleteChange = (e: React.ChangeEvent<object>, value: string | null): void => {
        if (value) {
            setLang(langToChoose.find((lang: Language) => lang.name.toLowerCase() === value.toLowerCase()) || possibleLangs[0]);
            setInput(value);
        }
    };

    return (
        <div className='chooseLang'>
            <Autocomplete
                className='setLangBtn'
                id={`langSelector${num}`}
                options={langToChoose.map((lang: Language) => lang.name)}
                onChange={handleAutocompleteChange}
                value={input}
                renderInput={(params) => <TextField {...params} onChange={handleInputChange} placeholder='Select a language' />}
            />
        </div>
    );
};

export default ChooseLang;
