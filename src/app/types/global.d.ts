declare module '*.scss' {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
    import React from 'react';

    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare const __IS_DEV__: boolean;

declare type Nullable<T> = T | null

type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};

type DeepPartial<T> = T extends object
    ? {
        [P in keyof T]?: DeepPartial<T[P]>;
    }
    : T;