import React from 'react';

interface IPageProps {}

export const Page = ({ children }: React.PropsWithChildren<IPageProps>) => {
    return (
        <main>
            {children}
        </main>
    );
};
