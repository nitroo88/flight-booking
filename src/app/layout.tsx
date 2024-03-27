import type { ReactElement } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Container } from 'react-bootstrap'

import { IRootLayoutProps } from './types'

import '~/styles/global.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Flight booking',
}

const RootLayout = (props: IRootLayoutProps): ReactElement => {
	const { children } = props

	return (
		<html lang="pl">
			<body className={ inter.className }>
				<Container>
					{ children }
				</Container>
			</body>
		</html>
	)
}

export default RootLayout
