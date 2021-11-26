/** @format */
import React, { useState } from 'react'

import { setGlobal, useGlobal } from 'reactn'

import { Modal, Form, Button, notification, Row, Col, Select } from 'antd'

import { EditOutlined } from '@ant-design/icons'

import Input from '../../../../../../components/Inputs/Normal'
import Image from '../../../../../../components/Image'
import InputMask from '../../../../../../components/Inputs/InputMask'

import { ENV_CORE } from '../../../../../../components/Enviroment'

import { rulesValidationMask } from '../../../../../../components/Inputs/InputMask/rules'

import Uploadphoto from './components/UploadPhoto'

import { GetAllUsers, getAllClients } from '../../services'

import ProfileUpdate from './services'

import './style.css'

export default function ModalLoginUser(props) {
	const [form] = Form.useForm()
	// const { Option } = Select
	const [isModalUser, setModalUser] = useState(false)
	const [isNewPhoto, setNewPhoto] = useState(null)
	const [isLoading] = useGlobal('LoadingButtonProfile')
	const [isClients, setIsClients] = useState(null)
	const { Option } = Select

	const handleModalEditUser = () => {
		if (isModalUser) {
			setModalUser(false)
		} else {
			setModalUser(true)
		}
		getAllClients().then((response) => {
			setIsClients(response)
		})
	}

	const handleEditUser = async (item) => {
		item.updPhone = item.updPhone.replace(/[+()/\s/]/g, '')
		setGlobal({ LoadingButtonProfile: true })
		if (!props.item.photo) {
			if (!isNewPhoto) {
				setGlobal({ LoadingButtonProfile: false })
				notification['warning']({
					message: 'Warning',
					description: 'You must upload an image for the profile.',
				})
				return
			} else {
				item.updPhoto = isNewPhoto
			}
		} else {
			if (isNewPhoto) {
				item.updPhoto = isNewPhoto
			} else {
				item.updPhoto = props.item.photo
			}
		}

		await ProfileUpdate(item).then((response) => {
			if (response) {
				GetAllUsers().then((responseUsers) => {
					setGlobal({
						allUsers: responseUsers,
					})
				})
			}
		})
		setGlobal({ LoadingButtonProfile: false })
		setModalUser(false)
	}

	const handleAddProfileImage = (item) => {
		setNewPhoto(`${ENV_CORE}/${item.file}`)
	}

	const handleDeleteProfileImage = (item) => {
		setNewPhoto(null)
	}

	return (
		<>
			<Button
				className='est-auth-edit-general-profile-button'
				onClick={() => handleModalEditUser()}>
				<EditOutlined />
			</Button>
			<Modal
				forceRender
				wrapClassName='est-user-modal-container'
				maskClosable={true}
				width='700px'
				centered
				visible={isModalUser}
				onCancel={() => handleModalEditUser()}
				okText='Confirmar'
				cancelButtonProps={{ style: { display: 'none' } }}
				okButtonProps={{ style: { display: 'none' } }}>
				<h3 className='est-auth-edit-profile-modal-title'>Edit patient data</h3>
				{props.item && (
					<Form
						form={form}
						initialValues={{
							updName: props.item.name,
							updLast: props.item.last,
							updEmail: props.item.email,
							updId: props.item.id,
							updPhone: props.item.phone,
							updClient: props.item.client.id,
						}}
						name='user_edit'
						onFinish={handleEditUser}>
						<div className='est-auth-login-form-container'>
							<Row>
								<Col span={2} className='est-login-form-text-container'>
									<h4 className='est-login-form-text'>ID</h4>
									<Input
										className={'est-auth-login-field-input'}
										inputName={'updId'}
										inputNameLabel={'Id'}
										inputNameRule={true}
										inputNameMessage={'ID is required.'}
										inputNameType={'number'}
										inputNameIcon={''}
										inputNameRules={'rulesName'}
										disabled={true}
									/>
								</Col>
								<Col span={11} className='est-login-form-text-container'>
									<h4 className='est-login-form-text'>Name</h4>
									<Input
										className={'est-auth-login-field-input'}
										inputName={'updName'}
										inputNameLabel={'Name'}
										inputNameRule={true}
										inputNameMessage={'Name ir required.'}
										inputNameType={'text'}
										inputNameIcon={''}
										inputNameRules={'rulesFirstNameEN'}
										disabled={false}
									/>
								</Col>
								<Col span={11} className='est-login-form-text-container'>
									<h4 className='est-login-form-text'>Last</h4>
									<Input
										className={'est-auth-login-field-input'}
										inputName={'updLast'}
										inputNameLabel={'Last'}
										inputNameRule={true}
										inputNameMessage={'Last is required.'}
										inputNameType={'text'}
										inputNameIcon={''}
										inputNameRules={'rulesLastNameEN'}
									/>
								</Col>
								<Col span={24} className='est-login-form-text-container'>
									<h4 className='est-login-form-text'>Email</h4>
									<Input
										className={'est-auth-login-field-input'}
										inputName={'updEmail'}
										inputNameLabel={'Email'}
										inputNameRule={true}
										inputNameMessage={'E-mail is required'}
										inputNameType={'text'}
										inputNameIcon={''}
										inputNameRules={'rulesEmailEN'}
										disabled={props.item.modo === 'directo' ? false : true}
									/>
								</Col>
								<Col span={24} className='est-login-form-text-container'>
									<h4 className='est-login-form-text'>Phone</h4>
									<Form.Item
										name={'updPhone'}
										rules={rulesValidationMask['rulesPhoneEN']}>
										<InputMask
											maskstyle={'est-auth-login-field-input'}
											mask='+(1) 999 999 9999'
											placeholder='+(1) 999 999 9999'
										/>
									</Form.Item>
								</Col>

								<Col span={24} className='est-login-form-text-container'>
									{isClients && (
										<div className='est-create-user-modal-selector'>
											<h4 className='est-login-form-text'>Select Client</h4>
											<Form.Item
												name='updClient'
												rules={[
													{
														required: true,
													},
												]}>
												<Select>
													{isClients.map((item, index) => (
														<Option value={item.id} key={index}>
															{item.name}
														</Option>
													))}
												</Select>
											</Form.Item>
										</div>
									)}
								</Col>

								<Col
									span={12}
									className='est-login-form-upload-photo-container'>
									<Uploadphoto
										deleteItemImage={(data) => handleDeleteProfileImage(data)}
										addItemImage={(data) => handleAddProfileImage(data)}
									/>
									<div className='est-profile-edit-modal-image-text-container'>
										{props.item.photo && (
											<>
												<h4 className='est-profile-edit-modal-image-text'>
													Current profile picture:
												</h4>
												<div className='est-profile-edit-modal-image-container'>
													<Image
														classImg={'est-profile-edit-modal-image'}
														image={props.item.photo}
														alt={'Imagen Profile'}
														title={'Imagen Profile'}
													/>
												</div>
											</>
										)}
									</div>
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
				)}
			</Modal>
		</>
	)
}
