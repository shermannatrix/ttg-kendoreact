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
import { NameCell, NumberCell } from './editors';
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
			setEditIndex(0);
		},
		[fieldArrayRenderProps]
	);

	// Remove a new item to the Form FieldArray that will be removed from 
	// the Grid.
	const onRemove = useCallback(
		(dataItem) => {
			fieldArrayRenderProps.onRemove({
				index: dataItem[FORM_DATA_INDEX],
			});
			setEditIndex(undefined);
		}, [fieldArrayRenderProps]
	);

	// Update an item from the Grid and update the index of the edited item.
	const onEdit = useCallback((dataItem, isNewItem) => {
		if (!isNewItem) {
			editItemCloneRef.current = clone(dataItem);
		}
		setEditIndex(dataItem[FORM_DATA_INDEX]);
	}, []);

	// Cancel the editing of an item and return its initial value.
	const onCancel = useCallback(() => {
		if (editItemCloneRef.current) {
			fieldArrayRenderProps.onReplace({
				index: editItemCloneRef.current[FORM_DATA_INDEX],
				value: editItemCloneRef.current,
			});
		}
		editItemCloneRef.current = undefined;
		setEditIndex(undefined);
	}, [fieldArrayRenderProps]);

	// Save the changes.
	const onSave = useCallback(() => {
		console.log(fieldArrayRenderProps);
		setEditIndex(undefined);
	}, [fieldArrayRenderProps]);

	const dataWithIndexes = fieldArrayRenderProps.value.map(
		(item, index) => {
			return {
				...item,
				[FORM_DATA_INDEX]: index,
			};
		}
	);

	return (
		<FormGridEditContext.Provider
			value={{
				onCancel,
				onEdit,
				onRemove,
				onSave,
				editIndex,
				parentField: name,
			}}
		>
			{visited && validationMessage && <Error>{validationMessage}</Error>}
			<Grid data={dataWithIndexes} dataItemKey={dataItemKey}>
				<GridToolbar>
					<Button
						title="Add new"
						themeColor={"primary"}
						onClick={onAdd}
					>
						Add New
					</Button>
				</GridToolbar>
				<Column field="ProductName" title="Name" cell={NameCell} />
				<Column field="UnitsOnOrder" title="Units" cell={NumberCell} />
				<Column cell={CommandCell} width="240px" />
			</Grid>
		</FormGridEditContext.Provider>
	);
};

export default function FormDemo() {
	const handleSubmit = (dataItem) => console.log(JSON.stringify(dataItem));

	return (
		<Ripple>
			<Form
				initialValues={{
					products: products.splice(0, 5),
				}}
				onSubmit={handleSubmit}
				render={(formRenderProps) => (
					<FormElement>
						<FieldArray
							name="products"
							dataItemKey={DATA_ITEM_KEY}
							component={FormGrid}
							validator={arrayLengthValidator}
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