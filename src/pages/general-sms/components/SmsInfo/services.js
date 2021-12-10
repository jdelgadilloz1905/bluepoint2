/** @format */

import axios from 'axios'

import { notification } from 'antd'

import { ENV_CORE } from '../../../../components/Enviroment'

export const GetAllInsurance = async () => {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${ENV_CORE}/api/insurance/all`,
	})
		.then((response) => {
			if (response.data.statusCode === 200) {
				returnResponse = response.data.insuranceInfo
			} else {
				notification['warning']({
					message: 'Warning:',
					description: `Service error: REACT_APP_SERVICE_CORE - Insurance Info`,
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

export const ActivateInsurance = async (item) => {
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

export const DeleteInsurance = async (item) => {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${ENV_CORE}/api/auth/delete-insurance`,
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
