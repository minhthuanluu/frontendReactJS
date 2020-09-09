import { reloadAuthorized } from './Authorized';

export function getAuthority(str) {
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem(USER_DATA_KEY) : str;

  let authority;

  try {
    if (authorityString) {
      authority = JSON.parse(authorityString).userRole;
    }
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    return [authority];
  }

  if (!authority) {
    return null;
  }

  return authority;
}
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(proAuthority)); // auto reload

  reloadAuthorized();
}
