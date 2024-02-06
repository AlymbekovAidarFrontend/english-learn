import { BsCollection } from "react-icons/bs";
import { CiCirclePlus , CiBoxList } from "react-icons/ci";
import { LiaLanguageSolid } from "react-icons/lia";
import { TbCards } from "react-icons/tb";

import { SidebarItemType } from '../types/sidebar';

import MainIcon from '@/shared/assets/icons/home.svg';
import {
    getRouteAdmin,
    getRouteCollectWord,
    getRouteComparison, getRouteDragWord,
    getRouteMain,
    getRouteWordList,
} from '@/shared/const';


export const useSidebarItems = () => {
    const sidebarItemsList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: MainIcon as any,
            text: 'Главная',
        },
        {
            path: getRouteAdmin(),
            Icon: CiCirclePlus,
            text: 'Добавить слово',
        },
        {
            path: getRouteWordList(),
            Icon: CiBoxList,
            text: 'Cлова',
        },
        {
            path: getRouteComparison(),
            Icon: LiaLanguageSolid,
            text: 'Сравнение',
        },
        {
            path: getRouteCollectWord(),
            Icon: BsCollection,
            text: 'Собери слово',
        },
        {
            path: getRouteDragWord(),
            Icon: TbCards,
            text: 'Карточки',
        },
    ];

    return sidebarItemsList;
};
