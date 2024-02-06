import * as Yup from 'yup';

import { EWordLanguages } from "@/entities/Word";

export const addWordFormValidationSchema = Yup.object().shape({
    [EWordLanguages.ENGLISH]: Yup.string()
        .matches(/^[a-zA-Z]{2,}$/, 'Вводите только буквы на английском')
        .required('Обязательное поле')
        .min(2, "Минимальная длина - 2 символа"),
    [EWordLanguages.RUSSIAN]: Yup.string()
        .matches(/^[а-яА-ЯёЁ]{2,}$/, 'Вводите только буквы на русском')
        .required('Обязательное поле, минимальная длина - 1 символ'),
});
