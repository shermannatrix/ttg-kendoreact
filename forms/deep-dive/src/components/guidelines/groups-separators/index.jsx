import React from 'react';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
import { FormCheckbox, FormInput } from '../../form-components';
import { Ripple } from '@progress/kendo-react-ripple';
import { 
	requiredValidator, 
	emailValidator 
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
					>
						<fieldset className={"k-form-fieldset"}>
							<legend className={"k-form-legend"}>User Details</legend>
							<Field
								id={"fullName"}
								name={"fullName"}
								label={"Full Name"}
								component={FormInput}
								validator={requiredValidator}
							/>
							<Field
								id={"fullName"}
								name={"fullName"}
								label={"Full Name"}
								component={FormInput}
								validator={requiredValidator}
							/>
							<Field
								id={"email"}
								name={"email"}
								label={"Email"}
								hint={"Hint: Enter your personal email."}
								type={"email"}
								component={FormInput}
								validator={emailValidator}
							/>
							<span class={"k-form-separator"} />
							<Field
								id={"notifications"}
								name={"notifications"}
								label={"I want to receive notifications."}
								hint={"You will receive our latest updates and promotions to your email."}
								optional={true}
								component={FormCheckbox}
							/>
							<div className="k-form-buttons k-buttons-end">
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
						</fieldset>
					</FormElement>
				)}
			/>
		</Ripple>
	);
}