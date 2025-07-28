import { BASE_URL } from "./apiPaths";
export const getImageUrl = (filename) => `${BASE_URL}/uploads/${filename}`;
