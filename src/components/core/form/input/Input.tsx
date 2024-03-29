import React, { ChangeEvent, FocusEvent, ReactElement, KeyboardEvent, useCallback } from 'react'
import { FieldValues, useController } from 'react-hook-form'
import clsx from 'clsx'
import { isEmpty, isNil, isUndefined, noop } from 'lodash-es'
import { FormControl, Stack } from 'react-bootstrap'

import { ErrorBoundary, Label } from '~/components/core'

import type { IInputProps } from './types'

import styles from './Input.module.scss'

const Input = <TFieldValues extends FieldValues = FieldValues>(props: IInputProps<TFieldValues>): ReactElement => {
	const {
		name, control,
		label = '',
		isDisabled = false,
		isRequired = false,
		isInvalid = false,
		type = 'text',
		placeholder = '',
		maxLength = undefined,
		min = undefined,
		theme = {},
		onChange = noop,
		onBlur = noop,
		onFocus = noop,
		onKeyDown = noop,
	} = props
	const { field, fieldState: { error }, formState: { isSubmitted } } = useController<TFieldValues>({ control, name })

	const hasLabel = !isEmpty(label)
	const hasError = !isUndefined(error) && !isNil(error.message)
	const isValid = isSubmitted && !hasError && !isEmpty(field.value) && !isInvalid

	const handleBlur = useCallback((event: FocusEvent<HTMLInputElement>): void => {
		field.onBlur()
		onBlur(event.target.value)
	}, [field.onBlur, onBlur])

	const handleFocus = useCallback((event: FocusEvent<HTMLInputElement>): void => {
		onFocus(event.target.value)
	}, [onFocus])

	const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
		field.onChange(event)
		onChange(event.target.value)
	}, [field.onChange, onChange])

	const handleKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>): void => {
		onKeyDown(event)
	}, [onKeyDown])

	const inputClass = clsx(styles.input, {
		'is-invalid': hasError || isInvalid,
		'is-valid': isValid,
	}, theme.input)

	return (
		<div className={ clsx(styles.wrapper, theme.wrapper) }>
			<Stack gap={ 1 }>
				{ hasLabel && (
					<Label caption={ label } isRequired={ isRequired } />
				) }

				<FormControl
					// eslint-disable-next-line react/jsx-props-no-spreading
					{ ...field }
					id={ name }
					type={ type }
					disabled={ isDisabled }
					placeholder={ placeholder }
					min={ min }
					maxLength={ maxLength }
					className={ inputClass }
					onChange={ handleChange }
					onBlur={ handleBlur }
					onFocus={ handleFocus }
					onKeyDown={ handleKeyDown }
				/>

				<ErrorBoundary error={ error } theme={ { wrapper: theme.error } } />
			</Stack>
		</div>
	)
}

export { Input }
