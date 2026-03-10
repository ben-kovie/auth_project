import { jwtDecode } from "jwt-decode";

export const getUserFromToken = () => {

  const token = localStorage.getItem("accessToken");

  if (!token) return null;

  try {

    const decoded = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      return null;
    }

    return decoded;

  } catch {
    return null;
  }

};