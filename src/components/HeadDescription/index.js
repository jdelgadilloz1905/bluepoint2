/** @format */

import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

export default class HeadDescription extends Component {
	render() {
		return (
			<>
				<Helmet>
					<meta charSet='utf-8' />
					<title>{this.props.title}</title>
					<meta name={this.props.name} content={this.props.content} />
				</Helmet>
			</>
		)
	}
}
