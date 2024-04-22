import React from 'react';
import { 
	Form, 
	Field, 
	FormElement 
} from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
import { Ripple } from '@progress/kendo-react-ripple';
import { FormInput } from '../../form-components';
import { requiredValidator } from '../../form-components/validators';

export default function FormDemo() {
	const handleSubmit = (dataItem) =>
		console.log(JSON.stringify(dataItem, null, 2));

	return (
		<Ripple>
			<Form
				onSubmit={handleSubmit}
				render={(formRenderProps) => (
					<FormElement
						style={{
							width: 400,
						}}
						horizontal={true}
					>
						<Field
							id={"fullName"}
							name={"fullName"}
							label={"Full Name"}
							placeholder={"e.g.: Clevey Thursfield"}
							component={FormInput}
							validator={requiredValidator}
						/>
						<div className="k-form-buttons">
							<Button
								themeColor={"primary"}
								type={"submit"}
								disabled={!formRenderProps.allowSubmit}
							>
								Submit
							</Button>
							<Button onClick={formRenderProps.onFormReset}>
								Clear
							</Button>
						</div>
					</FormElement>
				)}
			/>
		</Ripple>
	);
}