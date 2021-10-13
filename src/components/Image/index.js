/** @format */

import React from 'react'

export default function Image(props) {
	return <img className={props.classImg} src={props.image} alt={props.title} title={props.title} />
}
