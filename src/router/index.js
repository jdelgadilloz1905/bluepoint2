/** @format */

import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Camera from '../pages/camera'
import LoginUser from '../pages/login'
import NoFound from '../pages/not-found'
import Profile from '../pages/profile'

const Routers = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={Camera} />
			<Route exact path='/login' component={LoginUser} />
			<Route exact path='/profile' component={Profile} />

			<Route path='*' component={NoFound} />
		</Switch>
	</BrowserRouter>
)

export default Routers
