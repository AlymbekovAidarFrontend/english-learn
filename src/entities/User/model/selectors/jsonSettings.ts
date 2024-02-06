import { JsonSettings } from '../types';

import { buildSelector } from '@/shared/lib/store';


const defaultJsonSettings: JsonSettings = {};

export const [useJsonSettings, getJsonSettings] = buildSelector(
    (state) => state.user?.authData?.jsonSettings ?? defaultJsonSettings,
);
