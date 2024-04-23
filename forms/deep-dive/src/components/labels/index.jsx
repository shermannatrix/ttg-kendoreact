import React from "react";
import {
  Form,
  Field,
  FieldWrapper,
  FormElement,
} from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import {
  Label,
  Error,
  Hint,
  FloatingLabel,
} from "@progress/kendo-react-labels";
import { Button } from "@progress/kendo-react-buttons";
import { Ripple } from "@progress/kendo-react-ripple";

const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const emailValidator = (value) =>
  emailRegex.test(value) ? "" : "Please enter a valid email.";

const LabelEmailInput = (fieldRenderProps) => {
  const { validationMessage, visited, label, id, valid, disabled, ...others } =
    fieldRenderProps;
  const showValidationMessage = visited && validationMessage;
  return (
    <FieldWrapper>
      <Label
        className="k-form-label"
        editorId={id}
        editorValid={valid}
        editorDisabled={disabled}
      >
        {label}
      </Label>
      <div className="k-form-field-wrap">
        <Input
          valid={valid}
          type={"email"}
          id={id}
          disabled={disabled}
          {...others}
        />
        {!showValidationMessage && (
          <Hint>Enter your personal email address.</Hint>
        )}
        {showValidationMessage && <Error>{validationMessage}</Error>}
      </div>
    </FieldWrapper>
  );
};

const FloatingLabelEmailInput = (fieldRenderProps) => {
  const {
    validationMessage,
    visited,
    label,
    id,
    valid,
    value,
    disabled,
    ...others
  } = fieldRenderProps;
  const showValidationMessage = visited && validationMessage;

  return (
    <FieldWrapper>
      <div className="k-form-field-wrap">
        <FloatingLabel
          labelClassName="k-form-label"
          label={label}
          editorValue={value}
          editorValid={valid}
          editorDisabled={disabled}
          editorId={id}
        >
          <Input
            value={value}
            valid={valid}
            type={"email"}
            id={id}
            disabled={disabled}
            {...others}
          />
        </FloatingLabel>
        {!showValidationMessage && (
          <Hint>Enter your personal email address.</Hint>
        )}
        {showValidationMessage && <Error>{validationMessage}</Error>}
      </div>
    </FieldWrapper>
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
						<Field
							id={"email"}
							name={"email"}
							label={"Email (Regular Label)"}
							component={LabelEmailInput}
							validator={emailValidator}
						/>
						<Field
							id={"secondEmail"}
							name={"secondEmail"}
							label={"Email (Floating Label)"}
							component={FloatingLabelEmailInput}
							validator={emailValidator}
						/>
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
