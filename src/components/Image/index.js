/** @format */

import React from 'react'
import { Image } from 'antd'

export default function Imagen(props) {
	return (
		<Image
			className={props.classImg}
			src={props.image}
			alt={props.title}
			title={props.title}
		/>
	)
}
