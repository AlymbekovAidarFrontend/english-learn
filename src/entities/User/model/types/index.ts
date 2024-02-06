export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export interface JsonSettings {
    isFirstVisit?: boolean;
}


export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
    jsonSettings?: JsonSettings;
}

export interface UserSchema {
    authData?: User;
    isLoading: boolean;
    _inited: boolean;
}