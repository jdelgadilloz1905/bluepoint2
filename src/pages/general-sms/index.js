/** @format */

import React, { useEffect, useState } from 'react'

import { setGlobal, useGlobal } from 'reactn'

import MainMenu from '../../components/MainMenu'

import HeadDescription from '../../components/HeadDescription'
import Loading from '../../components/Loading'

import { GetUserInfo } from '../../components/Hooks/Functions/GetUserInfo'

import SmsInfo from './components/SmsInfo'

import './style.css'

const GeneralSms = () => {
	const [isUser] = useState(JSON.parse(localStorage.getItem('userSession')))
	const [isDataProfile] = useGlobal('DataProfile')

	useEffect(() => {
		GetUserInfo(isUser.id).then((response) => {
			if (response) {
				setGlobal({
					DataProfile: response,
				})
			} else {
				setTimeout(() => {
					window.location.pathname = '/'
				}, 5000)
			}
		})
	}, [isUser.id])

	if (!isDataProfile) {
		return <Loading />
	} else {
		return (
			<>
				<HeadDescription
					title={`MANAGE SMS - ${isUser.id}`}
					name={'description'}
					content={'Camping Site'}
				/>

				<div className='est-prujula-detail-profile-global-container'>
					<div className='est-prujula-main-container'>
						<div className='est-prujula-detail-profile-main-title-container'>
							<h2 className='est-prujula-detail-profile-main-title'>
								MANAGE SMS
							</h2>
						</div>

						<div className='est-profile-global-container'>
							<div className='est-main-menu-global-container'>
								<MainMenu user={isDataProfile} />
							</div>
							<div className='est-profile-info-container'>
								<SmsInfo />
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}
export default GeneralSms
