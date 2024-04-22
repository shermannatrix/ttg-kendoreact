import React from 'react';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
import { Ripple } from '@progress/kendo-react-ripple';
import { FormMaskedTextBox, FormInput } from '../../form-components';
import { 
	requiredValidator,
	cardValidator,
	cvcValidator 
} from '../../form-components/validators';

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
						<fieldset className={"k-form-fieldset"}>
							<legend className={"k-form-legend"}>
								Horizontal Form
							</legend>
							<Field
								id={"fullName"}
								name={"fullName"}
								label={"Full Name"}
								component={FormInput}
								validator={requiredValidator}
							/>
							<Field
								id={"cardNumber"}
								name={"cardNumber"}
								label={"Card Number"}
								hint={"Hint: Your Credit Card Number"}
								mask={"0000-0000-0000-0000"}
								component={FormMaskedTextBox}
								validator={cardValidator}
							/>
							<Field
								id={"cvc"}
								name={"cvc"}
								label={"CVC Number"}
								hint={"Hint: The last 3 digits on the back of the Card"}
								mask={"000"}
								component={FormMaskedTextBox}
								validator={cvcValidator}
							/>
							<div className="k-form-buttons">
								<Button
									themeColor={"primary"}
									type={"submit"}
									disabled={!formRenderProps.allowSubmit}
								>
									Submit
								</Button>
								<Button
									onClick={formRenderProps.onFormReset}
								>
									Clear
								</Button>
							</div>
						</fieldset>
					</FormElement>
				)}
			/>
		</Ripple>
	);
}