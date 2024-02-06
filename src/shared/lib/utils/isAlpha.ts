export const isAlpha = (str: string, isEnglish: boolean) => (isEnglish ? /[a-zA-Z\s.]/ : /[а-яА-Я\s.]/).test(str);
