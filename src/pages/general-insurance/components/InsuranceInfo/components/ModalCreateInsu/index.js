/** @format */

import React, { useState } from 'react'

import { setGlobal } from 'reactn'

import { Row, Col, Button, Modal, Form } from 'antd'

import Input from '../../../../../../components/Inputs/Normal'
import InputMask from '../../../../../../components/Inputs/InputMask'

import { rulesValidation } from '../../../../../../components/Inputs/Normal/rules'
import { rulesValidationMask } from '../../../../../../components/Inputs/InputMask/rules'

import { GetAllInsurance } from '../../services'

import CreateInsuService from './services'

import './style.css'

const CreateInsu = () => {
	const [form] = Form.useForm()

	const [isVisible, setVisible] = useState(false)
	const [isLoading, setLoading] = useState(false)

	const handleCreateInsu = async (item) => {
		delete item.confirm
		setLoading(true)

		await CreateInsuService(item).then((response) => {
			if (response) {
				GetAllInsurance().then((responseInsu) => {
					setGlobal({
						allInsu: responseInsu,
					})
					form.resetFields()
				})
			}
		})
		setLoading(false)
		setVisible(false)
	}

	return (
		<>
			<Button
				className='est-general-list-create-users-button'
				type='primary'
				onClick={() => setVisible(true)}>
				Create insurance
			</Button>
			<Modal
				forceRender
				wrapClassName='est-user-modal-container'
				maskClosable={false}
				width='700px'
				centered
				visible={isVisible}
				onCancel={() => setVisible()}
				okText='Confirmar'
				cancelButtonProps={{ style: { display: 'none' } }}
				okButtonProps={{ style: { display: 'none' } }}>
				<h3 className='est-auth-edit-profile-modal-title'>Create insurance</h3>

				<Form form={form} name='user_create' onFinish={handleCreateInsu}>
					<div className='est-auth-login-form-container'>
						<Row>
							<Col span={24} className='est-login-form-text-container'>
								<h4 className='est-login-form-text'>Name</h4>
								<Input
									className={'est-auth-login-field-input'}
									inputName={'regName'}
									inputNameLabel={'Name'}
									inputNameRule={true}
									inputNameMessage={'Name ir required.'}
									inputNameType={'text'}
									inputNameIcon={''}
									inputNameRules={'rulesFirstNameEN'}
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
			</Modal>
		</>
	)
}
export default CreateInsu
