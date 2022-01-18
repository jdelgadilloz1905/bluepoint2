/** @format */

import React, { useEffect, useState } from 'react'

import Logo from '../../assets/navi-logo-animation.gif'

import './style.css'

export default function Gif() {
	const [isMobile, setMobile] = useState(false)

	useEffect(() => {
		if (window.innerWidth < 769) {
			setMobile(true)
		}
	}, [])
	return (
		<>
			{isMobile && (
				<div className='est-gif-container'>
					<img className='est-mobil-gif-image' src={Logo} alt='loading...' />
				</div>
			)}
			{!isMobile && (
				<div className='est-gif-container'>
					<img src={Logo} alt='loading...' />
				</div>
			)}
		</>
	)
}
