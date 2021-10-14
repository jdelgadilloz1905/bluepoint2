/** @format */
import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { setGlobal, useGlobal } from 'reactn'

import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Button from 'antd/lib/button'
import notification from 'antd/lib/notification'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'

import Input from '../../../../../../components/Common/Inputs/Normal'
import Image from '../../../../../../components/Common/Image'
import InputMask from '../../../../../../components/Common/Inputs/InputMask'

import { ENV_CORE } from '../../../../../../components/Common/Hooks/Variables/Enviroment'

import { rulesValidationMask } from '../../../../../../components/Common/Inputs/InputMask/rules'

import Uploadphoto from './components/UploadPhoto'

import { ProfileDetail } from '../../services'

import ProfileUpdate from './services'

import './style.css'

export default function ModalLoginUser(props) {
	const { t } = useTranslation()
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
		item.updPerfil = props.isUser.perfil
		setGlobal({ LoadingButtonProfile: true })
		if (!props.isUser.foto) {
			if (!isNewPhoto) {
				setGlobal({ LoadingButtonProfile: false })
				notification['warning']({
					message: t('profile.user_data.modal_edit_user.warning_message'),
					description: t(
						'profile.user_data.modal_edit_user.warning_description'
					),
				})
				return
			} else {
				item.updFoto = isNewPhoto
			}
		} else {
			if (isNewPhoto) {
				item.updFoto = isNewPhoto
			} else {
				item.updFoto = props.isUser.foto
			}
		}

		const traduce = {
			service_success_title: t(
				'profile.user_data.modal_edit_user.service_success_title'
			),
			service_success_description: t(
				'profile.user_data.modal_edit_user.service_success_description'
			),
			service_warning_title: t(
				'profile.user_data.modal_edit_user.service_warning_title'
			),
			service_warning_description: t(
				'profile.user_data.modal_edit_user.service_warning_description'
			),
			service_error_description: t(
				'profile.user_data.modal_edit_user.service_error_description'
			),
		}

		await ProfileUpdate(item, traduce).then((response) => {
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
				{t('profile.user_data.modal_edit_user.global_button')}
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
				<h3 className='est-auth-edit-profile-modal-title'>
					{t('profile.user_data.modal_edit_user.title')}
				</h3>
				<Form
					form={form}
					initialValues={{
						updName: props.isUser.nombre,
						updLast: props.isUser.apellido,
						updEmail: props.isUser.email,
						updId: props.isUser.id,
						updPhone: props.isUser.telefono,
						updIdioma: 'en',
					}}
					name='user_login'
					onFinish={handleEditUser}>
					<div className='est-auth-login-form-container'>
						<Row>
							<Col span={12} className='est-login-form-text-container'>
								<h4 className='est-login-form-text'>
									{t('profile.user_data.modal_edit_user.input_lan')}
								</h4>
								<Input
									className={'est-auth-login-field-input'}
									inputName={'updIdioma'}
									inputNameLabel={'Idioma'}
									inputNameRule={true}
									inputNameMessage={'Nombre es obligatorio.'}
									inputNameType={'text'}
									inputNameIcon={''}
									inputNameRules={'rulesName'}
									disabled={true}
								/>
							</Col>
							<Col span={12} className='est-login-form-text-container'>
								<h4 className='est-login-form-text'>ID</h4>
								<Input
									className={'est-auth-login-field-input'}
									inputName={'updId'}
									inputNameLabel={'Nombre'}
									inputNameRule={true}
									inputNameMessage={'Nombre es obligatorio.'}
									inputNameType={'number'}
									inputNameIcon={''}
									inputNameRules={'rulesName'}
									disabled={true}
								/>
							</Col>
							<Col span={12} className='est-login-form-text-container'>
								<h4 className='est-login-form-text'>
									{t('profile.user_data.modal_edit_user.input_name')}
								</h4>
								<Input
									className={'est-auth-login-field-input'}
									inputName={'updName'}
									inputNameLabel={t(
										'profile.user_data.modal_edit_user.placerholder_name'
									)}
									inputNameRule={true}
									inputNameMessage={'Nombre es obligatorio.'}
									inputNameType={'text'}
									inputNameIcon={''}
									inputNameRules={t(
										'field_notifications.normal.rules_first_name'
									)}
									disabled={props.isUser.modo === 'directo' ? false : true}
								/>
							</Col>
							<Col span={12} className='est-login-form-text-container'>
								<h4 className='est-login-form-text'>
									{t('profile.user_data.modal_edit_user.input_last_name')}
								</h4>
								<Input
									className={'est-auth-login-field-input'}
									inputName={'updLast'}
									inputNameLabel={t(
										'profile.user_data.modal_edit_user.placerholder_last_name'
									)}
									inputNameRule={true}
									inputNameMessage={'Nombre es obligatorio.'}
									inputNameType={'text'}
									inputNameIcon={''}
									inputNameRules={t(
										'field_notifications.normal.rules_last_name'
									)}
									disabled={props.isUser.modo === 'directo' ? false : true}
								/>
							</Col>
							<Col span={24} className='est-login-form-text-container'>
								<h4 className='est-login-form-text'>
									{t('profile.user_data.modal_edit_user.input_email')}
								</h4>
								<Input
									className={'est-auth-login-field-input'}
									inputName={'updEmail'}
									inputNameLabel={'Correo electrónico'}
									inputNameRule={true}
									inputNameMessage={'E-mail es obligatorio'}
									inputNameType={'text'}
									inputNameIcon={''}
									inputNameRules={t('field_notifications.normal.rules_email')}
									disabled={true}
								/>
							</Col>
							<Col span={24} className='est-login-form-text-container'>
								<h4 className='est-login-form-text'>
									{t('profile.user_data.modal_edit_user.input_phone')}
								</h4>
								<Form.Item
									name={'updPhone'}
									rules={
										rulesValidationMask[
											t('field_notifications.normal.rules_mask_phone')
										]
									}>
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
									{props.isUser.foto && (
										<>
											<h4 className='est-profile-edit-modal-image-text'>
												{t('profile.user_data.modal_edit_user.photo_title')}
											</h4>
											<div className='est-profile-edit-modal-image-container'>
												<Image
													classImg={'est-profile-edit-modal-image'}
													image={props.isUser.foto}
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
										{t('profile.user_data.modal_edit_user.button')}
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
