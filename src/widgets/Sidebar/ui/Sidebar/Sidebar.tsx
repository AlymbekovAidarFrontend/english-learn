import { memo, useMemo, useState } from 'react';
import { useSelector } from "react-redux";


import cls from './Sidebar.module.scss';
import { useSidebarItems } from '../../model';
import SidebarItem from '../SidebarItem/SidebarItem';

import { getUserAuthData } from "@/entities/User";
import { LogoutConfirmForm } from "@/features/logoutConfirmForm";
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { classNames } from '@/shared/lib';
import { AppLogo } from "@/shared/ui/AppLogo";
import { AppIcon } from "@/shared/ui/Icon";
import { VStack } from "@/shared/ui/Stack";


interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const auth = useSelector(getUserAuthData);
    
    const [collapsed, setCollapsed] = useState(false);
    const sidebarItemsList = useSidebarItems();

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const itemsList = useMemo(
        () =>
            sidebarItemsList.map((item) => (
                <SidebarItem
                    item={item}
                    collapsed={collapsed}
                    key={item.path}
                />
            )),
        [collapsed, sidebarItemsList],
    );

    return (
        <aside
            data-testid="sidebar"
            className={classNames(
                cls.Sidebar,
                { [cls.collapsed]: collapsed },
                [className],
            )}
        >
            <AppLogo
                size={collapsed ? 30 : 50}
                className={cls.appLogo}
            />
            <VStack role="navigation" gap="8" className={cls.items}>
                {itemsList}
            </VStack>
            <AppIcon
                data-testid="sidebar-toggle"
                onClick={onToggle}
                className={cls.collapseBtn}
                Svg={ArrowIcon}
                clickable
            />
            <div className={cls.foot}>
                {auth && (
                    <LogoutConfirmForm />
                )}
            </div>
        </aside>
    );
});
