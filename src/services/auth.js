import { history } from './history';

export const TOKEN_KEY = "@educakids12";
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
    history.push('/');
};
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    history.push('/in');
};