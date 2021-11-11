/** @format */
import React, { useState } from 'react'

import { setGlobal, useGlobal } from 'reactn'

import { Modal, Form, Button, notification, Row, Col } from 'antd'

import { EditOutlined } from '@ant-design/icons'

import Input from '../../../../../../components/Inputs/Normal'

import { ENV_CORE } from '../../../../../../components/Enviroment'

import { GetAllInsurance } from '../../services'

import InsuranceUpdate from './services'

import './style.css'

export default function ModalLoginUser(props) {
	const [form] = Form.useForm()
	const [isModalInsu, setModalInsu] = useState(false)
	const [isLoading] = useGlobal('LoadingButtonProfile')

	const handleModalEditInsu = () => {
		if (isModalInsu) {
			setModalInsu(false)
		} else {
			setModalInsu(true)
		}
	}

	const handleEditInsu = async (item) => {
		setGlobal({ LoadingButtonProfile: true })

		await InsuranceUpdate(item).then((response) => {
			if (response) {
				GetAllInsurance().then((responseInsurance) => {
					setGlobal({
						allInsu: responseInsurance,
					})
				})
			}
		})
		setGlobal({ LoadingButtonProfile: false })
		setModalInsu(false)
	}
	return (
		<>
			<Button
				className='est-auth-edit-general-profile-button'
				onClick={() => handleModalEditInsu()}>
				<EditOutlined />
			</Button>
			<Modal
				forceRender
				wrapClassName='est-user-modal-container'
				maskClosable={true}
				width='700px'
				centered
				visible={isModalInsu}
				onCancel={() => handleModalEditInsu()}
				okText='Confirmar'
				cancelButtonProps={{ style: { display: 'none' } }}
				okButtonProps={{ style: { display: 'none' } }}>
				<h3 className='est-auth-edit-profile-modal-title'>
					Edit Insurance data
				</h3>
				{props.item && (
					<Form
						form={form}
						initialValues={{
							updId: props.item.id,
							updName: props.item.name,
						}}
						name='user_edit'
						onFinish={handleEditInsu}>
						<div className='est-auth-login-form-container'>
							<Row>
								<Col span={5} className='est-login-form-text-container'>
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
								<Col span={19} className='est-login-form-text-container'>
									<h4 className='est-login-form-text'>Name</h4>
									<Input
										className={'est-auth-login-field-input'}
										inputName={'updName'}
										inputNameLabel={'Name'}
										inputNameRule={true}
										inputNameMessage={'Name is required.'}
										inputNameType={'text'}
										inputNameIcon={''}
										inputNameRules={'rulesName'}
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
				)}
			</Modal>
		</>
	)
}
