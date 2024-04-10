import { useState } from 'react';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { ColumnMenu, ColumnMenuCheckboxFilter } from './columnMenu';
import { sampleProducts as products } from '../../data/sample-products';

const createDataState = (dataState) => {
	return {
		result: process(products.slice(0), dataState),
		dataState: dataState,
	};
};

function ProductsGrid() {
	let initialState = createDataState({
		take: 8,
		skip: 0,
	});

	const [result, setResult] = useState(initialState.result);
	const [dataState, setDataState] = useState(initialState.dataState);
	const dataStateChange = (event) => {
		let updatedState = createDataState(event.dataState);
		setResult(updatedState.result);
		setDataState(updatedState.dataState);
	};

	return (
		<Grid
			data={result}
			{...dataState}
			onDataStateChange={dataStateChange}
			sortable={true}
			pageable={true}
			pageSize={8}
		>
			<Column 
				field="ProductName" 
				columnMenu={ColumnMenuCheckboxFilter} 
			/>
			<Column 
				field="UnitPrice" 
				filter={"numeric"} 
				columnMenu={ColumnMenu} 
			/>
			<Column 
				field="Discontinued" 
				filter={"boolean"} 
				columnMenu={ColumnMenuCheckboxFilter} 
			/>
		</Grid>
	);
}

export default ProductsGrid;