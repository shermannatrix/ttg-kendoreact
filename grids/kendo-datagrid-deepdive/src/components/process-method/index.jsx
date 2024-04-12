import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';
import { sampleProducts } from '../../data/sample-products';
import { ColumnMenuItem } from '@progress/kendo-react-data-tools';

const initialDataState = {
	sort: [
		{
			field: "ProductName",
			dir: "asc",
		},
	],
	take: 5,
	skip: 0,
	filter: {
		logic: "and",
		filters: [
			{
				field: "ProductName",
				operator: "contains",
				value: "Chef",
			},
		],
	},
};

function ProductsGrid() {
	const [dataState, setDataState] = useState(initialDataState);
	const [dataResult, setDataResult] = useState(
		process(sampleProducts, dataState)
	);

	const onDataStateChange = (e) => {
		setDataState(e.dataState);
		setDataResult(process(sampleProducts, e.dataState));
	};

	return (
		<Grid
			style={{
				height: "350px",
				width: "950px",
			}}
			data={dataResult}
			filterable={true}
			pageable={true}
			{...dataState}
			onDataStateChange={onDataStateChange}
		>
			<Column field="ProductID" title="ID" filterable={false} width="60px" />
			<Column field="ProductName" title="Product Name" width="240px" />
			<Column
				field="FirstOrderedOn"
				width="240px"
				filter="date"
				format="{0:d}"
			/>
			<Column field="UnitPrice" width="180px" filter="numeric" format="{0:c}" />
			<Column field="Discontinued" width="190px" filter="boolean" />
		</Grid>
	);
}

export default ProductsGrid;