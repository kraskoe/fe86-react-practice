import { useMediaQuery } from 'react-responsive'
import {ReactElement} from 'react';

interface WithChildren {
	children: ReactElement,
}

export const Desktop = ({ children }: WithChildren) => {
	const isDesktop = useMediaQuery({ minWidth: 1024 })
	return isDesktop ? children : null
}
export const TabletOrDesktop = ({ children }: WithChildren) => {
	const isTablet = useMediaQuery({ minWidth: 768 })
	return isTablet ? children : null
}
export const Tablet = ({ children }: WithChildren) => {
	const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 })
	return isTablet ? children : null
}
export const Mobile = ({ children }: WithChildren) => {
	const isMobile = useMediaQuery({ maxWidth: 767 })
	return isMobile ? children : null
}
