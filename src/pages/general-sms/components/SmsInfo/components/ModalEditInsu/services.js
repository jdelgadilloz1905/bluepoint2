/** @format */

import axios from 'axios'

import notification from 'antd/lib/notification'

import { ENV_CORE } from '../../../../../../components/Enviroment'

export default async function InsuranceUpdate(item) {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${ENV_CORE}/api/insurance/update-insurance`,
		data: item,
	})
		.then((response) => {
			if (response.data.statusCode === 200) {
				notification['success']({
					message: `Congratulations!`,
					description: `Data updated correctly`,
				})
				returnResponse = response
			} else {
				notification['warning']({
					message: `Warning`,
					description: `Error updating your profile data.`,
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
