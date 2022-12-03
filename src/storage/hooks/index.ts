import {Dispatch, useEffect, useState} from 'react';

//--- Didn't come in handy ---
export function useLocalStorage<T>(storageKey: string, fallbackState: T): [T, Dispatch<T>] {
	const [value, setValue] = useState(localStorage.getItem(storageKey) ?
		JSON.parse(localStorage.getItem(storageKey) || '') :
		fallbackState
	);

	useEffect(() => {
		localStorage.setItem(storageKey, JSON.stringify(value));
	}, [value, storageKey]);

	return [value, setValue];
}

export function useSessionStorage<T>(storageKey: string, fallbackState: T): [T, Dispatch<T>] {
	const [value, setValue] = useState(sessionStorage.getItem(storageKey) ?
		JSON.parse(localStorage.getItem(storageKey) || '') :
		fallbackState
	);

	useEffect(() => {
		sessionStorage.setItem(storageKey, JSON.stringify(value));
	}, [value, storageKey]);

	return [value, setValue];
}