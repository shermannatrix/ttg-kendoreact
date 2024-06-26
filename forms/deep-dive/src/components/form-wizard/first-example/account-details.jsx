import React from 'react';
import { Field } from '@progress/kendo-react-form';
import { FormInput, FormUpload } from '../../form-components';
import { 
	userNameValidator,
	emailValidator,
	passwordValidator
} from '../../form-components/validators';

export const AccountDetails = (
	<div>
		<Field
			key={"userName"}
			id={"userName"}
			name={"userName"}
			label={"Username"}
			component={FormInput}
			validator={userNameValidator}
		/>
		<Field
			key={"email"}
			id={"email"}
			name={"email"}
			label={"Email"}
			hint={"Hint: Enter your personal email."}
			type={"email"}
			component={FormInput}
			validator={emailValidator}
		/>
		<Field
			key={"password"}
			id={"password"}
			name={"password"}
			label={"Password"}
			type={"password"}
			component={FormInput}
			validator={passwordValidator}
		/>
		<Field
			key={"avatar"}
			id={"avatar"}
			name={"avatar"}
			label={"Avatar"}
			optional={true}
			hint={"Hint: Upload your avatar picture"}
			component={FormUpload}
		/>
	</div>
);