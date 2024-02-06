import cls from './PageLoader.module.scss';

import { classNames } from '@/shared/lib';
import { AppLoader } from '@/shared/ui/Loader';


interface PageLoaderProps {
    className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
    <div className={classNames(cls.PageLoader, {}, [className])}>
        <AppLoader />
    </div>
);
