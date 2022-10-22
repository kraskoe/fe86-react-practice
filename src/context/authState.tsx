import React, {createContext, FC, PropsWithChildren, useState} from 'react';

export type User = {
	username: string,
	id: number | string,
	email: string,
}

type AuthContextProps = {
	user: User | null,
	setCurrentUser: (u: User | null) => void,
}

export const AuthContext = createContext<AuthContextProps>({
	user: null,
	setCurrentUser: (u: User | null) => {return},
});

// TEST USER!!!
const testUser: User = {
	username: 'Artem Malkin',
	id: 0,
	email: 'user@example.com',
}

const AuthorizationState: FC<PropsWithChildren> = ({ children }) => {

	const [user, setUser] = useState<User | null>(testUser);

	function setCurrentUser(currentUser: User | null) {
		setUser(currentUser);
	}

	return (
		<AuthContext.Provider value={{ user, setCurrentUser }}>{children}</AuthContext.Provider>
	);
};

export default AuthorizationState;