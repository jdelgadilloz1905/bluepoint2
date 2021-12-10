/** @format */

import axios from 'axios'

import notification from 'antd/lib/notification'

import { ENV_CORE } from '../../../../../../components/Enviroment'

export default async function CreateInsuService(item) {
	console.log('datos a enviar ', item)

	let returnResponse
	await axios({
		method: 'POST',
		url: `${ENV_CORE}/api/insurance/insu-register`,
		data: item,
	})
		.then((response) => {
			if (response.data.statusCode === 200) {
				notification['success']({
					message: `Congratulations`,
					description: `User created successfully`,
				})
				returnResponse = response
			} else {
				notification['warning']({
					message: `Warning`,
					description: `Error creating user or there is already a user registered with that name`,
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
