/** @format */

import axios from 'axios'

import notification from 'antd/lib/notification'

import { ENV_CORE } from '../../../../../../components/Enviroment'

export default async function CreateUserService(item) {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${ENV_CORE}/api/auth/user-register`,
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
					description: `Error creating user or there is already a user registered with that email`,
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
