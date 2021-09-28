/** @format */

import React, { useEffect, useState } from 'react'
import { Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

import './App.css'

export default function App() {
	const [loading, setLoading] = useState(false)
	const [imageUrl, setImageUrl] = useState(false)

	const beforeUpload = () => {
		message.error('Image must smaller than 2MB!')
	}

	const handleChange = () => {
		message.error('You can only upload JPG/PNG file!')
	}

	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	)
	return (
		<div className='App'>
			<header className='App-header'>
				<Upload
					name='avatar'
					listType='picture-card'
					className='avatar-uploader'
					showUploadList={false}
					action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
					beforeUpload={beforeUpload}
					onChange={handleChange}>
					{imageUrl ? (
						<img src={imageUrl} alt='avatar' style={{ width: '100%' }} />
					) : (
						uploadButton
					)}
				</Upload>
			</header>
		</div>
	)
}
