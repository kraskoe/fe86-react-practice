
export const getLocalstorageItem = (item: string) => JSON.parse(localStorage.getItem(item) || '');

export const setLocalstorageItem = (item: string, value: any) => localStorage.setItem(item, JSON.stringify(value));

export const getSessionstorageItem = (item: string) => JSON.parse(sessionStorage.getItem(item) || '');

export const setSessionstorageItem = (item: string, value: any) => sessionStorage.setItem(item, JSON.stringify(value));