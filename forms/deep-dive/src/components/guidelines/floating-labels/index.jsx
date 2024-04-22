import React from 'react';
import { 
	Form,
	Field,
	FormElement
} from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
import { FormFloatingNumericTextBox } from '../../form-components';
import { requiredValidator } from '../../form-components/validators';
import { Ripple } from '@progress/kendo-react-ripple';

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
					>
						<Field
							id={"age"}
							name={"age"}
							label={"Age"}
							hint={"Hint: Enter your age."}
							form={"n2"}
							component={FormFloatingNumericTextBox}
							validator={requiredValidator}
						/>
						<Field
							id={"street"}
							name={"street"}
							label={"Street Number"}
							hint={"Hint: Enter your street number."}
							format={"n2"}
							component={FormFloatingNumericTextBox}
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