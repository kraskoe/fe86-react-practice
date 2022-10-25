import {createContext, FC, PropsWithChildren, useState} from 'react';

type TabsContextProps = {
	activeTab: string,
	setCurrentTab: (s: string) => void,
}

export const TabsContext = createContext<TabsContextProps>({
	activeTab: '',
	setCurrentTab: () => {return},
});

export const TabsState: FC<PropsWithChildren> = ({children}) => {
	const [activeTab, setActiveTab] = useState('blog');

	function setCurrentTab(tab: string) {
		setActiveTab(tab);
	}

	return (
		<TabsContext.Provider value={{activeTab, setCurrentTab}}>
			{children}
		</TabsContext.Provider>
	)
}