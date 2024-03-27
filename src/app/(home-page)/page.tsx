import type { ReactElement } from 'react'

import styles from './page.module.scss'

const Home = (): ReactElement => {
	return (
		<main className={ styles.wrapper }>
			<h1>Zarezerwuj swój lot</h1>
		</main>
	)
}

export default Home
