import { FieldError } from 'react-hook-form'

export interface IErrorBoundaryProps {
	error: FieldError | undefined
	theme?: {
		wrapper?: string
	}
}
