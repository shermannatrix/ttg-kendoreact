import React from 'react';
import { 
	Form,
	Field,
	FormElement 
} from '@progress/kendo-react-form';
import { Error } from '@progress/kendo-react-labels';
import { Input } from '@progress/kendo-react-inputs';
import { getter } from '@progress/kendo-react-common';
import { Ripple } from '@progress/kendo-react-ripple';
import { Button } from '@progress/kendo-react-buttons';

const firstNameGetter = getter("user.firstName");
const lastNameGetter = getter("user.lastName");

const firstOrLastNameValidator = (values) => {
	if (firstNameGetter(values) || lastNameGetter(values)) {
		return;
	}

	return {
		VALIDATION_SUMMARY: "Please fill at least one of the following field.",
		["user.firstName"]: "Please check the validation summary for more information.",
		["user.lastName"]: "Please check the validation summary for more information.",
	};
};

const ValidatedInput = (fieldRenderProps) => {
	const { validationMessage, visited, ...others } = fieldRenderProps;
	return (
		<div>
			<Input {...others} />
			{ visited && validationMessage && <Error>{validationMessage}</Error> }
		</div>
	);
};

export default function FormDemo() {
	const handleSubmit = (dataItem) => console.log(JSON.stringify(dataItem, null, 2));

	return (
		<Ripple>
			<Form
				onSubmit={handleSubmit}
				validator={firstOrLastNameValidator}
				render={(formRenderProps) => (
					<FormElement
						style={{
							maxWidth: 650,
						}}
					>
						<fieldset className={"k-form-fieldset"}>
							<legend className={"k-form-legend"}>
								Please fill in the following information:
							</legend>
							{formRenderProps.visited &&
								formRenderProps.errors &&
								formRenderProps.errors.VALIDATION_SUMMARY && (
									<div className={"k-messagebox k-messagebox-error"}>
										{formRenderProps.errors.VALIDATION_SUMMARY}
									</div>
								)}
							<div className="mb-3">
								<Field
									name={"user.firstName"}
									component={ValidatedInput}
									label={"First name"}
								/>
							</div>
							<div className="mb-3">
								<Field
									name={"user.lastName"}
									component={ValidatedInput}
									label={"Last name"}
								/>
							</div>
						</fieldset>
						<div className="k-form-buttons">
							<Button
								type={"submit"}
								themeColor={"primary"}
								disabled={!formRenderProps.allowSubmit}
							>
								Submit
							</Button>
						</div>
					</FormElement>
				)}
			/>
		</Ripple>
	);
}