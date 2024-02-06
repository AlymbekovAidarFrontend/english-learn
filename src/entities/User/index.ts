export type { User, JsonSettings, UserSchema } from './model/types';
export { UserRole } from './model/types';

export { name, userSlice, userReducer, userActions } from './model/slice';
export * from './model/selectors/roleSelectors';
export * from './model/selectors/getUserAuthData';
export * from './model/selectors/getUserInited';
export * from './model/services/initAuthData';