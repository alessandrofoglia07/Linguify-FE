import React, { Dispatch, SetStateAction } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Language } from '@/types';

interface IProps {
    num: 1 | 2;
    lang: Language;
    setLang: Dispatch<SetStateAction<Language>>;
    possibleLangs: Language[];
}

const ChooseLang: React.FC<IProps> = ({ num, lang, setLang, possibleLangs }: IProps) => {
    return (
        <div className='chooseLang'>
            <Autocomplete className='setLangBtn' id={`langSelector${num}`} options={[]} readOnly renderInput={(params) => <TextField {...params} placeholder={lang.name} />} />
        </div>
    );
};

export default ChooseLang;
