import React from 'react';
import { 
  Form,
  Field,
  FormElement,
  FieldWrapper
} from '@progress/kendo-react-form';
import { NumericTextBox } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { Ripple } from '@progress/kendo-react-ripple';

export default function FormDemo() {
  const handleSubmit = (dataItem) =>
    console.log(JSON.stringify(dataItem, null, 2));
  
  return (
    <Ripple>
      <Form
        initialValues={{
          userCount: 20,
          ticketCount: 100,
        }}
        onSubmit={handleSubmit}
        render={(formRenderProps) => (
          <FormElement
            style={{
              maxWidth: 650,
            }}
          >
            <FieldWrapper>
              <Field
                name={"userCount"}
                type={"text"}
                component={NumericTextBox}
              />
            </FieldWrapper>
            <FieldWrapper>
              <Field
                name={"ticketCount"}
                type={"text"}
                component={NumericTextBox}
              />
            </FieldWrapper>
            Total ticket price:
            <strong>
              {
                // A calculated value.
                formRenderProps.valueGetter("userCount") *
                formRenderProps.valueGetter("ticketCount")
              }
            </strong>
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