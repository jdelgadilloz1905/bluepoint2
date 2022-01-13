/** @format */

import axios from 'axios'

import { notification } from 'antd'

import { ENV_CORE } from '../../../../components/Enviroment'

export const GetAllSms = async () => {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${ENV_CORE}/api/patient/all-sms`,
		data: { id: null, valor: null },
	})
		.then((response) => {
			if (response.data.statusCode === 200) {
				returnResponse = response.data.patientSms
			} else {
				notification['warning']({
					message: `Error`,
					description: `No records found Sms`,
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

export const SendSmsPatient = async (item) => {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${ENV_CORE}/api/clients/patient-sms-one-send`,
		data: item,
	})
		.then((response) => {
			if (response.data.statusCode === 200) {
				notification['success']({
					message: `Congratulations`,
					description: `SMS sent successfully`,
				})
				returnResponse = response.data
			} else {
				notification['error']({
					message: `Error`,
					description: `The message could not be sent`,
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
