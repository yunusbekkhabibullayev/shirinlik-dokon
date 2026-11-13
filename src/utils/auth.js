export const AUTH_KEY = 'shirinlik_auth_v1';

export function checkAuth() {
  try {
    return (
      localStorage.getItem(AUTH_KEY) === 'true' ||
      sessionStorage.getItem(AUTH_KEY) === 'true'
    );
  } catch {
    return false;
  }
}

export function saveAuth(remember = true) {
  try {
    if (remember) {
      localStorage.setItem(AUTH_KEY, 'true');
    } else {
      sessionStorage.setItem(AUTH_KEY, 'true');
    }
  } catch {}
}

export function clearAuth() {
  try {
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_KEY);
  } catch {}
}

