/** @format */

import React, { useEffect, useState } from 'react'

import { setGlobal, useGlobal } from 'reactn'

import { Row, Col, Button, Modal, Form, Input, Popconfirm } from 'antd'

import { FileProtectOutlined, SendOutlined } from '@ant-design/icons'

import Loading from '../../../../components/Loading'
import Image from '../../../../components/Image'

import './style.css'

import { GetAllSms, SendSmsPatient } from './services'

const SmsInfo = () => {
	const [isMobile, setMobile] = useState(false)
	const [update_password] = Form.useForm()
	const [isVisible, setVisible] = useState(false)
	const [isAllSms, setAllSms] = useGlobal('allSms')
	const [isModalInfo, setModalInfo] = useState(null)
	const [isUpdateSms, setUpdateSms] = useState(false)
	const [isLoading, setLoading] = useState(false)
	const [isFilterList, setFilterList] = useState(null)

	const [isGetAllSms] = useState({
		service_global_description: 'Check your internet connection',
	})

	const handleCloseManageSms = () => {
		setModalInfo(null)
		setVisible(false)
	}
	const handleManageSms = (item) => {
		setVisible(true)
		setModalInfo(item)
	}

	const handleSendSms = async (item) => {
		setUpdateSms(true)

		await SendSmsPatient(item).then((response) => {
			if (response) {
				GetAllSms().then((response) => {
					if (response) {
						setAllSms(response)
					}
				})
			}
		})
		setUpdateSms(false)
	}

	const handleSearchList = (item) => {
		const filter = item.target.value

		let filterList = isFilterList.filter((data) => {
			data.phone = data.phone.toLowerCase()
			data.name = data.name.toLowerCase()
			data.last = data.last.toLowerCase()
			return (
				data.phone.indexOf(filter) !== -1 ||
				data.name.indexOf(filter) !== -1 ||
				data.last.indexOf(filter) !== -1
			)
		})
		setAllSms(filterList)
	}

	useEffect(() => {
		if (window.innerWidth < 576) {
			setMobile(true)
		}

		GetAllSms(isGetAllSms).then((response) => {
			if (response) {
				setAllSms(response)
				setFilterList(response)
			}
		})
	}, [setAllSms])

	if (!isAllSms) {
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
				</Row>

				<Row className='est-general-list-users-list-main-title-container'>
					<Col md={2} lg={2} xl={2}>
						<h3 className='est-general-list-users-list-main-title'>Status</h3>
					</Col>
					<Col md={2} lg={2} xl={2}>
						<h3 className='est-general-list-users-list-main-title'>Id</h3>
					</Col>
					<Col md={6} lg={6} xl={6}>
						<h3 className='est-general-list-users-list-main-title'>Name</h3>
					</Col>
					<Col md={3} lg={3} xl={3}>
						<h3 className='est-general-list-users-list-main-title'>Date</h3>
					</Col>
					<Col md={3} lg={3} xl={3}>
						<h3 className='est-general-list-users-list-main-title'>Phone</h3>
					</Col>
					<Col md={5} lg={5} xl={5}>
						<h3 className='est-general-list-users-list-main-title'>Actions</h3>
					</Col>
				</Row>
				<div className='est-general-list-users-list-main-container'>
					{isAllSms.map((item, index) => (
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
											item.status !== 'failed'
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
										Id:
									</span>
									{item.sid}
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
										Name:
									</span>
									{item.name} {item.last}
								</h4>
							</Col>

							<Col
								className='est-general-list-users-list-text-container'
								xs={24}
								sm={24}
								md={4}
								lg={4}
								xl={4}>
								<h4 className='est-general-list-users-title'>
									<span className='est-general-list-users-list-main-title-responsive'>
										Date:
									</span>
									{item.date_creation}
								</h4>
							</Col>
							<Col
								className='est-general-list-users-list-text-container'
								xs={24}
								sm={24}
								md={4}
								lg={4}
								xl={4}>
								<h4 className='est-general-list-users-title'>
									<span className='est-general-list-users-list-main-title-responsive'>
										Phone:
									</span>
									{item.phone}
								</h4>
							</Col>

							<Col
								xs={24}
								sm={24}
								md={2}
								lg={2}
								xl={2}
								className='est-general-list-users-list-text-container'>
								<h4 className='est-general-list-users-title'>
									<span className='est-general-list-users-list-main-title-responsive'>
										Actions:
									</span>
									<Row className='est-users-manage-list-button-container'>
										{item.status === 'failed' && (
											<Col>
												<Popconfirm
													placement='top'
													title='Do you want to forward the message?'
													onConfirm={() => handleSendSms(item)}
													okText='Yes'
													cancelText='No'>
													<Button
														loading={isUpdateSms}
														icon={<SendOutlined />}
														className='est-users-manage-list-button-disable-user-button'></Button>
												</Popconfirm>
											</Col>
										)}
										<Col>
											<Button
												loading={isUpdateSms}
												icon={<FileProtectOutlined />}
												className='est-users-manage-list-button-disable-user-button'
												onClick={() => handleManageSms(item)}></Button>
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
					title={'Manage Sms'}
					visible={isVisible}
					onCancel={() => handleCloseManageSms()}
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
								md={24}
								lg={24}
								xl={24}
								className='est-manage-users-modal-main-container'>
								<div
									className={`${
										isModalInfo.modo !== 'directo'
											? 'est-manage-users-modal-direct-title-container'
											: ''
									} est-manage-users-modal-title-container`}>
									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											Sid Twilio:
										</span>{' '}
										{isModalInfo.sid}
									</h4>

									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											Name:
										</span>{' '}
										{isModalInfo.name} {isModalInfo.last}
									</h4>
									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											Creation date:
										</span>{' '}
										{isModalInfo.date_creation}
									</h4>

									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											Body:
										</span>{' '}
										{isModalInfo.message}
									</h4>

									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											Account status:
										</span>{' '}
										{isModalInfo.status === 'failed' ? `Failed` : `Delivered`}
									</h4>
								</div>
							</Col>
							<Col span={12} className='est-login-form-upload-photo-container'>
								<div className='est-profile-edit-modal-image-text-container'>
									{isModalInfo.url_photo_doctor && (
										<>
											<h4 className='est-profile-edit-modal-image-text'>
												Doctor photo:
											</h4>
											<div className='est-profile-edit-modal-image-container'>
												<Image
													classImg={'est-profile-edit-modal-image'}
													image={isModalInfo.url_photo_doctor}
													alt={'Imagen Doctor'}
													title={'Imagen Doctor'}
												/>
											</div>
										</>
									)}
								</div>
							</Col>
						</Row>
					)}
					<div className='est-manage-users-modal-button-container'>
						<Button
							className='est-manage-users-modal-button'
							onClick={() => handleCloseManageSms()}>
							Close
						</Button>
					</div>
				</Modal>
			</>
		)
}
export default SmsInfo
