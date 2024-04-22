import React from 'react'
import { 
	Form, 
	Field, 
	FormElement, 
	FieldWrapper 
} from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import { Ripple } from '@progress/kendo-react-ripple';
import { Button } from '@progress/kendo-react-buttons';

const MyCustomInput = (fieldRenderProps) => {
	const { label, value, onChange } = fieldRenderProps;
	return (
		<Input label={label} value={value} onChange={onChange} />
	);
};

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
							maxWidth: 650,
						}}
					>
						<FieldWrapper>
							<div className='k-form-field-wrap'>
								<Field
									name={'firstName'}
									label={'First Name'}
									component={MyCustomInput}
									labelClassName={'k-form-label'}
								/>
							</div>
						</FieldWrapper>
						<div className="k-form-buttons">
							<Button type={'submit'} disabled={!formRenderProps.allowSubmit}>
								Submit
							</Button>
						</div>
					</FormElement>
				)}
			/>
		</Ripple>
	);
}