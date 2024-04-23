import React from 'react';
import { 
  Form,
  Field,
  FormElement,
  FieldWrapper
} from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { Ripple } from '@progress/kendo-react-ripple';

export default function FormDemo() {
  return (
    <Ripple>
      <Form
        initialValues={{
          firstName: "Sherman",
          lastName: "Chen",
          email: "shermannatrix@gmail.com"
        }}
        render={() => (
          <FormElement
            style={{
              maxWidth: 650,
            }}>
            <fieldset className={"k-form-fieldset"}>
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
                    component={Input}
                    label={"Email"}
                    labelClassName="k-form-label"
                  />
                </div>
              </FieldWrapper>
            </fieldset>
            <div className="k-form-buttons">
              <Button
                type={"submit"}
                themeColor={"primary"}
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