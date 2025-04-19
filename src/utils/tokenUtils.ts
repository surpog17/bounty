interface TokenPayload {
  exp: number; // Expiry time in seconds since epoch
}

export const isTokenExpired = (token: string | null | undefined): boolean => {
  if (!token) return true; // No token means expired
  const payload: TokenPayload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
  const expiry = payload.exp * 1000; // Convert to milliseconds
  return Date.now() > expiry; // Check if current time is greater than expiry
};
