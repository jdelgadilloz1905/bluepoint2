/** @format */

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'

import Router from './router'

import Loading from './components/Loading'

import 'antd/dist/antd.css'

const loadingMarkup = <Loading />
ReactDOM.render(
	<Suspense fallback={loadingMarkup}>
		<Router />
	</Suspense>,
	document.getElementById('root')
)
