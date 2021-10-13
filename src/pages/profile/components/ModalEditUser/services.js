/** @format */

import axios from 'axios'

import notification from 'antd/lib/notification'

import { ENV_CORE } from '../../../../../../components/Common/Hooks/Variables/Enviroment'

export default async function ProfileUpdate(item, traduce) {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${ENV_CORE}/api/auth/update-user`,
		data: item,
	})
		.then((response) => {
			if (response.data.statusCode === 200) {
				notification['success']({
					message: `${traduce.service_success_title}`,
					description: `${traduce.service_success_description}`,
				})
				returnResponse = response
			} else {
				notification['warning']({
					message: `${traduce.service_warning_title}`,
					description: `${traduce.service_warning_description}`,
				})
			}
		})
		.catch(() => {
			notification['error']({
				message: `Error`,
				description: `${traduce.service_error_description}`,
			})
		})
	return returnResponse
}
