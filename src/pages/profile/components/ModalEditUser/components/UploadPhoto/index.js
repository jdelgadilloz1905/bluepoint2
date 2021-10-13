/** @format */

import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { setGlobal } from 'reactn'

import axios from 'axios'

import Upload from 'antd/lib/upload'
import Modal from 'antd/lib/modal'
import Progress from 'antd/lib/progress'
import message from 'antd/lib/message'

import { UserAddOutlined } from '@ant-design/icons'

import { ENV_CORE } from '../../../../../../../../components/Common/Hooks/Variables/Enviroment'

import './style.css'

export default function UploadImageProfile(props) {
	const { t } = useTranslation()
	const [isPreviewModal, setPreviewModal] = useState(false)
	const [isFileList, setFileList] = useState([])
	const [isPreviewImg, setPreviewImg] = useState('')
	const [isProgress, setProgress] = useState(0)

	const handleOnChangeImage = ({ fileList }) => {
		setFileList(fileList)
	}

	const handleImageDelete = async (item) => {
		props.deleteItemImage(item)
	}

	const handleUploadImage = async (options) => {
		setGlobal({ LoadingButtonProfile: true })
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
			const response = await axios.post(`${ENV_CORE}/api/upload/upload-image`, data, config)
			if (response.data.statusCode === 200) {
				props.addItemImage(response.data.imageInfo[0])
				onSuccess('Ok')
				message.success(t('profile.user_data.modal_edit_user.upload_photo.message_success'))
			} else {
				message.error(t('profile.user_data.modal_edit_user.upload_photo.message_fail'))
			}
		} catch (err) {
			onError({ err })
			message.error(t('profile.user_data.modal_edit_user.upload_photo.message_fail'))
		}
		setGlobal({ LoadingButtonProfile: false })
	}

	const handlePreview = async (item) => {
		setPreviewModal(true)
		setPreviewImg(item.thumbUrl)
	}

	return (
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
						<div className='est-upload-image-profile-text-container'>
							<h3 className='est-upload-image-profile-text-one'>
								{t('profile.user_data.modal_edit_user.upload_photo.placeholder_title')}{' '}
								{props.title}
							</h3>
							<h2 className='est-upload-image-profile-text-two'>
								{t('profile.user_data.modal_edit_user.upload_photo.placeholder_subtitle')}{' '}
								300x300
							</h2>
						</div>
						<div className='est-upload-image-profile-icon-container'>
							<span>
								<UserAddOutlined />
							</span>
						</div>
					</div>
				)}
			</Upload>
			{isProgress > 0 ? <Progress percent={isProgress} /> : null}
			<Modal
				wrapClassName='est-upload-image-profile-modal-container'
				visible={isPreviewModal}
				title={t('profile.user_data.modal_edit_user.upload_photo.modal_title')}
				footer={null}
				onCancel={() => setPreviewModal(false)}>
				{isPreviewImg && <img alt='example' style={{ width: '100%' }} src={isPreviewImg} />}
			</Modal>
		</div>
	)
}
