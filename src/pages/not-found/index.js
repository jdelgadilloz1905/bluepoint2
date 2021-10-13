/** @format */

import React from 'react'

import { Link } from 'react-router-dom'

import { ExclamationCircleOutlined } from '@ant-design/icons'

import './style.css'

export default function PageNotFound() {
	return (
		<div className='est-not-found-global-container'>
			<div className='est-not-found-main-container'>
				<h3 className='est-not-found-icon'>
					<ExclamationCircleOutlined />
				</h3>
				<h3 className='est-not-found-title'>¡We're sorry!</h3>
				<h3 className='est-not-found-subtitle'>Page not found</h3>

				<div className='est-not-found-button-container'>
					<Link to='/' className='est-not-found-button'>
						Return
					</Link>
				</div>
			</div>
		</div>
	)
}
