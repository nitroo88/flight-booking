import type { HTMLInputTypeAttribute, KeyboardEvent } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

export interface IInputProps<TFieldValues extends FieldValues = FieldValues> {
	control: Control<TFieldValues>
	name: FieldPath<TFieldValues>
	label?: string
	isDisabled?: boolean
	isRequired?: boolean
	isInvalid?: boolean
	type?: HTMLInputTypeAttribute
	placeholder?: string
	maxLength?: number
	min?: string | number
	theme?: {
		wrapper?: string
		input?: string
		error?: string
	}
	onChange?: (value: string) => void
	onBlur?: (value: string) => void
	onFocus?: (value: string) => void
	onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
}
