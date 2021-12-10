/** @format */

import React, { useEffect, useState } from 'react'

import { setGlobal, useGlobal } from 'reactn'

import {
	Row,
	Col,
	Button,
	Modal,
	Form,
	Input,
	Divider,
	Comment,
	Select,
	notification,
	Upload,
	message,
	Spin,
} from 'antd'

import { UploadOutlined } from '@ant-design/icons'

import { OutTable, ExcelRenderer } from 'react-excel-renderer'

import { PoweroffOutlined } from '@ant-design/icons'

import InputNormal from '../../../../components/Inputs/Normal'

import Loading from '../../../../components/Loading'
import Image from '../../../../components/Image'

import ModalEditUser from './components/ModalEditUser'
import ModalCreateUser from './components/ModalCreateUser'
import ModalEditInsurance from './components/ModalEditInsurance'

import './style.css'

import {
	GetAllUsers,
	ActivateUser,
	UpdatePassword,
	SearchInsuranceDetail,
	getAllClients,
	postRegisterLoteUsers,
	SendSmsPatients,
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
	const [isInsuDetail, setInsuDetail] = useState(null)
	const [isSelectClient, setSelectClient] = useState(null) //seguro seleccionado
	const [isClients, setIsClients] = useState(null)
	const [file, setFile] = useState(null)
	const [isLoadingButtonProfile, setLoadingButtonProfile] = useState(false)
	const { Option } = Select

	const [isGetAllUsers] = useState({
		service_global_description: 'Check your internet connection',
	})

	const loadingSpin = () => {
		if (isLoadingButtonProfile) {
			return (
				<Modal
					wrapClassName='est-upload-image-camera-modal'
					visible={isLoadingButtonProfile}
					title=''
					footer={null}
					onCancel={() => setLoadingButtonProfile(false)}>
					{isLoadingButtonProfile && <Spin tip='Processing image...'></Spin>}
				</Modal>
			)
		}
	}

	const handleManageUser = (item) => {
		//buscar los datos del seguro :)
		//findInsuranceUser(item)
		setVisible(true)
		setModalInfo(item)
	}

	const findInsuranceUser = (item) => {
		SearchInsuranceDetail(item).then((response) => {
			if (response) {
				setInsuDetail(response)
			}
		})
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
				GetAllUsers(isGetAllUsers).then((response) => {
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
			data.name = data.name.toLowerCase()
			data.last = data.last.toLowerCase()
			return (
				data.name.indexOf(filter) !== -1 || data.last.indexOf(filter) !== -1
			)
		})

		setAllUsers(filterList)
	}
	const handleChangeOption = (value) => {
		const filter = value

		let filterList = isFilterList.filter((data) => {
			//data.client.id = data.client.id
			//return data.client.id.indexOf(filter) !== -1
			return data.client.id === filter
		})

		setAllUsers(filterList)
	}

	const handleSendSMS = (fileList) => {
		setLoadingButtonProfile(true)
		let fileObj = fileList
		if (!fileObj) {
			notification['error']({
				message: `Error`,
				description: `No file uploaded! `,
			})
			return
		}

		if (
			!(
				fileObj.type === 'application/vnd.ms-excel' ||
				fileObj.type ===
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			)
		) {
			notification['error']({
				message: `Error`,
				description: `Unknown file format. Only Excel files are uploaded! `,
			})
			return
		}

		ExcelRenderer(fileObj, (err, resp) => {
			if (err) {
				console.log(err)
			} else {
				let newRows = []
				resp.rows.slice(1).map((row, index) => {
					if (row && row !== 'undefined') {
						newRows.push({
							key: index,
							id_client: row[0],
							phone: row[1],
							photo: row[2],
							quote: row[3],
							message: row[4],
						})
					}
				})
				if (newRows.length === 0) {
					notification['error']({
						message: `Error`,
						description: `No data found in file! `,
					})
					return
				} else {
					SendSmsPatients(newRows).then((response) => {
						if (response) {
							//llevarlo al layout de sms y que aparezca los mensajes enviados y validar si tienen actualziacion para cambiarlo en base de datos
							//filtrar lo del dia actual
							console.log(response)
						}
					})
				}
			}
		})

		setLoadingButtonProfile(false)
	}

	const handleArchivePreview = async (fileList) => {
		let fileObj = fileList
		if (!fileObj) {
			notification['error']({
				message: `Error`,
				description: `No file uploaded! `,
			})
			return
		}

		if (
			!(
				fileObj.type === 'application/vnd.ms-excel' ||
				fileObj.type ===
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			)
		) {
			notification['error']({
				message: `Error`,
				description: `Unknown file format. Only Excel files are uploaded! `,
			})
			return
		}

		ExcelRenderer(fileObj, (err, resp) => {
			if (err) {
				console.log(err)
			} else {
				let newRows = []
				resp.rows.slice(1).map((row, index) => {
					if (row && row !== 'undefined') {
						newRows.push({
							key: index,
							id_client: row[0],
							email: row[1],
							name: row[2],
							last: row[3],
							phone: row[4],
							photo: row[5],
							message: row[6],
						})
					}
				})
				if (newRows.length === 0) {
					notification['error']({
						message: `Error`,
						description: `No data found in file! `,
					})
					return
				} else {
					postRegisterLoteUsers(newRows).then((response) => {
						if (response) {
							GetAllUsers(isGetAllUsers).then((response) => {
								if (response) {
									setAllUsers(response)
								}
							})
						}
					})
					console.log('Rows ', newRows)
				}
			}
		})
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
		getAllClients().then((response) => {
			setIsClients(response)
		})
	}, [setAllUsers])

	if (!isAllUsers) {
		return <Loading />
	} else
		return (
			<>
				{loadingSpin()}
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
						sm={6}
						md={6}
						lg={6}
						xl={6}
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
						sm={5}
						md={5}
						lg={5}
						xl={5}
						className='est-general-list-users-banner-select-container'>
						{isClients && (
							<Select
								placeholder='Select a client'
								style={{ width: 200 }}
								onChange={handleChangeOption}>
								{isClients.map((item, index) => (
									<Option value={item.id} key={index}>
										{item.name}
									</Option>
								))}
							</Select>
						)}
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
				<Row className='est-general-list-users-banner-container'>
					<Col
						xs={24}
						sm={2}
						md={2}
						lg={2}
						xl={2}
						className='est-general-list-users-banner-select-container'>
						<Upload
							action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
							name='file'
							multiple={false}
							status='success'
							className='est-general-list-users-banner-search'
							listType='picture'
							beforeUpload={handleArchivePreview}>
							<Button icon={<UploadOutlined />}>Upload Patients</Button>
						</Upload>
					</Col>
					<Col
						xs={24}
						sm={2}
						md={2}
						lg={20}
						xl={20}
						className='est-general-list-users-banner-select-container'>
						<Upload
							action='//jsonplaceholder.typicode.com/posts/'
							name='file'
							multiple={false}
							status='success'
							className='est-general-list-users-banner-search'
							listType='picture'
							beforeUpload={handleSendSMS}>
							<Button icon={<UploadOutlined />}>Send SMS</Button>
						</Upload>
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
						<h3 className='est-general-list-users-list-main-title'>Phone</h3>
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
											item.state === '1'
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
									{item.name} {item.last}
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
										Phone:
									</span>
									{item.phone}
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
											<ModalEditInsurance item={item} />
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
										{isModalInfo.date_creation}
									</h4>
									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											Type of login:
										</span>{' '}
										{isModalInfo.modo}
									</h4>
									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											Client:
										</span>{' '}
										{isModalInfo.client.name}
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
										{isModalInfo.phone}
									</h4>
									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											Last login:
										</span>{' '}
										{isModalInfo.last_login}
									</h4>
								</div>
							</Col>

							{isModalInfo.modo === 'directo' && (
								<Col
									xs={24}
									sm={24}
									md={12}
									lg={12}
									xl={12}
									className='est-manage-users-modal-password-global-container'>
									<div className='est-manage-users-modal-password-main-container'>
										<h4 className='est-manage-users-modal-password-title'>
											Change password
										</h4>
										<Form
											form={update_password}
											name='user_update_password'
											onFinish={handleUpdatePassWord}>
											<InputNormal
												className={'est-manage-users-modal-password-input'}
												inputName={'regPassword'}
												inputNameLabel={'Password'}
												inputNameRule={true}
												inputNameMessage={'Enter your password'}
												inputNameType={'password'}
												inputNameIcon={''}
												inputNameRules={'rulesPasswordEN'}
											/>
											<InputNormal
												className={'est-manage-users-modal-password-input'}
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
											<Button
												className='est-manage-users-modal-password-button'
												htmlType={'submit'}
												loading={isLoading}>
												Change password
											</Button>
										</Form>
									</div>
								</Col>
							)}
							<Divider>Insurance Detail</Divider>
							<Col
								xs={24}
								sm={24}
								md={isModalInfo.modo === 'directo' ? 12 : 24}
								lg={isModalInfo.modo === 'directo' ? 12 : 24}
								xl={isModalInfo.modo === 'directo' ? 12 : 24}
								className='est-manage-users-modal-main-container'>
								<div
									className={`${
										isModalInfo.modo !== 'directo'
											? 'est-manage-users-modal-direct-title-container'
											: ''
									} est-manage-users-modal-title-container`}>
									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											Insurance:
										</span>{' '}
										{isModalInfo.name_insurance === 'null'
											? isModalInfo.name_insurance
											: 'does not have insurance assigned'}
									</h4>

									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											ID insurance:
										</span>{' '}
										{isModalInfo.id_register}
									</h4>

									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											URL:
										</span>{' '}
										{isModalInfo.url}
									</h4>

									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											Card information:
										</span>{' '}
										<Comment content={<p>{isModalInfo.info_card}</p>} />
									</h4>
								</div>
							</Col>
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
