/** @format */

import React, { useState } from 'react'

import axios from 'axios'

import Upload from 'antd/lib/upload'
import Modal from 'antd/lib/modal'
import Progress from 'antd/lib/progress'
import message from 'antd/lib/message'
//import Button from 'antd/lib/button'
import Spin from 'antd/lib/spin'

import Card from 'antd/lib/card'

import { CameraOutlined } from '@ant-design/icons'

import { ENV_CORE, ENV_KEY_GOOGLE_VISION } from './Enviroment'

import './style.css'

export default function App() {
	const [isFileList, setFileList] = useState([])
	const [isPreviewModal, setPreviewModal] = useState(false)
	const [isPreviewImg, setPreviewImg] = useState('')
	const [isProgress, setProgress] = useState(0)
	const [isLoadingButtonProfile, setLoadingButtonProfile] = useState(false)
	const [isTexto, setTexto] = useState('')

	//const { Dragger } = Upload

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
					wrapClassName='est-upload-image-profile-modal'
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
			const response = await axios.post(
				`${ENV_CORE}/api/products/upload-image`,
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
								imageUri: `${ENV_CORE}/${url}`,
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
				//console.log(r)
				const array = r.data.responses[0].textAnnotations
				setTexto(array[0].description)
				/*for (let x = 1; x < array.length; x++) {
					console.warn('resultado arriba ', array[x])
					if (array[x].description.includes('-')) {
						setTexto(array[x].description)
						console.info('aqui pasa todo ')
					}
				}*/
			})

			setLoadingButtonProfile(false)
		} catch (error) {}
	}

	return (
		<div className='est-profile-info-container'>
			<Card bordered={false} style={{ width: 300 }}>
				{loadingSpin()}
				<div className='est-upload-image-profile-container'>
					<Upload
						accept='image/*'
						customRequest={handleUploadImage}
						onChange={handleOnChangeImage}
						onPreview={handlePreview}
						onRemove={handleImageDelete}
						listType='picture-card'
						className='image-upload-grid'>
						{isFileList.length >= 1 ? null : (
							<div className='est-upload-image-profile-text-global-container'>
								<div className='est-upload-image-profile-icon-container'>
									<span>
										<CameraOutlined />
									</span>
								</div>
							</div>
						)}
					</Upload>

					{isProgress > 0 ? <Progress percent={isProgress} /> : null}
					<Modal
						wrapClassName='est-upload-image-profile-modal-container'
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
			{isTexto !== '' ? `${isTexto}` : 'Extracted text'}
		</div>
	)
}
