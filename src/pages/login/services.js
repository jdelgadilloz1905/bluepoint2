/** @format */

import axios from 'axios'

import { setGlobal } from 'reactn'

import notification from 'antd/lib/notification'

import { ENV_CORE } from '../../components/Enviroment'

const servicesLogin = {
	async Login(item) {
		let returnResponse
		let data = {
			email: item.email,
			password: item.password,
		}
		console.log(`${ENV_CORE}/api/auth/login`)
		await axios({
			method: 'POST',
			url: `${ENV_CORE}/api/auth/login`,
			data: data,
		})
			.then((response) => {
				console.log('resultado del login ', response.data)

				if (response.data.statusCode === 200) {
					notification['success']({
						message: `Congratulations:`,
						description: `You have successfully logged in.`,
					})
					returnResponse = {
						name: response.data.userInfo.name,
						id: response.data.userInfo.id,
						email: response.data.userInfo.email,
						photo: response.data.userInfo.photo,
						last_login: response.data.userInfo.last_login,
					}
					localStorage.setItem('userSession', JSON.stringify(returnResponse))
					setGlobal(() => ({
						userEmail: `${returnResponse.email}`,
						userName: `${returnResponse.name}`,
						userData: returnResponse,
					}))
				} else {
					notification['warning']({
						message: `Warning:`,
						description: `Error processing your request or invalid password.`,
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
export default servicesLogin
