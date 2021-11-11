/** @format */

import axios from 'axios'

import notification from 'antd/lib/notification'

import { ENV_CORE } from '../../../Enviroment'

export const GetUserInfo = async (item) => {
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
					message: 'Advertencia:',
					description: 'Error en Servicio: REACT_APP_SERVICE_CORE - UserDetail',
				})
			}
		})
		.catch(() => {
			notification['error']({
				message: `Error`,
				description: 'Verifique su conexión a Internet',
			})
		})
	return returnResponse
}

// export const GetPatientInfo = async () => {
// 	let returnResponse
// 	await axios({
// 		method: 'POST',
// 		url: `${ENV_CORE}/api/patients/datos-patient`,
// 	})
// 		.then((response) => {
// 			if (response.data.statusCode === 200) {
// 				returnResponse = response.data.userInfo
// 			} else {
// 				notification['warning']({
// 					message: 'Advertencia:',
// 					description: 'Error en Servicio: REACT_APP_SERVICE_CORE - UserDetail',
// 				})
// 			}
// 		})
// 		.catch(() => {
// 			notification['error']({
// 				message: `Error`,
// 				description: 'Verifique su conexión a Internet',
// 			})
// 		})
// 	return returnResponse
// }
