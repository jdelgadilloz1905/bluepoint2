/** @format */
import React, { useState } from 'react'

import { setGlobal, useGlobal } from 'reactn'

import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Button from 'antd/lib/button'
import notification from 'antd/lib/notification'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'

import Input from '../../../../components/Inputs/Normal'
import Image from '../../../../components/Image'
import InputMask from '../../../../components/Inputs/InputMask'

import { ENV_CORE } from '../../../../components/Enviroment'

import { rulesValidationMask } from '../../../../components/Inputs/InputMask/rules'

import Uploadphoto from './components/UploadPhoto'

import { ProfileDetail } from '../../services'

import ProfileUpdate from './services'

import './style.css'

export default function ModalLoginUser(props) {
	const [form] = Form.useForm()
	const [isModalUser, setModalUser] = useState(false)
	const [isNewPhoto, setNewPhoto] = useState(null)
	const [isLoading] = useGlobal('LoadingButtonProfile')

	const handleModalEditUser = () => {
		if (isModalUser) {
			setModalUser(false)
		} else {
			setModalUser(true)
		}
	}

	const handleEditUser = async (item) => {
		item.updPhone = item.updPhone.replace(/[+()/\s/]/g, '')
		item.updPerfil = props.isUser.profile
		setGlobal({ LoadingButtonProfile: true })
		if (!props.isUser.foto) {
			if (!isNewPhoto) {
				setGlobal({ LoadingButtonProfile: false })
				notification['warning']({
					message: 'Warning',
					description: 'You must upload an image for the profile.',
				})
				return
			} else {
				item.updFoto = isNewPhoto
			}
		} else {
			if (isNewPhoto) {
				item.updFoto = isNewPhoto
			} else {
				item.updFoto = props.isUser.photo
			}
		}

		await ProfileUpdate(item).then((response) => {
			if (response) {
				ProfileDetail(item.updId).then((responseUser) => {
					setGlobal({
						DataProfile: responseUser,
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
				className='est-auth-edit-profile-button'
				onClick={() => handleModalEditUser()}>
				Edit
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
				<h3 className='est-auth-edit-profile-modal-title'>Edit user data</h3>
				<Form
					form={form}
					initialValues={{
						updName: props.isUser.name,
						updEmail: props.isUser.email,
						updId: props.isUser.id,
						updPhone: props.isUser.phone,
					}}
					name='user_login'
					onFinish={handleEditUser}>
					<div className='est-auth-login-form-container'>
						<Row>
							<Col span={12} className='est-login-form-text-container'>
								<h4 className='est-login-form-text'>ID</h4>
								<Input
									className={'est-auth-login-field-input'}
									inputName={'updId'}
									inputNameLabel={'Name'}
									inputNameRule={true}
									inputNameMessage={'Name is required.'}
									inputNameType={'number'}
									inputNameIcon={''}
									inputNameRules={'rulesName'}
									disabled={true}
								/>
							</Col>
							<Col span={12} className='est-login-form-text-container'>
								<h4 className='est-login-form-text'>Name</h4>
								<Input
									className={'est-auth-login-field-input'}
									inputName={'updName'}
									inputNameLabel={'Name'}
									inputNameRule={true}
									inputNameMessage={'Name is required.'}
									inputNameType={'text'}
									inputNameIcon={''}
									inputNameRules={'rulesFirstNameEN'}
								/>
							</Col>

							<Col span={24} className='est-login-form-text-container'>
								<h4 className='est-login-form-text'>E-mail</h4>
								<Input
									className={'est-auth-login-field-input'}
									inputName={'updEmail'}
									inputNameLabel={'Email'}
									inputNameRule={true}
									inputNameMessage={'E-mail ir required'}
									inputNameType={'text'}
									inputNameIcon={''}
									inputNameRules={'rulesEmailEN'}
									disabled={true}
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
							<Col span={12} className='est-login-form-upload-photo-container'>
								<Uploadphoto
									deleteItemImage={(data) => handleDeleteProfileImage(data)}
									addItemImage={(data) => handleAddProfileImage(data)}
								/>
								<div className='est-profile-edit-modal-image-text-container'>
									{props.isUser.photo && (
										<>
											<h4 className='est-profile-edit-modal-image-text'>
												Current profile picture:
											</h4>
											<div className='est-profile-edit-modal-image-container'>
												<Image
													classImg={'est-profile-edit-modal-image'}
													image={props.isUser.photo}
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
			</Modal>
		</>
	)
}
