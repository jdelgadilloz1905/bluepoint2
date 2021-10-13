/** @format */

import React from 'react'

import InputMask from 'react-input-mask'
import Input from 'antd/lib/input'

import './style.css'

const inputMask = (props) => {
	return (
		<InputMask
			{...props}
			className={props.maskstyle ? props.maskstyle : 'ph-edit-profile-field-input-mask'}>
			{(inputProps) => <Input {...inputProps} />}
		</InputMask>
	)
}

export default inputMask
