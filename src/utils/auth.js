export const TOKEN_KEY = "FREEBI$#E";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== undefined;
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const sessionLogin = token => {
  sessionStorage.setItem(TOKEN_KEY, token)
}

export const sessionLogout = () => {
  sessionStorage.removeItem(TOKEN_KEY)
}