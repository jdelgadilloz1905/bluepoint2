/** @format */

import React, { useState, useEffect } from 'react'

import { useGlobal, setGlobal } from 'reactn'

import HeadDescription from '../../components/HeadDescription'
import Loading from '../../components/Loading'

import MainMenu from '../../components/MainMenu'

import { ProfileDetail } from './services'

import ProfileInfo from '../profile/components/ProfileInfo'

import './style.css'

export default function Profile() {
	const [isUser] = useState(JSON.parse(localStorage.getItem('userSession')))
	const [isDataProfile] = useGlobal('DataProfile')
	useEffect(() => {
		ProfileDetail(isUser.id).then((response) => {
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
					title={`PERSONAL INFORMATION - ${isUser.id}`}
					name={'description'}
					content={'Profile User'}
				/>

				<div className='est-prujula-detail-profile-global-container'>
					<div className='est-prujula-main-container'>
						<div className='est-prujula-detail-profile-main-title-container'>
							<h2 className='est-prujula-detail-profile-main-title'>
								PERSONAL INFORMATION
							</h2>
						</div>

						<div className='est-profile-global-container'>
							<div className='est-profile-aside-container'>
								<MainMenu user={isDataProfile} />
							</div>

							<div className='est-profile-info-container'>
								<ProfileInfo isUserProfileInfo={isDataProfile} />
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}
