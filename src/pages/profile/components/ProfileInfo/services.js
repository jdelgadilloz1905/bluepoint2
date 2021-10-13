/** @format */

import axios from 'axios'

import { notification } from 'antd'

import { ENV_CORE } from '../../../../../../components/Common/Hooks/Variables/Enviroment'

export const UpdatePassword = async (item, traduce) => {
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
					message: `${traduce.service_success_title}`,
					description: `${traduce.service_success_description}`,
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
				description: `${traduce.service_global_description}`,
			})
		})
	return returnResponse
}
