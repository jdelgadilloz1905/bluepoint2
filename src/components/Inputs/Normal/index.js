/** @format */

import React from 'react'

import Form from 'antd/lib/form'
import Input from 'antd/lib/input'

import { rulesValidation } from './rules'

class NormalInput extends React.Component {
	render() {
		return (
			<>
				<Form.Item
					name={this.props.inputName}
					rules={rulesValidation[this.props.inputNameRules]}>
					<Input
						className={this.props.className}
						size='large'
						prefix={this.props.inputNameIcon}
						type={this.props.inputNameType}
						placeholder={this.props.inputNameLabel}
						maxLength={this.props.maxLength}
						onChange={this.props.onChange}
						name={this.props.inputName}
						defaultValue={this.props.defaultValue}
						disabled={this.props.disabled}
					/>
				</Form.Item>
			</>
		)
	}
}

export default NormalInput
