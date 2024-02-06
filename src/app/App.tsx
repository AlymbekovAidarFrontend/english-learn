import React, { Suspense, useEffect } from 'react';
import { useSelector } from "react-redux";

import "./styles/index.scss";

import { AppRouter } from './providers/router';

import { getUserInited, initAuthData } from '@/entities/User';
import { initWordData } from '@/entities/Word';
import { useAppDispatch } from '@/shared/lib';
import { Sidebar } from '@/widgets';


const App = () => {
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        if (!inited) {
            dispatch(initAuthData());
        } else {
            dispatch(initWordData());
        }
    }, [dispatch, inited]);
    

    return (
        <div className="app app_dark_theme">
            <Suspense fallback="">
                <div className="content-page">
                    <Sidebar/>
                    <div className='content'>
                        <AppRouter/>
                    </div>
                </div>
            </Suspense>
        </div>
    );
};

export default App;