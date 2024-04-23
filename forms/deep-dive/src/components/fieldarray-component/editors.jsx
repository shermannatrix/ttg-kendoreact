import { useContext, useRef } from 'react';
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';
import { Field } from '@progress/kendo-react-form';
import { Error } from '@progress/kendo-react-labels';
import { FormGridEditContext } from '.';
const FORM_DATA_INDEX = "formDataIndex";
const requiredValidator = (value) => (value ? "" : "The field is required");