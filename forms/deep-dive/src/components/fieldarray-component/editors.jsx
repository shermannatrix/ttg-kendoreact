import { useContext, useRef } from 'react';
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';
import { Field } from '@progress/kendo-react-form';
import { Error } from '@progress/kendo-react-labels';
import { FormGridEditContext } from '.';
const FORM_DATA_INDEX = "formDataIndex";
const requiredValidator = (value) => (value ? "" : "The field is required");
const DisplayValue = (fieldRenderProps) => {
  return <>{fieldRenderProps.value}</>;
};

const TextInputWithValidation = (fieldRenderProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;

  return (
    <div>
      <Input {...others} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

const minValidator = (value) => (value >= 0 ? "" : "Minimum units 0");
const NumericTextBoxWithValidation = (fieldRenderProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  const anchor = useRef(null);

  return (
    <div>
      <NumericTextBox {...others} ref={anchor} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

export const NumberCell = (props) => {
  const { parentField, editIndex } = useContext(FormGridEditContext);
  const isInEdit = props.dataItem[FORM_DATA_INDEX] === editIndex;

  return (
    <td>
      <Field
        component={isInEdit ? NumericTextBoxWithValidation : DisplayValue}
        name={`${parentField}[${props.dataItem[FORM_DATA_INDEX]}].${props.field}`}
        validator={minValidator}
      />
    </td>
  );
};

export const NameCell = (props) => {
  const { parentField, editIndex } = useContext(FormGridEditContext);
  const isInEdit = props.dataItem[FORM_DATA_INDEX] === editIndex;
  
  return (
    <td>
      <Field
        component={isInEdit ? TextInputWithValidation : DisplayValue}
        name={`${parentField}[${props.dataItem[FORM_DATA_INDEX]}].${props.field}`}
        validator={requiredValidator}
      />
    </td>
  );
};