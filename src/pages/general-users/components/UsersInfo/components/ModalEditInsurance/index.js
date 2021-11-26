/** @format */
import React, { useState } from 'react'

import { setGlobal, useGlobal } from 'reactn'

import { Modal, Form, Button, notification, Row, Col, Select } from 'antd'

import { FileProtectOutlined } from '@ant-design/icons'

import Input from '../../../../../../components/Inputs/Normal'
import Image from '../../../../../../components/Image'
import InputMask from '../../../../../../components/Inputs/InputMask'

import { ENV_CORE } from '../../../../../../components/Enviroment'

import { rulesValidationMask } from '../../../../../../components/Inputs/InputMask/rules'

import Uploadphoto from './components/UploadPhoto'

import {
	GetAllUsers,
	SearchInsuranceDetail,
	getAllInsurence,
} from '../../services'

import ProfileUpdateInsurance from './services'

import './style.css'

export default function ModaluserInsurance(props) {
	const [form] = Form.useForm()
	// const { Option } = Select
	const [isModalUser, setModalUser] = useState(false)
	const [isNewPhoto, setNewPhoto] = useState(null)
	const [isLoading] = useGlobal('LoadingButtonProfile')
	const [isInsuranceDetail, setInsuranceDetail] = useState(null) //todos los seguros
	const [isInsurance, setInsurance] = useState(null) //Datos del seguro del paciente
	const [isSelectInsurance, setSelectInsurance] = useState(null) //seguro seleccionado
	const { Option } = Select

	const handleModalEditUser = async () => {
		getAllInsurence().then((response) => {
			if (response) {
				setInsurance(response)
			}
		})
		// SearchInsuranceDetail(props.item).then((response) => {
		// 	if (response) {
		// 		setInsuranceDetail(response)
		// 	}
		// })

		if (isModalUser) {
			setModalUser(false)
		} else {
			setModalUser(true)
		}
	}

	const handleEditUser = async (item) => {
		console.log('datos a actualizar ', item)
		setGlobal({ LoadingButtonProfile: true })

		await ProfileUpdateInsurance(item).then((response) => {
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

	const handleChangeOption = (value) => {
		setSelectInsurance(value)
	}

	return (
		<>
			<Button
				className='est-auth-edit-general-profile-button'
				onClick={() => handleModalEditUser()}>
				<FileProtectOutlined />
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
					Edit insurance data
				</h3>
				{props.item && (
					<Form
						form={form}
						initialValues={{
							updId: props.item.id,
							updName: props.item.name,
							updLast: props.item.last,
							updIdInsurance:
								props.item.codigo_insurance_user !== null
									? props.item.codigo_insurance_user
									: '',
							updUrl: props.item.url !== null ? props.item.url : '',
							updIdRegiter:
								props.item.id_register !== null ? props.item.id_register : '',
							insurance: props.item.id_insurance,
						}}
						name='user_edit'
						onFinish={handleEditUser}>
						<div className='est-auth-login-form-container'>
							<Row>
								<Col span={4} className='est-login-form-text-container'>
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
								<Col span={10} className='est-login-form-text-container'>
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
										disabled={true}
									/>
								</Col>
								<Col span={10} className='est-login-form-text-container'>
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
										disabled={true}
									/>
								</Col>
								<Col span={12} className='est-login-form-text-container'>
									<h4 className='est-login-form-text'>Card number</h4>
									<Input
										className={'est-auth-login-field-input'}
										inputName={'updIdInsurance'}
										inputNameLabel={'ID Insurance'}
										inputNameRule={true}
										inputNameMessage={'ID is required.'}
										inputNameType={'text'}
										inputNameIcon={''}
										inputNameRules={'rulesLastNameEN'}
									/>
								</Col>
								<Col span={12} className='est-login-form-text-container'>
									<h4 className='est-login-form-text'>URL</h4>
									<Input
										className={'est-auth-login-field-input'}
										inputName={'updUrl'}
										inputNameLabel={'URL'}
										inputNameRule={true}
										inputNameMessage={'Url is required.'}
										inputNameType={'text'}
										inputNameIcon={''}
										inputNameRules={'rulesLastNameEN'}
									/>
								</Col>

								<Col span={24} className='est-login-form-text-container'>
									{isInsurance && (
										<div className='est-create-user-modal-selector'>
											<h4 className='est-login-form-text'>Select insurance</h4>
											<Form.Item
												name='insurance'
												rules={[
													{
														required: true,
													},
												]}>
												<Select onChange={handleChangeOption}>
													{isInsurance.map((item, index) => (
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
									<div className='est-profile-edit-modal-image-text-container'>
										{props.item.image && (
											<>
												<h4 className='est-profile-edit-modal-image-text'>
													Current Card picture:
												</h4>
												<div className='est-profile-edit-modal-image-container'>
													<Image
														classImg={'est-profile-edit-modal-image'}
														image={props.item.image}
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
