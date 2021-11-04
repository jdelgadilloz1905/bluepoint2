/** @format */

import React, { useEffect, useState } from 'react'

import axios from 'axios'

import Upload from 'antd/lib/upload'
import Modal from 'antd/lib/modal'
import Progress from 'antd/lib/progress'
import message from 'antd/lib/message'
//import Button from 'antd/lib/button'
import Spin from 'antd/lib/spin'

import Card from 'antd/lib/card'

import { Form, Select } from 'antd'

import { CameraOutlined } from '@ant-design/icons'

import {
	ENV_CORE,
	ENV_KEY_GOOGLE_VISION,
	ENV_UPLOAD_IMAGE,
} from '../../components/Enviroment'
import HeadDescription from '../../components/HeadDescription'

import servicesCamera from './services'

import './style.css'

export default function App(props) {
	const [isFileList, setFileList] = useState([])
	const [isPreviewModal, setPreviewModal] = useState(false)
	const [isPreviewImg, setPreviewImg] = useState('')
	const [isProgress, setProgress] = useState(0)
	const [isLoadingButtonProfile, setLoadingButtonProfile] = useState(false)
	const [isTexto, setTexto] = useState('')
	const [isInsurance, setInsurance] = useState(null) //todos los seguros
	const [isDatosuser, setDatosUser] = useState(null) //datos del paciente
	const [isSelectInsurance, setSelectInsurance] = useState(null) //seguro seleccionado
	const [isPosition, setPosition] = useState(null)
	const { Option } = Select

	//const { Dragger } = Upload
	useEffect(() => {
		servicesCamera.getAllInsurence().then((response) => {
			if (response) {
				setInsurance(response)
			}
		})

		servicesCamera.getDatosPatient(props.match.params.id).then((response) => {
			if (response) {
				setDatosUser(response)
			} else {
				window.location.href = '/'
			}
		})
	}, [])

	const handleOnChangeImage = ({ fileList }) => {
		setFileList(fileList)
	}

	const handleImageDelete = async (item) => {
		//rops.deleteItemImage(item)
		message.success('successfully removed')
	}

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

	const handleUploadImage = async (options) => {
		const { onSuccess, onError, file, onProgress } = options
		const data = new FormData()
		data.append('imagen[]', file)
		const config = {
			headers: { 'Content-Type': 'multipart/form-data' },
			onUploadProgress: (event) => {
				const percent = Math.floor((event.loaded / event.total) * 100)
				setProgress(percent)
				if (percent === 100) {
					setTimeout(() => setProgress(0), 1000)
				}
				onProgress({ percent: (event.loaded / event.total) * 100 })
			},
		}
		try {
			//LOCAL
			// const response = await axios.post(
			// 	`${ENV_CORE}/api/patient/upload-image`,
			// 	data,
			// 	config
			// )
			//PRUEBA
			const response = await axios.post(
				`${ENV_UPLOAD_IMAGE}/api/products/upload-image`,
				data,
				config
			)
			if (response.data.statusCode === 200) {
				await submitToGoogle(response.data.imageInfo[0].file)
				onSuccess('Ok')
				message.success('Ok')
			} else {
				message.error('Error')
			}
		} catch (err) {
			onError({ err })
			message.error('Fail')
		}
	}

	const handlePreview = async (item) => {
		setPreviewModal(true)
		setPreviewImg(item.thumbUrl)
	}

	const submitToGoogle = async (url) => {
		console.log('envio los datos para la extraccion')
		try {
			setLoadingButtonProfile(true)
			let data = {
				requests: [
					{
						features: [
							{ type: 'LABEL_DETECTION', maxResults: 10 },
							{ type: 'LANDMARK_DETECTION', maxResults: 5 },
							{ type: 'FACE_DETECTION', maxResults: 5 },
							{ type: 'LOGO_DETECTION', maxResults: 5 },
							{ type: 'TEXT_DETECTION', maxResults: 5 },
							{ type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
							{ type: 'SAFE_SEARCH_DETECTION', maxResults: 5 },
							{ type: 'IMAGE_PROPERTIES', maxResults: 5 },
							{ type: 'CROP_HINTS', maxResults: 5 },
							{ type: 'WEB_DETECTION', maxResults: 5 },
						],
						image: {
							source: {
								imageUri: `${ENV_UPLOAD_IMAGE}/${url}`,
							},
						},
					},
				],
			}
			await axios({
				method: 'post',
				url:
					'https://vision.googleapis.com/v1/images:annotate?key=' +
					ENV_KEY_GOOGLE_VISION,
				data,
				config: {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				},
			}).then((r) => {
				const array = r.data.responses[0].textAnnotations
				//console.log('array ', r.data.responses[0].textAnnotations)
				/*=============================================
					DEPENDIENDO DE LA SELECCION DEL SEGURO BUSCA
					LA POSICION EXACTA PARA EXTRAER EL ID
					=============================================*/

				console.log('texto total ', array[0].description)
				setTexto(array[0].description)
				// for (let x = 1; x < array.length; x++) {
				// 	console.warn('resultado arriba ', array[x])
				// 	if (array[x].description.includes('-')) {
				// 		setTexto(array[x].description)
				// 		console.info('aqui pasa todo ')
				// 	}
				// }
			})

			setLoadingButtonProfile(false)
		} catch (error) {}
	}

	const handleChangeOption = (value) => {
		setSelectInsurance(value)
		let filterList = isInsurance.filter((data) => {
			data.id = data.id
			return data.id === value
			//return data.id.indexOf(value) !== -1
		})
		setPosition(filterList[0].position)
		// console.log('la posicion para extraer es ', filterList)
		// console.log('seleccionado ', value)
		console.log('seguros ', isInsurance)
	}

	return (
		<>
			<HeadDescription
				title={`BluePoint2 - ${isDatosuser ? isDatosuser.name : ''}`}
				name={'description'}
				content={'Insurance Site'}
			/>
			<div className='est-camera-info-container'>
				<p>{`Hello ${
					isDatosuser ? isDatosuser.name : ''
				}, please select the insurance and take a photo of the passport`}</p>

				<Card bordered={false} style={{ width: 300 }}>
					{loadingSpin()}
					{/* {isInsurance && (
						<Form>
							<h4 className='est-login-form-text'>Select insurance</h4>
							<div className='est-create-user-modal-selector'>
								<Form.Item name='insurance'>
									<Select onChange={handleChangeOption}>
										{isInsurance.map((item, index) => (
											<Option value={item.id} key={index}>
												{item.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</div>
						</Form>
					)} */}
					<div className='est-upload-image-camera-container'>
						<Upload
							accept='image/*'
							customRequest={handleUploadImage}
							onChange={handleOnChangeImage}
							onPreview={handlePreview}
							onRemove={handleImageDelete}
							listType='picture-card'
							className='image-upload-grid'>
							{isFileList.length >= 1 ? null : (
								<div className='est-upload-image-camera-text-global-container'>
									<div className='est-upload-image-camera-icon-container'>
										<span>
											<CameraOutlined />
										</span>
									</div>
								</div>
							)}
						</Upload>

						{isProgress > 0 ? <Progress percent={isProgress} /> : null}
						<Modal
							wrapClassName='est-upload-image-camera-modal-container'
							visible={isPreviewModal}
							title='Preview'
							footer={null}
							onCancel={() => setPreviewModal(false)}>
							{isPreviewImg && (
								<img
									alt='visionCloud'
									style={{ width: '100%' }}
									src={isPreviewImg}
								/>
							)}
						</Modal>
					</div>
				</Card>
				{isTexto !== '' ? `Insurance code :${isTexto}` : 'Extracted text'}
			</div>
		</>
	)
}
