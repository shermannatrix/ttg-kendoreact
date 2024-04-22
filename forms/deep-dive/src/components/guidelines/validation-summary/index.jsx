import React from 'react';
import { Field, Form, FormElement } from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
import { Ripple } from '@progress/kendo-react-ripple';
import { FormInput, FormCheckbox } from '../../form-components';
import { 
	userNameValidator,
	emailValidator,
	formValidator
} from '../../form-components/validators';

const genericErrorField = "VALIDATION_SUMMARY";

export default function FormDemo() {
	const handleSubmit = (dataItem) =>
		console.log(JSON.stringify(dataItem, null, 2));

	return (
		<Ripple>
			<Form
				onSubmit={handleSubmit}
				validator={formValidator}
				render={(formRenderProps) => (
					<FormElement
						style={{
							width: 400,
						}}
					>
						<fieldset className={"k-form-fieldset"}>
							<legend className={"k-form-legend"}>
								Please fill in the following information:
							</legend>
							{formRenderProps.visited &&
								formRenderProps.errors &&
								formRenderProps.errors[genericErrorField] && (
									<div className={"k-messagebox k-messagebox-error"}>
										{formRenderProps.errors[genericErrorField]}
										<ul>
											{Object.keys(formRenderProps.errors)
												.filter((field) => field !== genericErrorField)
												.filter((field) => formRenderProps.errors[field])
												.map((field, key) => (
													<li key={key}>{formRenderProps.errors[field]}</li>
												))}
										</ul>
									</div>
								)
							}
							<Field
								id={"username"}
								name={"username"}
								label={"User Name"}
								component={FormInput}
								validator={userNameValidator}
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
							<Field
								id={"notifications"}
								name={"notifications"}
								label={"I want to receive notifications"}
								hint={"You will reeive our latest updates and promotions in your email"}
								optional={true}
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