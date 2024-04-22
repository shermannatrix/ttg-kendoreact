import React, { useState } from 'react';
import { 
	Form,
	Field,
	FieldWrapper,
	FormElement 
} from '@progress/kendo-react-form';
import { Error } from '@progress/kendo-react-labels';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { Ripple } from '@progress/kendo-react-ripple';
const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const emailValidator = (value) =>
	emailRegex.test(value) ? "" : "Please enter a valid email.";

const EmailInput = (fieldRenderProps) => {
	const { validationMessage, visited, ...others } = fieldRenderProps;
	return (
		<>
			<Input {...others} />
			{visited && validationMessage && <Error>{validationMessage}</Error>}
		</>
	);
};

export default function FormDemo() {
	const handleSubmit = (dataItem) => console.log(JSON.stringify(dataItem, null, 2));

	const [user, setUser] = useState({
		firstName: "John",
		lastName: "Smith",
		email: "John.Smith@email.com"
	});

	const loadNewUser = () => {
		setUser({
			firstName: "Sherman",
			lastName: "Chen",
			email: "shermannatrix@gmail.com"
		});
	};

	return (
		<Ripple>
			<div className="k-form-buttons">
				<Button
					themeColor={"secondary"}
					onClick={loadNewUser}
				>
					Load new User
				</Button>
			</div>
			<hr className="k-hr" />
			<Form
				onSubmit={handleSubmit}
				initialValues={user}
				key={JSON.stringify(user)}
				render={(formRenderProps) => (
					<FormElement
						style={{
							maxWidth: 650,
						}}
					>
						<fieldset className={"k-form-fieldset"}>
							<legend className={"k-form-legend"}>
								Please fill in the fields:
							</legend>
							<FieldWrapper>
								<div className="k-form-field-wrap">
									<Field
										name={"firstName"}
										component={Input}
										label={"First name"}
										labelClassName="k-form-label"
									/>
								</div>
							</FieldWrapper>
							<FieldWrapper>
								<div className="k-form-field-wrap">
									<Field
										name={"lastName"}
										component={Input}
										label={"Last name"}
										labelClassName="k-form-label"
									/>
								</div>
							</FieldWrapper>
							<FieldWrapper>
								<div className="k-form-field-wrap">
									<Field
										name={"email"}
										type={"email"}
										component={EmailInput}
										label={"Email"}
										validator={emailValidator}
										labelClassName="k-form-label"
									/>
								</div>
							</FieldWrapper>
						</fieldset>
						<div className="k-form-buttons">
							<Button type={"submit"} disabled={!formRenderProps.allowSubmit}>
								Submit
							</Button>
						</div>
					</FormElement>
				)}
			/>
		</Ripple>
	);
}