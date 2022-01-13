/** @format */

import React from 'react'

import Logo from '../../assets/navi-logo-animation.gif'

import './style.css'

export default function Gif() {
	return (
		<div className='est-gif-container'>
			<img src={Logo} alt='loading...' />
		</div>
	)
}
