export type Theme = {
	mainBg: string,
	primary: string,
	primaryBg: string,
	secondary: string,
	textPrimary: string,
	textSecondary: string,
	textInput: string,
	textPale: string,
	error: string,
	outline: string,
	menu: string,
};

export const lightTheme: Theme = {
	mainBg: '#F3F3F3',
	primary: '#2231AA',
	primaryBg: '#5360CD',
	secondary: '#E8E8E8',
	textPrimary: '#FFFFFF',
	textSecondary: '#000000',
	textInput: '#000000',
	textPale: '#8D8E97',
	error: '#FD3419',
	outline: '#DADADA',
	menu: '#FFFFFF',
};

export const darkTheme: Theme = {
	mainBg: '#132226',
	primary: '#be9063',
	primaryBg: '#525b56',
	// primaryBg: '#a4978e',
	secondary: '#525b56',
	textPrimary: '#FFFFFF',
	textSecondary: '#FFFFFF',
	textInput: '#000000',
	textPale: '#a4978e',
	error: '#fd7c19',
	outline: '#DADADA',
	menu: '#a4978e',
};
