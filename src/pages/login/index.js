/** @format */

import React, { useState } from 'react'

import Form from 'antd/lib/form'
import Button from 'antd/lib/button'
import Select from 'antd/lib/select'

import Input from '../../components/Inputs/Normal'
import Image from '../../components/Image'

import servicesLogin from './services'

import './style.css'

export default function LoginUser() {
	const [form] = Form.useForm()
	const [isLoading, setLoading] = useState(false)

	const handleLoginUser = async (item) => {
		setLoading(true)
		await servicesLogin.Login(item).then((response) => {
			if (response.email) {
				window.location.href = '/profile'
				setLoading(false)
			}
		})
		setLoading(false)
	}
	return (
		<div className='est-auth-login-global-container'>
			<div className='est-auth-login-main-container'>
				<h3 className='est-auth-login-title'>
					<Image
						classImg={'est-banner-image'}
						image={`https://static.wixstatic.com/media/c86aa8_b9d1a19b6fa148129b39180b7518a3ef~mv2.png/v1/fill/w_210,h_41,al_c,q_85,usm_0.66_1.00_0.01/bluepoint2-Logo-Solid-DrkBlue.webp`}
						alt={'Logo BluePoint2'}
						title={'Logo BluePoint2'}
					/>
				</h3>
				<Form
					form={form}
					initialValues={{
						email: '',
						password: '',
					}}
					name='user_login'
					onFinish={handleLoginUser}>
					<div className='est-auth-login-form-container'>
						<Input
							className={'est-auth-login-field-input'}
							inputName={'email'}
							inputNameLabel={'E-mail'}
							inputNameRule={true}
							inputNameMessage={'E-mail is mandatory'}
							inputNameType={'text'}
							inputNameIcon={''}
							inputNameRules={'rulesEmailEN'}
						/>

						<Input
							className={'est-auth-login-field-input'}
							inputName={'password'}
							inputNameLabel={'Password'}
							inputNameRule={true}
							inputNameMessage={'The password is mandatory'}
							inputNameType={'password'}
							inputNameIcon={''}
							inputNameRules={'rulesPasswordEN'}
						/>
					</div>

					<Form.Item>
						<div>
							<div className='est-auth-login-button-container'>
								<Button
									onClick={''}
									className='est-auth-login-button'
									type='primary'
									htmlType={'submit'}
									loading={isLoading}>
									Login
								</Button>
							</div>
						</div>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}
