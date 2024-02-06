import { memo } from 'react';


import cls from './SidebarItem.module.scss';
import { SidebarItemType } from '../../model';

import { classNames } from '@/shared/lib';
import { AppLink } from "@/shared/ui/AppLink";
import { AppIcon } from "@/shared/ui/Icon";


interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {

    return (
        <AppLink
            to={item.path}
            className={classNames(cls.itemRedesigned, {
                [cls.collapsedRedesigned]: collapsed,
            })}
            activeClassName={cls.active}
        >
            <AppIcon Svg={item.Icon} />
            <span className={cls.link}>{item.text}</span>
        </AppLink>
    );
});

SidebarItem.displayName = 'SidebarItem';

export default SidebarItem;