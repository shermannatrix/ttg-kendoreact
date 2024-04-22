import { useContext, useCallback, createContext } from 'react';
import { 
  Form,
  Field,
  FieldArray,
  FormElement 
} from '@progress/kendo-react-form';
import { Error } from '@progress/kendo-react-labels';
import { Input } from '@progress/kendo-react-inputs';
import { 
  Grid,
  GridColumn as Column,
  GridToolbar
} from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';

const arrayLengthValidator = (value) =>
  value && value.length ? "" : "Please add at least one record.";
const ParentFieldContext = createContext("");
const FORM_DATA_INDEX = "formDataIndex";

const NameCell = (props) => {
  const parentField = useContext(ParentFieldContext);
  return (
    <td>
      <Field
        component={Input}
        name={`${parentField}[${props.dataItem[FORM_DATA_INDEX]}].${props.field}`}
      />
    </td>
  );
};

// eslint-disable-next-line react/display-name
const commandCell = (onRemove) => (props) => {
  const onClick = useCallback(
    (e) => {
      e.preventDefault();
      onRemove(props);
    },
    [props]
  );
  return (
    <td>
      <Button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command"
        onClick={onClick}
      >
        Remove
      </Button>
    </td>
  );
};

function FormGrid(fieldArrayRenderProps) {
  const { validationMessage, visited, name } = fieldArrayRenderProps;
  const onAdd = useCallback(
    (e) => {
      e.preventDefault();
      fieldArrayRenderProps.onUnshift({
        value: {
          name: "",
        },
      });
    },
    [fieldArrayRenderProps]
  );

  const onRemove = useCallback(
    (cellProps) =>
      fieldArrayRenderProps.onRemove({
        index: cellProps.dataItem[FORM_DATA_INDEX],
      }),
      [fieldArrayRenderProps]
  );

  const dataWithIndexes = fieldArrayRenderProps.value.map((item, index) => {
    return {
      ...item,
      [FORM_DATA_INDEX]: index,
    };
  });

  return (
    <ParentFieldContext.Provider value={name}>
      {visited && validationMessage && <Error>{validationMessage}</Error>}
      <Grid data={dataWithIndexes}>
        <GridToolbar>
          <button
            title="Add new"
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
            onClick={onAdd}
          >
            Add new
          </button>
        </GridToolbar>
        <Column field="name" title="Name" cell={NameCell} />
        <Column cell={commandCell(onRemove)} width="240px" />
      </Grid>
    </ParentFieldContext.Provider>
  );
};

export default function FormDemo() {
  const handleSubmit = (dataItem) => console.log(JSON.stringify(dataItem));

  return (
    <Form
      initialValues={{
        users: []
      }}
      onSubmit={handleSubmit}
      render={(formRenderProps) => (
        <FormElement>
          <FieldArray
            name="users"
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
  );
}