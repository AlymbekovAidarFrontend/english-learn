import React, { useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';


import cls from './WordList.module.scss';
import { removeWord } from '../../model';
import DeleteConfirmationModal from '../DeleteConfimModal';
import WordListItem from '../WordListItem';

import { getWordList, wordApi, getWordListIsLoading } from '@/entities/Word';
import { classNames } from '@/shared/lib';
import { useAppDispatch } from '@/shared/lib/hooks';
import { AppInput } from '@/shared/ui/Input';
import { AppText } from "@/shared/ui/Text";
import { PageLoader } from '@/widgets';


export interface WordListProps {
    className?: string;
}

const WordList: React.FC<WordListProps> = () => {
    const dispatch = useAppDispatch();
    const currentWordRef = useRef<Nullable<number>>(null);

    const [term, setTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const wordList = useSelector(getWordList)(term);
    const isLoading = useSelector(getWordListIsLoading);

    const onCloseModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    const handleSearch = useCallback((value: string) => {
        setTerm(value);
    }, []);

    const handleRemoveWord = useCallback(() => {
        if (currentWordRef.current) {
            dispatch(removeWord(currentWordRef.current));
            dispatch(wordApi.util.resetApiState());
        }
    }, [dispatch]);

    const onSelect = useCallback((id: Nullable<number>) => {
        currentWordRef.current = id;
        setIsOpen(true);
    }, []);

    const onConfirmDelete = useCallback(() => {
        if (currentWordRef.current) {
            handleRemoveWord();
        }
        onCloseModal();
    }, [handleRemoveWord, onCloseModal]);

    if (isLoading) return <PageLoader />;

    return (
        <>
            <AppInput placeholder="Поиск..." onChange={handleSearch} size="l" />
            {!wordList?.length 
                ? (
                    <AppText align="center" title="Ваш список слов пуст"/>
                )
                : (
                    <ul className={classNames(cls.WordList)}>
                        {wordList?.map(({ translations: { english, russian }, id }) => (
                            <WordListItem
                                key={english + russian}
                                english={english}
                                russian={russian}
                                id={id}
                                onSelect={onSelect}
                                onRemove={handleRemoveWord}
                            />
                        ))}
                    </ul>
                )
            }
            {isOpen && <DeleteConfirmationModal isOpen={isOpen} onClose={onCloseModal} onConfirm={onConfirmDelete} />}
        </>
    );
};

export default WordList;
