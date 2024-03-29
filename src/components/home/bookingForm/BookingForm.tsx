'use client'

import { type ReactElement, useCallback, useMemo, useState } from 'react'
import { Alert, Button, Form, Spinner, Stack } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { format } from 'date-fns'
import { AxiosError } from 'axios'
import { isEmpty, isEqual, isNull, isUndefined, sample } from 'lodash-es'

import { type IPayloadResponse, request } from '~/api'
import { Input } from '~/components/core'

import type { IBookingFormData, BookingFormResultType } from './types'

import styles from './BookingForm.module.scss'

const BookingForm = (): ReactElement => {
	const [formResult, setFormResult] = useState<BookingFormResultType | null>(null)
	const [formMessage, setFormMessage] = useState<string>('')

	const currentDate = format(new Date(), 'yyyy-MM-dd')
	const currentDateValidationTip = format(new Date(), 'dd.MM.yyyy')

	const schema: yup.ObjectSchema<IBookingFormData> = useMemo(() => yup.object({
		name: yup.string().required('To pole jest wymagane').matches(/^[a-zA-Z]+ [a-zA-Z]+$/, 'Podano nieprawidłowe imię i/lub nazwisko'),
		email: yup.string().email('Podano niepoprawny format adresu e-mail').required('To pole jest wymagane'),
		phone: yup.string().required('To pole jest wymagane').matches(/^\+48[0-9]{9}$/, 'Podano niepoprawny format numeru - oczekiwany +48123456789'),
		departureDate: yup.string().required('To pole jest wymagane').matches(/^[0-9]{4}-(0[1-9]|1[0-2])-[0-9]{2}$/, `Podano niepoprawny format daty - oczekiwany ${ currentDateValidationTip }`),
		departureCity: yup.string().required('To pole jest wymagane').min(3, 'Minimalna długość pola wynosi 3 znaki'),
		arrivalCity: yup.string().required('To pole jest wymagane').min(3, 'Minimalna długość pola wynosi 3 znaki'),
	}), [])

	const { handleSubmit, control, formState: { isSubmitting }, getValues } = useForm<IBookingFormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			departureDate: '',
			departureCity: '',
			arrivalCity: '',
		},
		mode: 'onChange',
	})

	const handleFormSubmit = useCallback(handleSubmit(async (formData: IBookingFormData) => {
		const result = sample<BookingFormResultType>(['success', 'danger'])

		try {
			const { data } = await request.post<IPayloadResponse>(`/booking/${ result }`, formData)

			setFormMessage(data.message)
		} catch (e: unknown) {
			const error = e as AxiosError<IPayloadResponse>

			if (!isUndefined(error.response)) {
				setFormMessage(error.response?.data?.message)
			}
		} finally {
			setFormResult(result)
		}
	}), [])

	const renderAlert = useCallback((): ReactElement | null => {
		const { arrivalCity, departureCity, departureDate, email, name, phone } = getValues()

		if (!isNull(formResult) && !isEmpty(formMessage)) {
			return (
				<Alert variant={ formResult }>
					<Alert.Heading className={ styles.alertHeading }>
						{ formMessage }
					</Alert.Heading>

					{ isEqual(formResult, 'success' as BookingFormResultType) && (
						<ul>
							<li>Imię i nazwisko pasażera: { name }</li>
							<li>Adres e-mail: { email }</li>
							<li>Numer telefonu: { phone }</li>
							<li>Data wylotu: { departureDate }</li>
							<li>Miejsce wylotu: { departureCity }</li>
							<li>Miejsce przylotu: { arrivalCity }</li>
						</ul>
					) }
				</Alert>
			)
		}

		return null
	}, [formResult, formMessage, getValues])

	const renderContent = useCallback((): ReactElement => {
		if (!isNull(formResult) && !isEmpty(formMessage) && isEqual(formResult, 'success' as BookingFormResultType)) {
			return (
				<>
					{ renderAlert() }
				</>
			)
		}

		return (
			<>
				{ renderAlert() }

				<Input
					isRequired
					control={ control }
					label="Imię i nazwisko pasażera"
					name="name"
				/>

				<Input
					isRequired
					control={ control }
					label="Adres e-mail"
					type="email"
					name="email"
				/>

				<Input
					isRequired
					control={ control }
					label="Numer telefonu"
					type="tel"
					name="phone"
					placeholder="+48123456789"
				/>

				<Input
					isRequired
					control={ control }
					label="Data wylotu"
					type="date"
					name="departureDate"
					min={ currentDate }
				/>

				<Input
					isRequired
					control={ control }
					label="Miejsce wylotu"
					name="departureCity"
				/>

				<Input
					isRequired
					control={ control }
					label="Miejsce przylotu"
					name="arrivalCity"
				/>

				<Button disabled={ isSubmitting } type="submit">
					{ isSubmitting ? (
						<>
							<Spinner
								as="span"
								animation="border"
								size="sm"
								role="status"
								aria-hidden="true"
							/>

							<span className="visually-hidden">
								Ładowanie...
							</span>
						</>
					) : (
						<span>
							Wyślij
						</span>
					) }
				</Button>
			</>
		)
	}, [formResult, formMessage, getValues, isSubmitting])

	return (
		<Form className={ styles.wrapper } onSubmit={ handleFormSubmit }>
			<Stack gap={ 3 }>
				{ renderContent() }
			</Stack>
		</Form>
	)
}

export { BookingForm }
