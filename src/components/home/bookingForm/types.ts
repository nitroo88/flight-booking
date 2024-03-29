export interface IBookingFormData {
	name: string
	email: string
	phone: string
	departureDate: string
	departureCity: string
	arrivalCity: string
}

export type BookingFormResultType = 'success' | 'danger'
