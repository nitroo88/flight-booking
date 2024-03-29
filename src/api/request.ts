import axios, { AxiosInstance } from 'axios'
import MockAdapter from 'axios-mock-adapter'

const request: AxiosInstance = axios.create({
	baseURL: 'http://localhost:3000',
	withCredentials: true,
	timeout: 60000,
})

const mockRequest = new MockAdapter(request, { delayResponse: 2000 })

mockRequest.onPost('/booking/danger').reply(400, {
	message: 'Formularz nie został poprawnie wysłany. Prosimy spróbować ponownie później.',
})

mockRequest.onPost('/booking/success').reply(200, {
	message: 'Formularz został poprawnie wysłany.',
})

export { request, mockRequest }
