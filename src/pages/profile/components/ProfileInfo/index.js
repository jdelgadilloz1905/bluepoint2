/** @format */

import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { setGlobal } from 'reactn'

import { Row, Col, Button, Form } from 'antd'

import Spacer from '../../../../../../components/Common/Spacer'
import Image from '../../../../../../components/Common/Image'
import Input from '../../../../../../components/Common/Inputs/Normal'

import ProfileImg from '../../../../../../img/detail/profile-example.png'

import ModalEditUser from '../ModalEditUser'

import { UpdatePassword } from './services'

import './style.css'

export default function ProfileInfo(props) {
	const { t } = useTranslation()
	const [update_profile_password] = Form.useForm()
	const [isLoading, setLoading] = useState(false)

	const handleUpdatePassWord = async (item) => {
		setLoading(true)
		const updatePassword = {
			updEmailEncriptado: props.isUserProfileInfo.email_encriptado,
			updNewPassword: item.regPassword,
		}

		const traduce = {
			service_success_title: t(
				'profile.general_users.users_info.service_update_password.service_success_message'
			),
			service_success_description: t(
				'profile.general_users.users_info.service_update_password.service_success_description'
			),
			service_global_description: t('global_service.service_global_description'),
		}

		await UpdatePassword(updatePassword, traduce).then(() => {})
		setLoading(false)
		update_profile_password.resetFields()
	}

	return (
		<div className='est-profile-info-global-container'>
			<div className='est-profile-info-main-container'>
				<div className='est-profile-info-responsive-button-container'>
					<Button
						className='est-profile-info-responsive-button'
						type='primary'
						onClick={() =>
							setGlobal({
								useDrawer: true,
							})
						}>
						{t('profile.user_data.profile_info.resp_button')}
					</Button>
					<Spacer />
					<ModalEditUser isUser={props.isUserProfileInfo} />
				</div>
				<Row className='est-profile-info-container'>
					<Col
						xs={24}
						sm={7}
						md={7}
						lg={7}
						xl={7}
						className='est-profile-info-photo-global-container'>
						<div className='est-profile-info-photo-text-container'>
							<div className='est-profile-info-photo-container'>
								{props.isUserProfileInfo.foto ? (
									<>
										<Image
											classImg={'est-profile-info-photo'}
											image={props.isUserProfileInfo.foto}
											alt={'Imagen Profile'}
											title={'Imagen Profile'}
										/>
									</>
								) : (
									<Image
										classImg={'est-profile-info-photo'}
										image={ProfileImg}
										alt={'Imagen Profile'}
										title={'Imagen Profile'}
									/>
								)}
							</div>
							<h4 className='est-profile-info-photo-text'>
								{t('profile.user_data.profile_info.resp_foto_title')}
							</h4>
						</div>
					</Col>
					<Col xs={24} sm={24} md={8} lg={12} xl={12} className='est-profile-info-container'>
						<div className='est-profile-info-box'>
							<h3 className='est-profile-info-global-title'>
								{t('profile.user_data.profile_info.title')}
							</h3>
							<ul className='est-profile-info-list'>
								<li>
									<h3 className='est-profile-info-title'>
										{t('profile.user_data.profile_info.field_user')}
									</h3>
								</li>
								<h4 className='est-profile-info-subtitle'>
									{props.isUserProfileInfo.nombre} {props.isUserProfileInfo.apellido}
								</h4>
								<li>
									<h3 className='est-profile-info-title'>
										{t('profile.user_data.profile_info.field_email')}
									</h3>
								</li>
								<h4 className='est-profile-info-text'>{props.isUserProfileInfo.email}</h4>
								<li>
									<h3 className='est-profile-info-title'>
										{t('profile.user_data.profile_info.start_type')}
									</h3>
								</li>
								<h4 className='est-profile-info-subtitle'>
									{props.isUserProfileInfo.modo}
								</h4>
								<li>
									<h3 className='est-profile-info-title'>
										{t('profile.user_data.profile_info.field_phone')}
									</h3>
								</li>
								<h4 className='est-profile-info-text'>
									{props.isUserProfileInfo.telefono}
								</h4>
								<li>
									<h3 className='est-profile-info-title'>
										{t('profile.user_data.profile_info.creation_date')}
									</h3>
								</li>
								<h4 className='est-profile-info-text'>
									{props.isUserProfileInfo.fecha_creacion}
								</h4>
								<li>
									<h3 className='est-profile-info-title'>
										{t('profile.user_data.profile_info.login_date')}
									</h3>
								</li>
								<h4 className='est-profile-info-text'>
									{props.isUserProfileInfo.ultimo_login}
								</h4>
							</ul>
						</div>
					</Col>
					{props.isUserProfileInfo.modo === 'directo' && (
						<Col
							xs={24}
							sm={24}
							md={8}
							lg={11}
							xl={11}
							className='est-profile-info-container'>
							<div className='est-profile-info-box'>
								<h3 className='est-profile-info-global-title'>
									{t('profile.general_users.users_info.modal_user_pass_title')}
								</h3>
								<Form
									form={update_profile_password}
									name='user_update_password'
									onFinish={handleUpdatePassWord}
									className='est-user-update-password-form'>
									<Input
										className={'est-user-update-password-input'}
										inputName={'regPassword'}
										inputNameLabel={t(
											'profile.general_users.users_info.modal_user_pass_placholder'
										)}
										inputNameRule={true}
										inputNameMessage={t(
											'profile.general_users.users_info.modal_user_pass_message'
										)}
										inputNameType={'password'}
										inputNameIcon={''}
										inputNameRules={t('field_notifications.normal.rules_password')}
									/>
									<Input
										className={'est-user-update-password-input'}
										inputName={'confirm'}
										inputNameLabel={t(
											'profile.general_users.users_info.modal_user_pass_confirm_placeholder'
										)}
										inputNameRule={true}
										inputNameMessage={t(
											'profile.general_users.users_info.modal_user_pass_message'
										)}
										inputNameType={'password'}
										inputNameIcon={''}
										dependencies={['password']}
										hasFeedback
										inputNameRules={t(
											'field_notifications.normal.rules_confirm_password'
										)}
									/>
									<div className='est-user-update-password-button-container'>
										<Button
											className='est-user-update-password-button'
											htmlType={'submit'}
											loading={isLoading}>
											{t('profile.general_users.users_info.modal_user_pass_title')}
										</Button>
									</div>
								</Form>
							</div>
						</Col>
					)}
				</Row>
			</div>
		</div>
	)
}
