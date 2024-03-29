import type { ReactElement } from 'react'
import clsx from 'clsx'
import { FormControl } from 'react-bootstrap'
import { isEmpty, isNil, isUndefined } from 'lodash-es'

import type { IErrorBoundaryProps } from './types'

import styles from './ErrorBoundary.module.scss'

const ErrorBoundary = (props: IErrorBoundaryProps): ReactElement | null => {
	const {
		error = undefined,
		theme = {},
	} = props

	if (isUndefined(error) || isNil(error.message) || isEmpty(error.message)) {
		return null
	}

	return (
		<FormControl.Feedback
			dangerouslySetInnerHTML={ { __html: error.message } }
			type="invalid"
			className={ clsx(styles.wrapper, theme.wrapper) }
		/>
	)
}

export { ErrorBoundary }
