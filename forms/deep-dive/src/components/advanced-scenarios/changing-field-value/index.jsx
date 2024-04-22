import React from "react";
import {
  Form,
  Field,
  FieldWrapper,
  FormElement,
} from "@progress/kendo-react-form";
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { Ripple } from "@progress/kendo-react-ripple";

export default function FormDemo() {
  const handleSubmit = (dataItem) =>
    console.log(JSON.stringify(dataItem, null, 2));

  return (
    <Ripple>
      <Form
        initialValues={{
          price: 20,
        }}
        onSubmit={handleSubmit}
        render={(formRenderProps) => (
          <FormElement
            style={{
              maxWidth: 650,
            }}
          >
            <FieldWrapper>
              <Field name={"price"} type={"text"} component={NumericTextBox} />
            </FieldWrapper>
            <br />
            <Button
              onClick={(e) => {
                e.preventDefault();
                // Changing desired field value
                formRenderProps.onChange("price", {
                  value: 0,
                });
              }}
            >
              Clear Price
            </Button>
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
