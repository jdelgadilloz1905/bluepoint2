/** @format */

import React, { useState } from 'react'

import { setGlobal } from 'reactn'

import { Row, Col, Button, Modal, Form, Select } from 'antd'

import Input from '../../../../../../components/Inputs/Normal'

import { GetAllUsers } from '../../services'

import CreateUserService from './services'

import './style.css'

const CreateUser = () => {
	const [form] = Form.useForm()
	const { Option } = Select
	const [isVisible, setVisible] = useState(false)
	const [isLoading, setLoading] = useState(false)

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
