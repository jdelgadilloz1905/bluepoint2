/** @format */

import React from 'react'

import Spin from 'antd/lib/spin'
import { LoadingOutlined } from '@ant-design/icons'

import './style.css'

export default function Loading() {
	return (
		<div className='est-loading-container'>
			<Spin
				indicator={<LoadingOutlined className='est-loading-image' />}
				className='est-loading-icon'
			/>
		</div>
	)
}
