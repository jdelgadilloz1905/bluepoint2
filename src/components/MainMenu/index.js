/** @format */

import React, { useState, useEffect } from 'react'

import { useGlobal, setGlobal } from 'reactn'

import { Link, useLocation } from 'react-router-dom'

import Drawer from 'antd/lib/drawer'
import Button from 'antd/lib/button'
import Menu from 'antd/lib/menu'

import {
	SafetyOutlined,
	TeamOutlined,
	UserOutlined,
	CommentOutlined,
} from '@ant-design/icons'

import Image from '../Image'
import ProfileImg from '../../img/detail/profile-example.png'

import './style.css'

export default function MainMenu(props) {
	let location = useLocation()
	const [current, setCurrent] = useState(
		location.pathname === '/' || location.pathname === ''
			? '/dashboard'
			: location.pathname
	)

	const [isCollapse, setCollapse] = useState(false)
	const [isVisible, setVisible] = useGlobal('useDrawer')

	const toggleCollapsed = () => {
		if (isCollapse) {
			setCollapse(false)
		} else {
			setCollapse(true)
		}
	}

	const onClose = () => {
		setVisible(false)
	}

	useEffect(() => {
		if (location) {
			if (current !== location.pathname) {
				setCurrent(location.pathname)
			}
		}
	}, [location, current])

	return (
		<>
			<div className='est-main-menu-collapse-container'>
				<Button
					type='primary'
					onClick={() => toggleCollapsed()}
					className={`${
						isCollapse ? '' : 'est-main-menu-button-shown'
					} est-main-menu-button`}>
					Menu
				</Button>
				<Menu
					selectedKeys={[current]}
					mode='inline'
					inlineCollapsed={isCollapse}>
					<Menu.Item
						key='/profile-image'
						className='est-detail-profile-name-img'>
						<div className='est-profile-img-container'>
							{props.user.photo ? (
								<Image
									classImg={`${
										isCollapse
											? 'est-profile-img-unshown'
											: 'est-profile-img-shown'
									} est-profile-img`}
									image={props.user.photo}
									alt={'Profile photo'}
									title={'Profile photo'}
								/>
							) : (
								<Image
									classImg={`${
										isCollapse
											? 'est-profile-img-unshown'
											: 'est-profile-img-shown'
									} est-profile-img`}
									image={ProfileImg}
									alt={'Profile photo'}
									title={'Profile photo'}
								/>
							)}
						</div>

						<h3
							className={`${
								isCollapse ? 'est-main-menu-name-unshown' : ''
							} est-main-menu-name`}>
							{props.user.name}
						</h3>
					</Menu.Item>

					<Menu.Item key='/profile' icon={<UserOutlined />}>
						<Link to='/profile' className='est-main-menu-link'>
							Personal information
						</Link>
					</Menu.Item>

					<Menu.Item key='/general-users' icon={<TeamOutlined />}>
						<Link to='/general-users' className='est-main-menu-link'>
							Patients
						</Link>
					</Menu.Item>

					<Menu.Item key='/general-insurance' icon={<SafetyOutlined />}>
						<Link to='/general-insurance' className='est-main-menu-link'>
							Insurance
						</Link>
					</Menu.Item>
					<Menu.Item key='/general-sms' icon={<CommentOutlined />}>
						<Link to='/general-sms' className='est-main-menu-link'>
							Sms
						</Link>
					</Menu.Item>
				</Menu>
			</div>

			<div className='est-main-menu-collapse-responsive-container'>
				<Drawer
					title={'Menu'}
					placement={'left'}
					closable={true}
					onClose={onClose}
					visible={isVisible}>
					<Menu
						selectedKeys={[current]}
						mode='inline'
						inlineCollapsed={isCollapse}>
						<Menu.Item
							key='/profile-image'
							className='est-detail-profile-name-img'>
							<div className='est-profile-img-container'>
								{props.user.photo ? (
									<Image
										classImg={`${
											isCollapse
												? 'est-profile-img-unshown'
												: 'est-profile-img-shown'
										} est-profile-img`}
										image={props.user.photo}
										alt={'Profile photo'}
										title={'Profile photo'}
									/>
								) : (
									<Image
										classImg={`${
											isCollapse
												? 'est-profile-img-unshown'
												: 'est-profile-img-shown'
										} est-profile-img`}
										image={ProfileImg}
										alt={'Profile photo'}
										title={'Profile photo'}
									/>
								)}
							</div>

							<h3 className={'est-main-menu-name'}>{props.user.name}</h3>
						</Menu.Item>
						<Menu.Item key='/profile/general-users' icon={<UserOutlined />}>
							<Link
								to='/profile/general-users'
								className='est-main-menu-link'
								onClick={() =>
									setGlobal({
										useDrawer: false,
									})
								}>
								Personal information
							</Link>
						</Menu.Item>

						<Menu.Item key='/profile/general-users' icon={<TeamOutlined />}>
							<Link
								to='/profile/general-users'
								className='est-main-menu-link'
								onClick={() =>
									setGlobal({
										useDrawer: false,
									})
								}>
								Patients
							</Link>
						</Menu.Item>

						<Menu.Item key='/profile/general-users' icon={<SafetyOutlined />}>
							<Link
								to='/profile/general-users'
								className='est-main-menu-link'
								onClick={() =>
									setGlobal({
										useDrawer: false,
									})
								}>
								Insurance
							</Link>
						</Menu.Item>

						<Menu.Item key='/profile/general-sms' icon={<CommentOutlined />}>
							<Link
								to='/profile/general-sms'
								className='est-main-menu-link'
								onClick={() =>
									setGlobal({
										useDrawer: false,
									})
								}>
								Sms
							</Link>
						</Menu.Item>
					</Menu>
				</Drawer>
			</div>
		</>
	)
}
