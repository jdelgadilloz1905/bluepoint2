/** @format */

import axios from 'axios'

import { notification } from 'antd'

import { ENV_CORE } from '../../../../components/Enviroment'

export const GetAllUsers = async (traduce) => {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${ENV_CORE}/api/auth/all`,
	})
		.then((response) => {
			if (response.data.statusCode === 200) {
				returnResponse = response.data.userInfo
			} else {
				notification['warning']({
					message: 'Warning:',
					description: `Service error: REACT_APP_SERVICE_CORE - User Accounts`,
				})
			}
		})
		.catch(() => {
			notification['error']({
				message: `Error`,
				description: `Check your internet connection`,
			})
		})
	return returnResponse
}

export const ActivateUser = async (item) => {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${ENV_CORE}/api/auth/delete-user`,
		data: item,
	})
		.then((response) => {
			if (response.data.statusCode === 200) {
				returnResponse = response.data
				notification['success']({
					message: `Congratulations`,
					description: `User updated successfully`,
				})
			} else {
				notification['warning']({
					message: `Warning:`,
					description: `Service error: REACT_APP_SERVICE_CORE - User Info`,
				})
			}
		})
		.catch(() => {
			notification['error']({
				message: `Error`,
				description: `Check your internet connection`,
			})
		})
	return returnResponse
}

export const UpdatePassword = async (item) => {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${ENV_CORE}/api/auth/update-password`,
		data: item,
	})
		.then((response) => {
			if (response.data.statusCode === 200) {
				returnResponse = response.data
				notification['success']({
					message: `Congratulations`,
					description: `Password updated successfully`,
				})
			} else {
				notification['warning']({
					message: 'Warning:',
					description: `Service error: REACT_APP_SERVICE_CORE - User Info`,
				})
			}
		})
		.catch(() => {
			notification['error']({
				message: `Error`,
				description: `Check your internet connection`,
			})
		})
	return returnResponse
}

export const GetAllPatientInfo = async () => {
	console.log('Busco los datos del paciente')
	let returnResponse
	await axios({
		method: 'POST',
		url: `${ENV_CORE}/api/patients/all-patients`,
	})
		.then((response) => {
			if (response.data.statusCode === 200) {
				returnResponse = response.data.userInfo
				console.log('resultado de pacientes ', returnResponse)
			} else {
				notification['warning']({
					message: 'Advertencia:',
					description:
						'Error en Servicio: REACT_APP_SERVICE_CORE - PatientsDetail',
				})
			}
		})
		.catch(() => {
			notification['error']({
				message: `Error`,
				description: 'Verifique su conexión a Internet',
			})
		})
	return returnResponse
}
