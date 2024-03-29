import type { ReactElement } from 'react'
import { FormLabel } from 'react-bootstrap'
import clsx from 'clsx'

import type { ILabelProps } from './types'

import styles from './Label.module.scss'

const Label = (props: ILabelProps): ReactElement => {
	const {
		caption,
		isRequired = false,
		theme = {},
	} = props

	const labelClass = clsx(styles.label, {
		[styles.required]: isRequired,
	}, theme.wrapper)

	return (
		<div className={ styles.wrapper }>
			{ /* TODO: HTMLFOR */ }
			<FormLabel dangerouslySetInnerHTML={ { __html: caption } } className={ labelClass } />
		</div>
	)
}

export { Label }
