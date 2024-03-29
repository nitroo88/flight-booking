import type { ReactElement } from 'react'
import { Stack } from 'react-bootstrap'

import { BookingForm } from '~/components/home'

import styles from './page.module.scss'

const Home = (): ReactElement => {
	return (
		<main className={ styles.wrapper }>
			<Stack gap={ 5 }>
				<h1>Zarezerwuj swój lot</h1>

				<BookingForm />
			</Stack>
		</main>
	)
}

export default Home
