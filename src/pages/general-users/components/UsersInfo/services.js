/** @format */

import axios from 'axios'

import { notification } from 'antd'

import { ENV_CORE } from '../../../../components/Enviroment'

export const GetAllUsers = async () => {
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

export const SearchInsuranceDetail = async (item) => {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${ENV_CORE}/api/patient/insurance-detail`,
		data: item,
	})
		.then((response) => {
			if (response.data.statusCode === 200) {
				returnResponse = response.data.infoInsureDetail
			} else {
				returnResponse = null
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

export const getAllInsurence = async () => {
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
					message: `Error`,
					description: `No records found`,
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

export const getAllClients = async () => {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${ENV_CORE}/api/clients/all`,
		data: { id: null, valor: null },
	})
		.then((response) => {
			if (response.data.statusCode === 200) {
				returnResponse = response.data.clientsInfo
			} else {
				notification['warning']({
					message: `Error`,
					description: `No records found Clients`,
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

export const postRegisterLoteUsers = async (item) => {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${ENV_CORE}/api/clients/patient-register-lot`,
		data: item,
	})
		.then((response) => {
			if (response.data.statusCode === 200) {
				notification['success']({
					message: `Congratulations`,
					description: `patients created successfully`,
				})
				returnResponse = response
			} else {
				notification['warning']({
					message: `Warning`,
					description: `Error creating patients or there is already a user registered with that email`,
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
