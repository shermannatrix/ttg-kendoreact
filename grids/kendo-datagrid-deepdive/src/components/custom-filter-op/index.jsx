import { useState } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { filterBy } from '@progress/kendo-data-query';
import { sampleProducts as products } from '../../data/sample-products';

const initialFilter = {
	logic: "and",
	filters: [
		{
			field: "ProductName",
			operator: "contains",
			value: "Chef",
		},
	],
};

const filterOperators = {
	text: [
		{
			text: "grid.filterContainsOperator",
			operator: "contains",
		},
	],
	numeric: [
		{
			text: "grid.filterEqOperator",
			operator: "eq",
		},
	],
	date: [
		{
			text: "grid.filterEqOperator",
			operator: "eq",
		},
	],
	boolean: [
		{
			text: "grid.filterEqOperator",
			operator: "eq",
		},
	],
};

function ProductsGrid() {
	const [filter, setFilter] = useState(initialFilter);
	return (
		<Grid
			style={{
				height: "420px",
			}}
			data={filterBy(products, filter)}
			filterable={true}
			filter={filter}
			filterOperators={filterOperators}
			onFilterChange={(e) => {
				setFilter(e.filter);
			}}
		>
			<Column field="ProductID" title="ID" filterable={false} width="60px" />
			<Column field="ProductName" title="Product Name" />
			<Column
				field="FirstOrderedOn"
				width="220px"
				filter="date"
				format="{0:d}"
			/>
			<Column field="UnitPrice" width="180px" filter="numeric" format="{0:c}" />
			<Column field="Discontinued" width="190px" filter="boolean" />
		</Grid>
	);
}

export default ProductsGrid;