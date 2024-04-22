import React from 'react';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
import { FormCheckbox, FormRadioGroup } from '../../form-components';
import { RadioButton } from '@progress/kendo-react-inputs';
//import { genders } from '../../data';

const confirmationData = [
	{
		label: "Phone Call",
		value: "phone",
	},
	{
		label: "Via Email",
		value: "email",
	},
];

function FormDemo() {
	const handleSubmit = (dataItem) =>
		console.log(JSON.stringify(dataItem, null, 2));
	
	return (
			<Form
				onSubmit={handleSubmit}
				render={(formRenderProps) => (
					<FormElement
						style={{
							width: 400,
						}}
					>
						<Field
							id={"confirmationType"}
							name={"confirmationType"}
							label={"Type of Confirmation"}
							hint={"Hint: Choose a way to receive a confirmation"}
							component={FormRadioGroup}
							data={confirmationData}
						/>
						<div>
							<RadioButton
								name="gender"
								value="Male"
								label="Male"
							/>
							<RadioButton
								name="gender"
								value="Female"
								label="Female"
							/>
						</div>
						<Field
							id={"terms"}
							name={"terms"}
							label={"I agree with terms and conditions"}
							hint={"Hint: By checking this, you agree to our Terms & Conditions"}
							component={FormCheckbox}
						/>
						<div className="k-form-buttons">
							<Button
								themeColor={"primary"}
								type={"submit"}
								disabled={!formRenderProps.allowSubmit}
							>
								Submit
							</Button>
							<Button onClick={formRenderProps.onFormReset}>Clear</Button>
						</div>
					</FormElement>
				)}
			/>
	);
}

export default FormDemo;