/** @format */

import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Camera from '../pages/camera'
import LoginUser from '../pages/login'
import NoFound from '../pages/not-found'
import Profile from '../pages/profile'
import GeneralUsers from '../pages/general-users'

const Routers = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={Camera} />
			<Route exact path='/login' component={LoginUser} />
			<Route exact path='/profile' component={Profile} />
			<Route exact path='/general-users' component={GeneralUsers} />

			<Route path='*' component={NoFound} />
		</Switch>
	</BrowserRouter>
)

export default Routers
