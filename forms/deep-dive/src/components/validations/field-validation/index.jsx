import React from 'react';
import { 
	Form,
	Field,
	FormElement
} from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import { Error } from '@progress/kendo-react-labels';
import { Button } from '@progress/kendo-react-buttons';
import { Ripple } from '@progress/kendo-react-ripple';

const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const emailValidator = (value) =>
  emailRegex.test(value) ? "" : "Please enter a valid email.";
const EmailInput = (fieldRenderProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div>
      <Input {...others} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

export default function FormDemo() {
	const handleSubmit = (dataItem) => console.log(JSON.stringify(dataItem, null, 2));

	return (
		<Ripple>
			<Form
				onSubmit={handleSubmit}
				render={(formRenderProps) => (
					<FormElement
						style={{
							maxWidth: 650,
						}}
					>
						<fieldset className={"k-form-fieldset"}>
							<legend className={"k-form-legend"}>
								Please fill in the email field:
							</legend>
							<div className="mb3">
								<Field
									name={"email"}
									type={"email"}
									component={EmailInput}
									label={"Email"}
									validator={emailValidator}
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