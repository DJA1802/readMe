import { readmeLocalStorageKey } from './constants';

export function localInteractionsExist () {
  return localStorage.getItem(readmeLocalStorageKey);
}

export function getLocalInteractions () {
  return JSON.parse(localStorage.getItem(readmeLocalStorageKey));
}

export function setLocalInteractions (newInteractionsArr) {
  localStorage.setItem(
    readmeLocalStorageKey,
    JSON.stringify(newInteractionsArr)
  );
}

export function getLastMemberOf (arr) {
  if (arr.length && arr.length > 0) return arr[arr.length - 1];
}
