/** @format */

import React, { useEffect, useState } from 'react'

import { setGlobal, useGlobal } from 'reactn'

import MainMenu from '../../components/MainMenu'

import HeadDescription from '../../components/HeadDescription'
import Loading from '../../components/Loading'

import { GetUserInfo } from '../../components/Hooks/Functions/GetUserInfo'

import UsersInfo from './components/UsersInfo'

import './style.css'

const Generalusers = () => {
	const [isUser] = useState(JSON.parse(localStorage.getItem('userSession')))
	const [isDataProfile] = useGlobal('DataProfile')

	useEffect(() => {
		GetUserInfo(isUser.id).then((response) => {
			console.log('mis datos ', response)
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
					title={`MANAGE PATIENTS - ${isUser.id}`}
					name={'description'}
					content={'Camping Site'}
				/>
				{/* <MainNavigation
					title={'Manage patients'}
					linkPrevTitle={'Home'}
					linkNextTitle={'Manage patients'}
					linkPrev={'/'}
					linkNext={'/'}
				/> */}
				<div className='est-prujula-detail-profile-global-container'>
					<div className='est-prujula-main-container'>
						<div className='est-prujula-detail-profile-main-title-container'>
							<h2 className='est-prujula-detail-profile-main-title'>
								MANAGE PATIENTS
							</h2>
						</div>

						<div className='est-profile-global-container'>
							<div className='est-main-menu-global-container'>
								<MainMenu user={isDataProfile} />
							</div>
							<div className='est-profile-info-container'>
								<UsersInfo />
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}
export default Generalusers
