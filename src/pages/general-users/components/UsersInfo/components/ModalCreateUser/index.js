/** @format */

import React, { useState, useEffect } from 'react'

import { setGlobal } from 'reactn'

import { Row, Col, Button, Modal, Form, Select } from 'antd'

import Input from '../../../../../../components/Inputs/Normal'
import InputMask from '../../../../../../components/Inputs/InputMask'

import { rulesValidation } from '../../../../../../components/Inputs/Normal/rules'
import { rulesValidationMask } from '../../../../../../components/Inputs/InputMask/rules'

import { GetAllUsers, getAllClients } from '../../services'

import CreateUserService from './services'

import './style.css'

const CreateUser = () => {
	const [form] = Form.useForm()
	const { Option } = Select
	const [isVisible, setVisible] = useState(false)
	const [isLoading, setLoading] = useState(false)
	const [isClients, setIsClients] = useState(null)

	useEffect(() => {
		getAllClients().then((response) => {
			setIsClients(response)
		})
	}, [])

	const handleCreateUser = async (item) => {
		delete item.confirm
		item.regModo = 'directo'
		setLoading(true)

		await CreateUserService(item).then((response) => {
			if (response) {
				GetAllUsers().then((responseUsers) => {
					setGlobal({
						allUsers: responseUsers,
					})
					form.resetFields()
				})
			}
		})
		setLoading(false)
		setVisible(false)
	}

	return (
		<>
			<Button
				className='est-general-list-create-users-button'
				type='primary'
				onClick={() => setVisible(true)}>
				Create patient
			</Button>
			<Modal
				forceRender
				wrapClassName='est-user-modal-container'
				maskClosable={false}
				width='700px'
				centered
				visible={isVisible}
				onCancel={() => setVisible()}
				okText='Confirmar'
				cancelButtonProps={{ style: { display: 'none' } }}
				okButtonProps={{ style: { display: 'none' } }}>
				<h3 className='est-auth-edit-profile-modal-title'>Create patient</h3>

				<Form form={form} name='user_create' onFinish={handleCreateUser}>
					<div className='est-auth-login-form-container'>
						<Row>
							<Col span={12} className='est-login-form-text-container'>
								<h4 className='est-login-form-text'>Name</h4>
								<Input
									className={'est-auth-login-field-input'}
									inputName={'regName'}
									inputNameLabel={'Name'}
									inputNameRule={true}
									inputNameMessage={'Name ir required.'}
									inputNameType={'text'}
									inputNameIcon={''}
									inputNameRules={'rulesFirstNameEN'}
									disabled={false}
								/>
							</Col>
							<Col span={12} className='est-login-form-text-container'>
								<h4 className='est-login-form-text'>Last</h4>
								<Input
									className={'est-auth-login-field-input'}
									inputName={'regLast'}
									inputNameLabel={'Last'}
									inputNameRule={true}
									inputNameMessage={'Name ir required.'}
									inputNameType={'text'}
									inputNameIcon={''}
									inputNameRules={'rulesLastNameEN'}
								/>
							</Col>
							<Col span={24} className='est-login-form-text-container'>
								<h4 className='est-login-form-text'>Email</h4>
								<Input
									className={'est-auth-login-field-input'}
									inputName={'regEmail'}
									inputNameLabel={'Email'}
									inputNameRule={true}
									inputNameMessage={'E-mail ir required.'}
									inputNameType={'text'}
									inputNameIcon={''}
									inputNameRules={'rulesEmailEN'}
									disabled={false}
								/>
							</Col>
							<Col span={24} className='est-login-form-text-container'>
								<h4 className='est-login-form-text'>Phone</h4>
								<Form.Item
									name={'regPhone'}
									rules={rulesValidationMask['rulesPhoneEN']}>
									<InputMask
										maskstyle={'est-auth-login-field-input'}
										mask='+(1) 999 999 9999'
										placeholder='+(1) 999 999 9999'
									/>
								</Form.Item>
							</Col>

							<Col span={24} className='est-login-form-text-container'>
								<h4 className='est-login-form-text'>User profile</h4>
								<div className='est-create-user-modal-selector'>
									<Form.Item
										name={'regPerfil'}
										rules={rulesValidation.rulesRequiredES}>
										<Select>
											<Option value='0'>Regular user</Option>
											<Option value='1'>Manager</Option>
										</Select>
									</Form.Item>
								</div>
							</Col>
							{isClients && (
								<Col span={24} className='est-login-form-text-container'>
									<h4 className='est-login-form-text'>Client</h4>
									<div className='est-create-user-modal-selector'>
										<Form.Item
											name={'regClient'}
											label=''
											rules={[{ required: true }]}>
											<Select placeholder='Select a client'>
												{isClients.map((item, index) => (
													<Option value={item.id} key={index}>
														{item.name}
													</Option>
												))}
											</Select>
										</Form.Item>
									</div>
								</Col>
							)}

							<Col span={24} className='est-login-form-text-container'>
								<h4 className='est-login-form-text'>Password</h4>
								<Input
									className={'ph-auth-register-field-input'}
									inputName={'regPassword'}
									inputNameLabel={'Password'}
									inputNameRule={true}
									inputNameMessage={'Enter your password.'}
									inputNameType={'password'}
									inputNameIcon={''}
									inputNameRules={'rulesPasswordEN'}
								/>
								<Input
									className={'ph-auth-register-field-input'}
									inputName={'confirm'}
									inputNameLabel={'Confirm password'}
									inputNameRule={true}
									inputNameMessage={'Enter your password.'}
									inputNameType={'password'}
									inputNameIcon={''}
									dependencies={['password']}
									hasFeedback
									inputNameRules={'confirmPasswordEN'}
								/>
							</Col>
						</Row>
						<Form.Item>
							<div>
								<div className='est-user-modal-button-main-container'>
									<Button
										className='est-user-modal-button-main'
										type='primary'
										htmlType={'submit'}
										loading={isLoading}>
										Accept
									</Button>
								</div>
							</div>
						</Form.Item>
					</div>
				</Form>
			</Modal>
		</>
	)
}
export default CreateUser
