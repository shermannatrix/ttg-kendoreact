import { useState, useRef, createContext, useCallback } from 'react';
import { 
	Form,
	FormElement,
	FieldArray
} from '@progress/kendo-react-form';
import { Error } from '@progress/kendo-react-labels';
import { clone } from '@progress/kendo-react-common';
import { 
	Grid, 
	GridColumn as Column,
	GridToolbar 
} from '@progress/kendo-react-grid';
import { sampleProducts as products } from '../../data/sample-products';

// Validate the entire Form
const arrayLengthValidator = (value) =>
	value && value.length ? "" : "Please add at least one record.";

// Create React.Context to pass props to the Form Field components from the 
// main component.
export const FormGridEditContext = createContext({});
const FORM_DATA_INDEX = "formDataIndex";
const DATA_ITEM_KEY = "ProductID";

