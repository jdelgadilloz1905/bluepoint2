/** @format */

import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Camera from '../pages/camera'
import LoginUser from '../pages/login'
import NoFound from '../pages/not-found'
import Profile from '../pages/profile'
import GeneralUsers from '../pages/general-users'
import GeneralInsurance from '../pages/general-insurance'

const Routers = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path='/login' component={LoginUser} />
			<Route exact path='/profile' component={Profile} />
			<Route exact path='/general-users' component={GeneralUsers} />
			<Route exact path='/general-insurance' component={GeneralInsurance} />
			<Route exact path='/:id' component={Camera} />
			<Route path='*' component={NoFound} />
		</Switch>
	</BrowserRouter>
)

export default Routers
