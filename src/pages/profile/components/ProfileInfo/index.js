/** @format */

import React, { useState } from 'react'

import { setGlobal } from 'reactn'

import { Row, Col, Button, Form } from 'antd'

import Spacer from '../../../../components/Spacer'
import Image from '../../../../components/Image'
import Input from '../../../../components/Inputs/Normal'

import ProfileImg from '../../../../img/detail/profile-example.png'

import ModalEditUser from '../ModalEditUser'

import { UpdatePassword } from './services'

import './style.css'

export default function ProfileInfo(props) {
	const [update_profile_password] = Form.useForm()
	const [isLoading, setLoading] = useState(false)

	const handleUpdatePassWord = async (item) => {
		setLoading(true)

		const updatePassword = {
			idUser: props.isUserProfileInfo.id,
			newPassword: item.regPassword,
		}

		await UpdatePassword(updatePassword).then(() => {})
		setLoading(false)
		update_profile_password.resetFields()
	}

	const handleLogOut = () => {
		localStorage.removeItem('userSession')
		setGlobal(() => ({ userEmail: null, userData: null }))
		window.location.pathname = '/'
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
						Menu
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
								{props.isUserProfileInfo.photo ? (
									<>
										<Image
											classImg={'est-profile-info-photo'}
											image={props.isUserProfileInfo.photo}
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
								Current profile picture:
							</h4>
						</div>
					</Col>
					<Col
						xs={24}
						sm={24}
						md={8}
						lg={12}
						xl={12}
						className='est-profile-info-container'>
						<div className='est-profile-info-box'>
							<h3 className='est-profile-info-global-title'>Welcome:</h3>
							<ul className='est-profile-info-list'>
								<li>
									<h3 className='est-profile-info-title'>User:</h3>
								</li>
								<h4 className='est-profile-info-subtitle'>
									{props.isUserProfileInfo.name} {props.isUserProfileInfo.last}
								</h4>
								<li>
									<h3 className='est-profile-info-title'>Email:</h3>
								</li>
								<h4 className='est-profile-info-text'>
									{props.isUserProfileInfo.email}
								</h4>
								<li>
									<h3 className='est-profile-info-title'>Phone:</h3>
								</li>
								<h4 className='est-profile-info-text'>
									{props.isUserProfileInfo.phone}
								</h4>
								<li>
									<h3 className='est-profile-info-title'>Creation date:</h3>
								</li>
								<h4 className='est-profile-info-text'>
									{props.isUserProfileInfo.date_creation}
								</h4>
								<li>
									<h3 className='est-profile-info-title'>Last login:</h3>
								</li>
								<h4 className='est-profile-info-text'>
									{props.isUserProfileInfo.last_login}
								</h4>
							</ul>
						</div>
						<Button
							className='est-auth-off-profile-button'
							onClick={() => handleLogOut()}>
							Sign Off
						</Button>
					</Col>

					<Col
						xs={24}
						sm={24}
						md={8}
						lg={11}
						xl={11}
						className='est-profile-info-container'>
						<div className='est-profile-info-box'>
							<h3 className='est-profile-info-global-title'>Change password</h3>
							<Form
								form={update_profile_password}
								name='user_update_password'
								onFinish={handleUpdatePassWord}
								className='est-user-update-password-form'>
								<Input
									className={'est-user-update-password-input'}
									inputName={'regPassword'}
									inputNameLabel={'Password'}
									inputNameRule={true}
									inputNameMessage={'Enter your password'}
									inputNameType={'password'}
									inputNameIcon={''}
									inputNameRules={'rulesPasswordEN'}
								/>
								<Input
									className={'est-user-update-password-input'}
									inputName={'confirm'}
									inputNameLabel={'Confirm password'}
									inputNameRule={true}
									inputNameMessage={'Enter your password'}
									inputNameType={'password'}
									inputNameIcon={''}
									dependencies={['password']}
									hasFeedback
									inputNameRules={'confirmPasswordEN'}
								/>
								<div className='est-user-update-password-button-container'>
									<Button
										className='est-user-update-password-button'
										htmlType={'submit'}
										loading={isLoading}>
										Change password
									</Button>
								</div>
							</Form>
						</div>
					</Col>
				</Row>
			</div>
		</div>
	)
}
