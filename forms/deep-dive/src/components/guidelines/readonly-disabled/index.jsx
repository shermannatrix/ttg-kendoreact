import React from 'react';
import { 
	Form,
	Field,
	FormElement
} from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
import { Ripple } from '@progress/kendo-react-ripple';
import { FormMaskedTextBox, FormInput } from '../../form-components';

export default function FormDemo() {
	const handleSubmit = (dataItem) =>
		console.log(JSON.stringify(dataItem, null, 2));

	return (
		<Ripple>
			<Form
				onSubmit={handleSubmit}
				initialValues={{
					ownerName: "Chen Weizhi",
					phoneNumber: "(+65) 8196 0279",
				}}
				render={(formRenderProps) => (
					<FormElement
						style={{
							width: 400,
						}}
					>
						<Field
							id={"ownerName"}
							name={"ownerName"}
							label={"Owner Name"}
							hint={"Hint: Disabled field"}
							disabled={true}
							component={FormInput}
						/>
						<Field
							id={"phoneNumber"}
							name={"phoneNumber"}
							label={"Phone Number"}
							mask={"(+99) 0000 0000"}
							hint={"Hint: Read-only field"}
							readonly={true}
							component={FormMaskedTextBox}
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