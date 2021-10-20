/** @format */

import React, { useEffect, useState } from 'react'

import { setGlobal, useGlobal } from 'reactn'

import { Row, Col, Button, Modal, Form, Input } from 'antd'

import { PoweroffOutlined } from '@ant-design/icons'

import InputNormal from '../../../../components/Inputs/Normal'

import Loading from '../../../../components/Loading'
import Image from '../../../../components/Image'

import ModalEditUser from './components/ModalEditUser'
import ModalCreateUser from './components/ModalCreateUser'

import './style.css'

import {
	GetAllPatientInfo,
	GetAllUsers,
	ActivateUser,
	UpdatePassword,
} from './services'

const Usersinfo = () => {
	const [isMobile, setMobile] = useState(false)
	const [update_password] = Form.useForm()
	const [isVisible, setVisible] = useState(false)
	const [isAllUsers, setAllUsers] = useGlobal('allUsers')
	const [isModalInfo, setModalInfo] = useState(null)
	const [isUpdateUser, setUpdateUser] = useState(false)
	const [isLoading, setLoading] = useState(false)
	const [isFilterList, setFilterList] = useState(null)

	const [isGetAllUsers] = useState({
		service_global_description: 'Check your internet connection',
	})

	const handleManageUser = (item) => {
		setVisible(true)
		setModalInfo(item)
	}

	const handleCloseManageUser = () => {
		setModalInfo(null)
		setVisible(false)
	}

	const handleUpdatePassWord = async (item) => {
		setLoading(true)
		const updatePassword = {
			updEmailEncriptado: isModalInfo.email_encriptado,
			updNewPassword: item.regPassword,
		}

		await UpdatePassword(updatePassword).then(() => {})
		setLoading(false)
		update_password.resetFields()
	}

	const handleActivateuser = async (item) => {
		setUpdateUser(true)
		let actionUser = {
			idUser: item.id,
			allDelete: 'no',
		}
		if (item.state === '1') {
			actionUser.state = '0'
		} else if (item.state === '0') {
			actionUser.state = '1'
		}

		await ActivateUser(actionUser).then((response) => {
			if (response) {
				GetAllPatientInfo(isGetAllUsers).then((response) => {
					if (response) {
						setAllUsers(response)
					}
				})
			}
		})
		setUpdateUser(false)
	}

	const handleSearchList = (item) => {
		const filter = item.target.value
		let filterList = isFilterList.filter((data) => {
			data.email = data.email.toLowerCase()
			return data.email.indexOf(filter) !== -1
		})
		setAllUsers(filterList)
	}

	useEffect(() => {
		if (window.innerWidth < 576) {
			setMobile(true)
		}
		GetAllUsers(isGetAllUsers).then((response) => {
			if (response) {
				setAllUsers(response)
				setFilterList(response)
			}
		})
	}, [setAllUsers])

	if (!isAllUsers) {
		return <Loading />
	} else
		return (
			<>
				{isMobile && (
					<Row className='est-general-list-users-banner-container-responsive'>
						<Col xs={12}>
							<Button
								className='est-general-list-users-responsive-button'
								type='primary'
								onClick={() =>
									setGlobal({
										useDrawer: true,
									})
								}>
								Menu
							</Button>
						</Col>
						<Col
							xs={12}
							className='est-general-list-create-user-responsive-button'>
							<ModalCreateUser />
						</Col>
						<Col
							xs={24}
							className='est-general-list-users-banner-search-container'>
							<Input
								type='text'
								onChange={(item) => handleSearchList(item)}
								placeholder={'Search...'}
								className='est-general-list-users-banner-search'
							/>
						</Col>
					</Row>
				)}

				<Row className='est-general-list-users-banner-container'>
					<Col xs={24} sm={4} md={4} lg={0} xl={0}>
						<Button
							className='est-general-list-users-responsive-button'
							type='primary'
							onClick={() =>
								setGlobal({
									useDrawer: true,
								})
							}>
							Menu
						</Button>
					</Col>
					<Col
						xs={24}
						sm={12}
						md={12}
						lg={12}
						xl={12}
						className='est-general-list-users-banner-search-container'>
						<Input
							type='text'
							onChange={(item) => handleSearchList(item)}
							placeholder={'Enter a keyword'}
							className='est-general-list-users-banner-search'
						/>
					</Col>
					<Col
						xs={24}
						sm={4}
						md={4}
						lg={12}
						xl={12}
						className='est-general-list-create-user-container'>
						<ModalCreateUser />
					</Col>
				</Row>

				<Row className='est-general-list-users-list-main-title-container'>
					<Col md={2} lg={2} xl={2}>
						<h3 className='est-general-list-users-list-main-title'>Status</h3>
					</Col>
					<Col md={2} lg={2} xl={2}>
						<h3 className='est-general-list-users-list-main-title'>User ID</h3>
					</Col>
					<Col md={6} lg={6} xl={6}>
						<h3 className='est-general-list-users-list-main-title'>Email</h3>
					</Col>
					<Col md={6} lg={6} xl={6}>
						<h3 className='est-general-list-users-list-main-title'>Name</h3>
					</Col>
					<Col md={3} lg={3} xl={3}>
						<h3 className='est-general-list-users-list-main-title'>Mode</h3>
					</Col>
					<Col md={5} lg={5} xl={5}>
						<h3 className='est-general-list-users-list-main-title'>Actions</h3>
					</Col>
				</Row>
				<div className='est-general-list-users-list-main-container'>
					{isAllUsers.map((item, index) => (
						<Row key={index} className='est-general-list-users-list-container'>
							<Col
								className='est-general-list-users-list-text-container'
								xs={24}
								sm={24}
								md={2}
								lg={2}
								xl={2}>
								<h4 className='est-general-list-users-title'>
									<span className='est-general-list-users-list-main-title-responsive'>
										Status:
									</span>
									<span
										className={
											item.estado === '1'
												? 'est-general-list-users-title-state-active'
												: 'est-general-list-users-title-state-disable'
										}></span>
								</h4>
							</Col>
							<Col
								className='est-general-list-users-list-text-container'
								xs={24}
								sm={24}
								md={2}
								lg={2}
								xl={2}>
								<h4 className='est-general-list-users-title'>
									<span className='est-general-list-users-list-main-title-responsive'>
										User ID:
									</span>
									{item.id}
								</h4>
							</Col>
							<Col
								className='est-general-list-users-list-text-container'
								xs={24}
								sm={24}
								md={6}
								lg={6}
								xl={6}>
								<h4 className='est-general-list-users-title'>
									<span className='est-general-list-users-list-main-title-responsive'>
										Email:
									</span>
									{item.email}
								</h4>
							</Col>
							<Col
								className='est-general-list-users-list-text-container'
								xs={24}
								sm={24}
								md={6}
								lg={6}
								xl={6}>
								<h4 className='est-general-list-users-title'>
									<span className='est-general-list-users-list-main-title-responsive'>
										Complete name:
									</span>
									{item.nombre} {item.apellido}
								</h4>
							</Col>
							<Col
								className='est-general-list-users-list-text-container'
								xs={24}
								sm={24}
								md={3}
								lg={3}
								xl={3}>
								<h4 className='est-general-list-users-title'>
									<span className='est-general-list-users-list-main-title-responsive'>
										Mode:
									</span>
									{item.modo}
								</h4>
							</Col>
							<Col
								xs={24}
								sm={24}
								md={5}
								lg={5}
								xl={5}
								className='est-general-list-users-list-text-container'>
								<h4 className='est-general-list-users-title'>
									<span className='est-general-list-users-list-main-title-responsive'>
										Actions:
									</span>
									<Row className='est-users-manage-list-button-container'>
										<Col>
											<Button
												className='est-users-manage-list-button'
												onClick={() => handleManageUser(item)}>
												Details
											</Button>
										</Col>
										<Col>
											<ModalEditUser item={item} />
										</Col>
										<Col>
											<Button
												loading={isUpdateUser}
												icon={<PoweroffOutlined />}
												className='est-users-manage-list-button-disable-user-button'
												onClick={() => handleActivateuser(item)}></Button>
										</Col>
									</Row>
								</h4>
							</Col>
						</Row>
					))}
				</div>
				<Modal
					wrapClassName='est-manage-users-modal-global-container'
					centered
					title={'Manage patients'}
					visible={isVisible}
					onCancel={() => handleCloseManageUser()}
					cancelButtonProps={{ style: { display: 'none' } }}
					okButtonProps={{ style: { display: 'none' } }}
					okText=''
					cancelText=''
					footer={false}>
					{isModalInfo && (
						<Row>
							<Col
								xs={24}
								sm={24}
								md={isModalInfo.modo === 'directo' ? 12 : 24}
								lg={isModalInfo.modo === 'directo' ? 12 : 24}
								xl={isModalInfo.modo === 'directo' ? 12 : 24}
								className='est-manage-users-modal-main-container'>
								<div className='est-manage-users-modal-profile-image-container'>
									<Image
										classImg={'est-manage-users-modal-profile-image'}
										image={isModalInfo.photo}
										alt={isModalInfo.name}
										title={isModalInfo.name}
									/>
								</div>

								<div
									className={`${
										isModalInfo.modo !== 'directo'
											? 'est-manage-users-modal-direct-title-container'
											: ''
									} est-manage-users-modal-title-container`}>
									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											ID:
										</span>{' '}
										{isModalInfo.id}
									</h4>
									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											Email:
										</span>{' '}
										{isModalInfo.email}
									</h4>
									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											Full name:
										</span>{' '}
										{isModalInfo.name} {isModalInfo.last}
									</h4>
									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											Creation date:
										</span>{' '}
										{isModalInfo.fecha_creacion}
									</h4>
									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											Type of login:
										</span>{' '}
										{isModalInfo.modo}
									</h4>
									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											Account status:
										</span>{' '}
										{isModalInfo.state === '1' ? `Active` : `Inactive`}
									</h4>

									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											Phone:
										</span>{' '}
										{isModalInfo.telefono}
									</h4>
									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											Last login:
										</span>{' '}
										{isModalInfo.ultimo_login}
									</h4>
								</div>
							</Col>

							{/* {isModalInfo.modo === 'directo' && (
								<Col
									xs={24}
									sm={24}
									md={12}
									lg={12}
									xl={12}
									className='est-manage-users-modal-password-global-container'>
									<div className='est-manage-users-modal-password-main-container'>
										<h4 className='est-manage-users-modal-password-title'>
											{t(
												'profile.general_users.users_info.modal_user_pass_title'
											)}
										</h4>
										<Form
											form={update_password}
											name='user_update_password'
											onFinish={handleUpdatePassWord}>
											<InputNormal
												className={'est-manage-users-modal-password-input'}
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
												inputNameRules={t(
													'field_notifications.normal.rules_password'
												)}
											/>
											<InputNormal
												className={'est-manage-users-modal-password-input'}
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
											<Button
												className='est-manage-users-modal-password-button'
												htmlType={'submit'}
												loading={isLoading}>
												{t(
													'profile.general_users.users_info.modal_user_pass_title'
												)}
											</Button>
										</Form>
									</div>
								</Col>
							)} */}
						</Row>
					)}
					<div className='est-manage-users-modal-button-container'>
						<Button
							className='est-manage-users-modal-button'
							onClick={() => handleCloseManageUser()}>
							Close
						</Button>
					</div>
				</Modal>
			</>
		)
}
export default Usersinfo
