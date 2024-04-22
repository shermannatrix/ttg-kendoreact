import React from "react";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import {
  FormMaskedTextBox,
  FormFloatingNumericTextBox,
} from "../../form-components";
import { Ripple } from "@progress/kendo-react-ripple";

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
            <Field
              id={"street"}
              name={"street"}
              label={"Hint: Enter your street number."}
              optional={true}
              format={"n2"}
              component={FormFloatingNumericTextBox}
            />
            <Field
              id={"phoneNumber"}
              name={"phoneNumber"}
              label={"Phone Number"}
              hint={"Hint: Your active phone number."}
              mask={"(+99) 9999 9999"}
              optional={true}
              component={FormMaskedTextBox}
            />
            <div className="k-form-buttons">
              <Button
                themeColor={"primary"}
                type={"submit"}
                disabled={!formRenderProps.allowSubmit}
              >
                Submit
              </Button>
              <Button onClick={formRenderProps.onFormReset}>Clear</Button>
            </div>
          </FormElement>
        )}
      />
    </Ripple>
  );
}
