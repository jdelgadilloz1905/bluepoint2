/** @format */

import axios from 'axios'

import notification from 'antd/lib/notification'

import { ENV_CORE } from '../../components/Enviroment'

const servicesCamera = {
	async getAllInsurence() {
		let returnResponse
		await axios({
			method: 'POST',
			url: `${ENV_CORE}/api/insurance/all`,
		})
			.then((response) => {
				if (response.data.statusCode === 200) {
					returnResponse = response.data.insuInfo
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
	},
	async getDatosPatient(item) {
		let returnResponse
		await axios({
			method: 'POST',
			url: `${ENV_CORE}/api/auth/datos-user`,
			data: { idUser: item },
		})
			.then((response) => {
				if (response.data.statusCode === 200) {
					returnResponse = response.data.userInfo
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
	},
}

export default servicesCamera