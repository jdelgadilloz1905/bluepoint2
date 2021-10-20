/** @format */

import axios from 'axios'

import notification from 'antd/lib/notification'

import { ENV_CORE } from '../../components/Enviroment'

export const ProfileDetail = async (item) => {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${ENV_CORE}/api/auth/datos-user`,
		data: { conId: item },
	})
		.then((response) => {
			if (response.data.statusCode === 200) {
				returnResponse = response.data.userInfo
			} else {
				notification['warning']({
					message: 'Warning:',
					description: 'Service Error: REACT_APP_SERVICE_CORE - infoUser',
				})
			}
		})
		.catch(() => {
			notification['error']({
				message: `Error`,
				description: 'Check your internet connection',
			})
		})
	return returnResponse
}
