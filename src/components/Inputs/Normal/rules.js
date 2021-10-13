/** @format */

export const rulesValidation = {
	rulesRequiredES: [
		{
			required: true,
			message: 'Por favor ingresa un valor',
		},
	],
	rulesRequiredEN: [
		{
			required: true,
			message: 'Please input a value',
		},
	],
	rulesPeopleES: [
		() => ({
			validator(_, value) {
				const validate = /^[0-9]+$/.test(value)
				if (!validate) {
					return Promise.reject(new Error('Formato no válido.'))
				} else return Promise.resolve()
			},
		}),
	],
	rulesPeopleEN: [
		() => ({
			validator(_, value) {
				const validate = /^[0-9]+$/.test(value)
				if (!validate) {
					return Promise.reject(new Error('Invalid format.'))
				} else return Promise.resolve()
			},
		}),
	],
	rulesRequired: [
		{
			required: true,
			message: 'Por favor ingresa un valor',
		},
	],
	rulesNameRequiredES: [
		{
			required: true,
			message: 'Por favor ingresa un valor',
		},
		{
			min: 3,
			message: '¡Mínimo 3 caracteres!',
		},
		{
			max: 32,
			message: '¡Máximo 32 caracteres!',
		},
	],
	rulesNameRequiredEN: [
		{
			required: true,
			message: 'Please enter a value',
		},
		{
			min: 3,
			message: 'Minimum 3 characters!',
		},
		{
			max: 32,
			message: 'Maximum 32 characters!',
		},
	],
	rulesAddressRequiredES: [
		{
			required: true,
			message: 'Por favor ingresa un valor',
		},
		{
			min: 2,
			message: '¡Mínimo 3 caracteres!',
		},
		{
			max: 50,
			message: 'Máximo 50 caracteres!',
		},
	],
	rulesAddressRequiredEN: [
		{
			required: true,
			message: 'Please enter a value',
		},
		{
			min: 2,
			message: 'Minimum 3 characters!',
		},
		{
			max: 50,
			message: 'Maximum 50 characters!',
		},
	],
	rulesEmailES: [
		{
			type: 'email',
			message: 'Correo no es válido',
		},
		{
			required: true,
			message: 'Por favor ingresa tu correo',
		},
	],
	rulesEmailEN: [
		{
			type: 'email',
			message: 'Email is not valid',
		},
		{
			required: true,
			message: 'Please enter your email',
		},
	],
	rulesPasswordES: [
		{
			required: true,
			message: '¡Ingresa tu contraseña!',
		},
		{
			min: 4,
			message: '¡Mínimo 4 caracteres!',
		},
	],
	rulesPasswordEN: [
		{
			required: true,
			message: 'Enter your password!',
		},
		{
			min: 4,
			message: 'Minimum 4 characters!',
		},
	],
	rulesText: [
		{
			required: true,
			message: 'Campo obligatorio',
		},
		{
			min: 4,
			message: 'Mínimo 4 caracteres!',
		},
	],
	rulesFirstNameES: [
		{
			required: true,
			message: 'Ingresa tu nombre',
		},
		{
			min: 3,
			message: '¡Mínimo 3 caracteres!',
		},
	],
	rulesFirstNameEN: [
		{
			required: true,
			message: 'Enter your name',
		},
		{
			min: 3,
			message: 'Minimum 3 characters!',
		},
	],
	rulesLastNameES: [
		{
			required: true,
			message: 'Ingresa tu apellido',
		},
		{
			min: 3,
			message: '¡Mínimo 3 caracteres!',
		},
	],
	rulesLastNameEN: [
		{
			required: true,
			message: 'Enter your last name',
		},
		{
			min: 3,
			message: 'Minimum 3 characters!',
		},
	],
	rulesSpacer: [
		() => ({
			validator(_, value) {
				const validate = /^[A-Za-z0-9]+$/.test(value)
				if (value) {
					if (validate) {
						return Promise.resolve()
					} else {
						return Promise.reject(new Error('Formato no válido.'))
					}
				} else {
					return Promise.reject(new Error('Ingrese el No. de cupón.'))
				}
			},
		}),
	],
	rulesPeople: [
		() => ({
			validator(_, value) {
				const validate = /^[0-9]+$/.test(value)
				if (!validate) {
					return Promise.reject(new Error('Formato no válido.'))
				} else return Promise.resolve()
			},
		}),
	],
	rulesNumberES: [
		() => ({
			validator(_, value) {
				const validate = /^[0-9]+$/.test(value)
				if (value?.replace(/[+()_/\s/]/g, '').length < 0) {
					return Promise.reject(new Error('Ingrese un número.'))
				} else if (!validate) {
					return Promise.reject(new Error('Formato no válido.'))
				} else if (value?.replace(/[+()_/\s/]/g, '').length > 17) {
					return Promise.reject(new Error('Máximo 17 caracteres.'))
				} else return Promise.resolve()
			},
		}),
	],
	rulesNumberEN: [
		() => ({
			validator(_, value) {
				const validate = /^[0-9]+$/.test(value)
				if (value?.replace(/[+()_/\s/]/g, '').length < 0) {
					return Promise.reject(new Error('Please enter a number.'))
				} else if (!validate) {
					return Promise.reject(new Error('Invalid format.'))
				} else if (value?.replace(/[+()_/\s/]/g, '').length > 17) {
					return Promise.reject(new Error('Maximum 17 characters.'))
				} else return Promise.resolve()
			},
		}),
	],
	confirmPasswordES: [
		{
			required: true,
			message: '¡Por favor, confirme su contraseña!',
		},
		({ getFieldValue }) => ({
			validator(rule, value) {
				if (
					!value ||
					getFieldValue('password') === value ||
					getFieldValue('regPassword') === value
				) {
					return Promise.resolve()
				}
				return Promise.reject('¡Las dos contraseñas que ingresó no coinciden!')
			},
		}),
	],
	confirmPasswordEN: [
		{
			required: true,
			message: 'Please confirm your password!',
		},
		({ getFieldValue }) => ({
			validator(rule, value) {
				if (
					!value ||
					getFieldValue('password') === value ||
					getFieldValue('regPassword') === value
				) {
					return Promise.resolve()
				}
				return Promise.reject('The two passwords you entered do not match!')
			},
		}),
	],
	confirmEmailES: [
		{
			required: true,
			message: '¡Por favor, confirme su correo!',
		},
		({ getFieldValue }) => ({
			validator(rule, value) {
				if (!value || getFieldValue('email') === value) {
					return Promise.resolve()
				}
				return Promise.reject('¡Los dos correos no coinciden!')
			},
		}),
	],
	confirmEmailEN: [
		{
			required: true,
			message: 'Please confirm your email!',
		},
		({ getFieldValue }) => ({
			validator(rule, value) {
				if (!value || getFieldValue('email') === value) {
					return Promise.resolve()
				}
				return Promise.reject('The two emails do not match!')
			},
		}),
	],
}
