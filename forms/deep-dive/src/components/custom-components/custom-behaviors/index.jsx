import { useCallback } from "react";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { Button } from "@progress/kendo-react-buttons";
import { Ripple } from "@progress/kendo-react-ripple";

const MyCustomCheckbox = (fieldRenderProps) => {
  const {
    // The meta props of the Field
    validationMessage,
    touched,
    visited,
    modified,
    valid,
    // The input props of the Field.
    value,
    onChange,
    onFocus,
    onBlur,
    // The custom props that you pass to the Field.
    ...others
  } = fieldRenderProps;

  const onValueChange = useCallback(() => {
    // onChange call back expects argument with 'value' property
    onChange({
      value: !value,
    });
  }, [onChange, value]);

  return (
    <div onFocus={onFocus} onBlur={onBlur}>
      <input
        type={"checkbox"}
        onChange={onValueChange}
        checked={value}
        id={others.id}
      />
      <label className={"k-checkbox-label"} htmlFor={others.id}>
        {others.label}
      </label>
      {
        // Display an error message after the "visited" or "touched"
        // field is set to true.
        visited && validationMessage && <Error>{validationMessage}</Error>
      }
    </div>
  );
};

const requiredValidator = (value) => (value ? "" : "This field is required.");

export default function FormDemo() {
	const handleSubmit = (dataItem) =>
		console.log(JSON.stringify(dataItem, null, 2));
	
	return (
		<Ripple>
		<Form
			initialValues={{
				termsAccepted: false,
			}}
			onSubmit={handleSubmit}
			render={(formRenderProps) => (
				<FormElement
					style={{
						maxWidth: 650,
					}}
				>
					<Field
						name={"termsAccepted"}
						label={"I Agree with the terms and conditions."}
						component={MyCustomCheckbox}
						validator={requiredValidator}
					/>
					<div className="k-form-buttons">
						<Button
							themeColor={"primary"} 
							type={"submit"} 
							disabled={!formRenderProps.allowSubmit}>
							Submit
						</Button>
					</div>
				</FormElement>
			)}
		/>
		</Ripple>
	);
}
