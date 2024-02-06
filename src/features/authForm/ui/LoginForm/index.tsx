import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import cls from './LoginForm.module.scss';
import {
    authActions,
    getAuthState,
    login,
    authReducer,
    name as authReducerName
} from '../../model';

import { getRouteMain } from '@/shared/const';
import { classNames, useAppDispatch } from '@/shared/lib';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { AppButton } from "@/shared/ui/Button";
import { AppInput } from "@/shared/ui/Input";
import { HStack, VStack } from "@/shared/ui/Stack";
import { AppText } from "@/shared/ui/Text";


const reducers = {
    [authReducerName]: authReducer
};

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { username, password, isLoading, isLogin, error } = useSelector(getAuthState);

    const onChange = useCallback(
        (action: 'setUsername' | 'setPassword') => (value: string) => {
            dispatch(authActions[action](value));
        },
        [dispatch],
    );

    const toggleLoginMode = useCallback(() => {
        dispatch(authActions.setIsLogin());
    }, [dispatch]);

    const onSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            if (isLogin) {
                const result = await dispatch(login({ username, password }));

                if (result.meta.requestStatus === 'fulfilled') {
                    navigate(getRouteMain());
                }
            }
        },
        [dispatch, isLogin, navigate, password, username],
    );

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.LoginForm)}>
                <div className={cls.ring}>
                    {[1, 2, 3].map(i => <i key={i} />)}
                    <form onSubmit={onSubmit} className={cls.login}>
                        <AppText title={isLogin ? 'Авторизация' : 'Регистрация'} bold variant="accent" />
                        {error && (
                            <AppText
                                text="Вы ввели неверный логин или пароль"
                                variant="error"
                            />
                        )}
                        <AppInput
                            value={username}
                            placeholder="Введите ваше имя пользователя"
                            onChange={onChange('setUsername')}
                        />
                        <AppInput
                            value={password}
                            type="password"
                            placeholder="Введите ваш пароль"
                            onChange={onChange('setPassword')}
                        />
                        <VStack max gap="16">
                            <AppButton
                                className={cls.center}
                                disabled={isLoading}
                                fullWidth
                                type="submit"
                                aria-label={isLogin ? 'Войти' : 'Зарегистрироваться'}
                            >
                                {isLogin ? 'Войти' : 'Зарегистрироваться'}
                            </AppButton>
                            <HStack max justify="end">
                                <AppButton
                                    onClick={toggleLoginMode}
                                    type="button"
                                    variant="clear"
                                    disabled={isLoading}
                                    aria-label={isLogin ? 'Зарегистрироваться' : 'Войти'}
                                >
                                    {isLogin ? 'Зарегистрироваться' : 'Войти'}
                                </AppButton>
                            </HStack>
                        </VStack>
                    </form>
                </div>
            </div>
        </DynamicModuleLoader>
    );
};

export default LoginForm;
