import { useState, useRef, createContext, useContext, useCallback } from 'react';
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
import { Button } from '@progress/kendo-react-buttons';
import { Ripple } from '@progress/kendo-react-ripple';
import { sampleProducts as products } from '../../data/sample-products';

// Validate the entire Form
const arrayLengthValidator = (value) =>
	value && value.length ? "" : "Please add at least one record.";

// Create React.Context to pass props to the Form Field components from the 
// main component.
export const FormGridEditContext = createContext({});
const FORM_DATA_INDEX = "formDataIndex";
const DATA_ITEM_KEY = "ProductID";

// Add a command cell to Edit, Update, Cancel, and Delete an item
const CommandCell = (props) => {
	const { 
		onRemove, 
		onEdit, 
		onSave, 
		onCancel, 
		editIndex 
	} = useContext(FormGridEditContext);
	const isInEdit = props.dataItem[FORM_DATA_INDEX] === editIndex;
	const isNewItem = !props.dataItem[DATA_ITEM_KEY];

	const onRemoveClick = useCallback(
		(e) => {
			e.preventDefault();
			onRemove(props.dataItem);
		},
		[props.dataItem, onRemove]
	);

	const onEditClick = useCallback(
		(e) => {
			e.preventDefault();
			onEdit(props.dataItem, isNewItem);
		},
		[props.dataItem, onEdit, isNewItem]
	);

	const onSaveClick = useCallback(
		(e) => {
			e.preventDefault();
			onSave();
		},
		[onSave]
	);

	const onCancelClick = useCallback(
		(e) => {
			e.preventDefault();
			onCancel();
		},
		[onCancel]
	);

	return isInEdit ? (
		<td className="k-command-cell">
			<Button
				className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command"
				onClick={onSaveClick}
			>
				{isNewItem ? "Add" : "Update"}
			</Button>
			<Button
				className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command"
				onClick={isNewItem ? onRemoveClick : onCancelClick}
			>
				{isNewItem ? "Discard" : "Cancel"}
			</Button>
		</td>
	) : (
		<td className="k-command-cell">
			<Button
				className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-edit-command"
				onClick={onEditClick}
			>
				Edit
			</Button>
			<Button
				className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command"
				onClick={onRemoveClick}
			>
				Remove
			</Button>
		</td>
	);
};

// Create the Grid that will be used inside the Form
const FormGrid = (fieldArrayRenderProps) => {
	const { 
		validationMessage, 
		visited, 
		name, 
		dataItemKey 
	} = fieldArrayRenderProps;
	const [editIndex, setEditIndex] = useState();
	const editItemCloneRef = useRef();

	// Add a new item to the Form FieldArray that will be shown in the Grid
	const onAdd = useCallback(
		(e) => {
			e.preventDefault();
			fieldArrayRenderProps.onUnshift({
				value: {
					id: "",
					name: ""
				},
			});
		},
		[fieldArrayRenderProps]
	);
};