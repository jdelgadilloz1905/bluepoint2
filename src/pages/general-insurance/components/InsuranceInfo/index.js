/** @format */

import React, { useEffect, useState } from 'react'

import { setGlobal, useGlobal } from 'reactn'

import { Row, Col, Button, Modal, Form, Input } from 'antd'

import { PoweroffOutlined } from '@ant-design/icons'

import Loading from '../../../../components/Loading'
import Image from '../../../../components/Image'

// import ModalEditUser from './components/ModalEditUser'
import ModalCreateInsu from './components/ModalCreateInsu'
import ModalEditInsu from './components/ModalEditInsu'

import './style.css'

import { GetAllInsurance, ActivateInsurance, DeleteInsurance } from './services'

const InsuranceInfo = () => {
	const [isMobile, setMobile] = useState(false)
	const [update_password] = Form.useForm()
	const [isVisible, setVisible] = useState(false)
	const [isAllInsu, setAllInsu] = useGlobal('allInsu')
	const [isModalInfo, setModalInfo] = useState(null)
	const [isUpdateInsu, setUpdateInsu] = useState(false)
	const [isLoading, setLoading] = useState(false)
	const [isFilterList, setFilterList] = useState(null)

	const [isGetAllInsu] = useState({
		service_global_description: 'Check your internet connection',
	})

	const handleCloseManageInsu = () => {
		setModalInfo(null)
		setVisible(false)
	}

	const handleActivateInsu = async (item) => {
		setUpdateInsu(true)
		let actionUser = {
			idUser: item.id,
			allDelete: 'no',
		}
		if (item.state === '1') {
			actionUser.state = '0'
		} else if (item.state === '0') {
			actionUser.state = '1'
		}

		await ActivateInsurance(actionUser).then((response) => {
			if (response) {
				GetAllInsurance(isGetAllInsu).then((response) => {
					if (response) {
						setAllInsu(response)
					}
				})
			}
		})
		setUpdateInsu(false)
	}

	const handleSearchList = (item) => {
		const filter = item.target.value
		let filterList = isFilterList.filter((data) => {
			data.name = data.name.toLowerCase()
			return data.name.indexOf(filter) !== -1
		})
		setAllInsu(filterList)
	}

	useEffect(() => {
		if (window.innerWidth < 576) {
			setMobile(true)
		}
		GetAllInsurance(isGetAllInsu).then((response) => {
			if (response) {
				setAllInsu(response)
				setFilterList(response)
			}
		})
	}, [setAllInsu])

	if (!isAllInsu) {
		return <Loading />
	} else
		return (
			<>
				{isMobile && (
					<Row className='est-general-list-users-banner-container-responsive'>
						<Col xs={12}>
							<Button
								className='est-general-list-users-responsive-button'
								type='primary'
								onClick={() =>
									setGlobal({
										useDrawer: true,
									})
								}>
								Menu
							</Button>
						</Col>
						<Col
							xs={12}
							className='est-general-list-create-user-responsive-button'>
							<ModalCreateInsu />
						</Col>
						<Col
							xs={24}
							className='est-general-list-users-banner-search-container'>
							<Input
								type='text'
								onChange={(item) => handleSearchList(item)}
								placeholder={'Search...'}
								className='est-general-list-users-banner-search'
							/>
						</Col>
					</Row>
				)}

				<Row className='est-general-list-users-banner-container'>
					<Col xs={24} sm={4} md={4} lg={0} xl={0}>
						<Button
							className='est-general-list-users-responsive-button'
							type='primary'
							onClick={() =>
								setGlobal({
									useDrawer: true,
								})
							}>
							Menu
						</Button>
					</Col>
					<Col
						xs={24}
						sm={12}
						md={12}
						lg={12}
						xl={12}
						className='est-general-list-users-banner-search-container'>
						<Input
							type='text'
							onChange={(item) => handleSearchList(item)}
							placeholder={'Enter a keyword'}
							className='est-general-list-users-banner-search'
						/>
					</Col>
					<Col
						xs={24}
						sm={4}
						md={4}
						lg={12}
						xl={12}
						className='est-general-list-create-user-container'>
						<ModalCreateInsu />
					</Col>
				</Row>

				<Row className='est-general-list-users-list-main-title-container'>
					<Col md={2} lg={2} xl={2}>
						<h3 className='est-general-list-users-list-main-title'>Status</h3>
					</Col>
					<Col md={2} lg={2} xl={2}>
						<h3 className='est-general-list-users-list-main-title'>Id</h3>
					</Col>
					<Col md={6} lg={6} xl={6}>
						<h3 className='est-general-list-users-list-main-title'>Name</h3>
					</Col>
					<Col md={3} lg={3} xl={3}>
						<h3 className='est-general-list-users-list-main-title'>Date</h3>
					</Col>
					<Col md={5} lg={5} xl={5}>
						<h3 className='est-general-list-users-list-main-title'>Actions</h3>
					</Col>
				</Row>
				<div className='est-general-list-users-list-main-container'>
					{isAllInsu.map((item, index) => (
						<Row key={index} className='est-general-list-users-list-container'>
							<Col
								className='est-general-list-users-list-text-container'
								xs={24}
								sm={24}
								md={2}
								lg={2}
								xl={2}>
								<h4 className='est-general-list-users-title'>
									<span className='est-general-list-users-list-main-title-responsive'>
										Status:
									</span>
									<span
										className={
											item.state === '1'
												? 'est-general-list-users-title-state-active'
												: 'est-general-list-users-title-state-disable'
										}></span>
								</h4>
							</Col>
							<Col
								className='est-general-list-users-list-text-container'
								xs={24}
								sm={24}
								md={2}
								lg={2}
								xl={2}>
								<h4 className='est-general-list-users-title'>
									<span className='est-general-list-users-list-main-title-responsive'>
										Id:
									</span>
									{item.id}
								</h4>
							</Col>

							<Col
								className='est-general-list-users-list-text-container'
								xs={24}
								sm={24}
								md={6}
								lg={6}
								xl={6}>
								<h4 className='est-general-list-users-title'>
									<span className='est-general-list-users-list-main-title-responsive'>
										Name:
									</span>
									{item.name}
								</h4>
							</Col>

							<Col
								className='est-general-list-users-list-text-container'
								xs={24}
								sm={24}
								md={6}
								lg={6}
								xl={6}>
								<h4 className='est-general-list-users-title'>
									<span className='est-general-list-users-list-main-title-responsive'>
										Date:
									</span>
									{item.date_creation}
								</h4>
							</Col>

							<Col
								xs={24}
								sm={24}
								md={5}
								lg={5}
								xl={5}
								className='est-general-list-users-list-text-container'>
								<h4 className='est-general-list-users-title'>
									<span className='est-general-list-users-list-main-title-responsive'>
										Actions:
									</span>
									<Row className='est-users-manage-list-button-container'>
										<Col>
											<ModalEditInsu item={item} />
										</Col>
										<Col>
											<Button
												loading={isUpdateInsu}
												icon={<PoweroffOutlined />}
												className='est-users-manage-list-button-disable-user-button'
												onClick={() => handleActivateInsu(item)}></Button>
										</Col>
									</Row>
								</h4>
							</Col>
						</Row>
					))}
				</div>
				<Modal
					wrapClassName='est-manage-users-modal-global-container'
					centered
					title={'Manage insurance'}
					visible={isVisible}
					onCancel={() => handleCloseManageInsu()}
					cancelButtonProps={{ style: { display: 'none' } }}
					okButtonProps={{ style: { display: 'none' } }}
					okText=''
					cancelText=''
					footer={false}>
					{isModalInfo && (
						<Row>
							<Col
								xs={24}
								sm={24}
								md={isModalInfo.modo === 'directo' ? 12 : 24}
								lg={isModalInfo.modo === 'directo' ? 12 : 24}
								xl={isModalInfo.modo === 'directo' ? 12 : 24}
								className='est-manage-users-modal-main-container'>
								<div
									className={`${
										isModalInfo.modo !== 'directo'
											? 'est-manage-users-modal-direct-title-container'
											: ''
									} est-manage-users-modal-title-container`}>
									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											ID:
										</span>{' '}
										{isModalInfo.id}
									</h4>

									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											Name:
										</span>{' '}
										{isModalInfo.name} {isModalInfo.last}
									</h4>
									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											Creation date:
										</span>{' '}
										{isModalInfo.date_creation}
									</h4>

									<h4 className='est-manage-users-modal-title'>
										<span className='est-manage-users-modal-title-span'>
											Account status:
										</span>{' '}
										{isModalInfo.state === '1' ? `Active` : `Inactive`}
									</h4>
								</div>
							</Col>
						</Row>
					)}
					<div className='est-manage-users-modal-button-container'>
						<Button
							className='est-manage-users-modal-button'
							onClick={() => handleCloseManageInsu()}>
							Close
						</Button>
					</div>
				</Modal>
			</>
		)
}
export default InsuranceInfo
