import React from "react";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import {
  FormDropDownList,
  FormAutoComplete,
  FormComboBox,
  FormDropDownTree,
  FormMultiColumnComboBox,
} from "../../form-components";
import { requiredValidator } from "../../form-components/validators";
import { countries, employees, genders, sizes, equipment } from "../../../data";
import { Ripple } from '@progress/kendo-react-ripple';

function FormDemo() {
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
							id={"countryselected"}
							name={"countryselected"}
							label={"Country"}
							hint={"Hint: Only European countries"}
							component={FormAutoComplete}
							data={countries}
							validator={requiredValidator}
						/>
						<Field
							id={"genderselected"}
							name={"genderselected"}
							label={"Gender"}
							component={FormComboBox}
							textField={"label"}
							data={genders}
							validator={requiredValidator}
						/>
						<Field
							id={"name"}
							name={"name"}
							label={"Name and Position"}
							hint={"Hint: Only employees"}
							component={FormMultiColumnComboBox}
							data={employees}
							validator={requiredValidator}
						/>
						<Field
							id={"equipment"}
							name={"equipment"}
							label={"Home Equipment"}
							textField={"text"}
							dataItemKey={"id"}
							selectedField={"selected"}
							expandField={"expanded"}
							component={FormDropDownTree}
							data={equipment}
							validator={requiredValidator}
						/>
						<Field
							id={"size"}
							name={"size"}
							label={"T-Shirt Size"}
							component={FormDropDownList}
							data={sizes}
							validator={requiredValidator}
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

export default FormDemo;
