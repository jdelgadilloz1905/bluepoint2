/** @format */

import axios from 'axios'

import { notification } from 'antd'

import { ENV_CORE } from '../../../../components/Enviroment'

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
					message: `Congratulations!`,
					description: `Password updated successfully`,
				})
			} else {
				notification['warning']({
					message: 'Warning:',
					description: `Service error: REACT_APP_SERVICE_CORE - Profile Info`,
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
