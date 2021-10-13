/** @format */

const handleInputAgeES = (item, date) => {
	if (!!!item || item.length === 0) return { boolean: true, theLength: '' }
	let splited = item.split('/')
	if (splited[0] > 12 || splited[1] < 1) {
		return {
			boolean: false,
			message: 'Debe insertar un mes correcto',
		}
	} else if (splited[1] < 2021) {
		return {
			boolean: false,
			message: 'Ingrese una fecha válida',
		}
	} else {
		return { boolean: true, message: '', theLength: item.replace(/[/]/g, '') }
	}
}

const handleInputAgeEN = (item, date) => {
	if (!!!item || item.length === 0) return { boolean: true, theLength: '' }
	let splited = item.split('/')
	if (splited[0] > 12 || splited[1] < 1) {
		return {
			boolean: false,
			message: 'You must insert a correct month',
		}
	} else if (splited[1] < 2021) {
		return {
			boolean: false,
			message: 'Please enter a valid date',
		}
	} else {
		return { boolean: true, message: '', theLength: item.replace(/[/]/g, '') }
	}
}

export const rulesValidationMask = {
	rulesAgeES(date) {
		return [
			{
				required: true,
				message: 'Ingresa la fecha de su tarjeta.',
			},
			() => ({
				validator(_, value) {
					let validate = handleInputAgeES(value?.replace(/_/g, ''), date)
					if (!validate.boolean) {
						return Promise.reject(new Error(validate.message))
					} else if (validate.theLength.length === 6) {
						return Promise.resolve()
					} else {
						return Promise.reject()
					}
				},
			}),
		]
	},
	rulesAgeEN(date) {
		return [
			{
				required: true,
				message: 'Enter the date of your card.',
			},
			() => ({
				validator(_, value) {
					let validate = handleInputAgeEN(value?.replace(/_/g, ''), date)
					if (!validate.boolean) {
						return Promise.reject(new Error(validate.message))
					} else if (validate.theLength.length === 6) {
						return Promise.resolve()
					} else {
						return Promise.reject()
					}
				},
			}),
		]
	},
	rulesPhoneES: [
		{
			required: true,
			message: '¡Ingresa tu número!',
		},
		() => ({
			validator(_, value) {
				if (value?.replace(/[+()_/\s/]/g, '').length === 11) {
					return Promise.resolve()
				} else if (
					value?.replace(/[+()_/\s/]/g, '').length > 0 &&
					value?.replace(/[+()_/\s/]/g, '').length < 11
				) {
					return Promise.reject(new Error('Número incompleto'))
				} else return Promise.reject()
			},
		}),
	],
	rulesPhoneEN: [
		{
			required: true,
			message: 'Enter your number!',
		},
		() => ({
			validator(_, value) {
				if (value?.replace(/[+()_/\s/]/g, '').length === 11) {
					return Promise.resolve()
				} else if (
					value?.replace(/[+()_/\s/]/g, '').length > 0 &&
					value?.replace(/[+()_/\s/]/g, '').length < 11
				) {
					return Promise.reject(new Error('Incomplete number'))
				} else return Promise.reject()
			},
		}),
	],
}
