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

export function addInteractionToLocalStorage (articleId) {
  const newInteraction = {
    articleId: Number(articleId),
    startTime: new Date(),
    endTime: new Date()
  };
  if (localInteractionsExist()) {
    const existingInteractions = getLocalInteractions();
    setLocalInteractions(existingInteractions.concat(newInteraction));
  } else {
    setLocalInteractions([newInteraction]);
  }
}

export function updateLastInteractionEndTime () {
  if (localInteractionsExist()) {
    const existingInteractions = getLocalInteractions();
    const lastInteraction = getLastMemberOf(existingInteractions);
    const updatedLastInteraction = Object.assign({}, lastInteraction, {
      endTime: new Date()
    });
    const updatedInteractions = existingInteractions
      .slice(0, existingInteractions.length - 1)
      .concat(updatedLastInteraction);
    setLocalInteractions(updatedInteractions);
  }
}
