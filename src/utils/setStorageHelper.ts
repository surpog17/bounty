export const setCookie = (key: string, value: string, days?: number): void => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = key + "=" + (value || "") + expires + "; path=/";
};

/**
 * Retrieves a cookie value by key.
 * @param {string} key - The key of the cookie to retrieve.
 * @returns {string|null} The value of the cookie, or null if not found.
 */
export const getCookie = (key: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${key}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

/**
 * Removes a cookie by key.
 * @param {string} key - The key of the cookie to remove.
 */
export const removeCookie = (key: string): void => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
