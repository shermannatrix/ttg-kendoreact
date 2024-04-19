import { useState, useCallback } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';
import {
	setExpandedState,
	setGroupIds,
} from '@progress/kendo-react-data-tools';
import { sampleProducts as products } from '../../../data/sample-products';

const initialDataState = {
	take: 10,
	skip: 0,
	group: [
		{
			field: "Category.CategoryName",
		},
	],
};

const processWithGroups = (data, dataState) => {
	const newDataState = process(data, dataState);
	setGroupIds({
		data: newDataState.data,
		group: dataState.group,
	});
	return newDataState;
};

function ProductsGrid() {
	const [dataState, setDataState] = useState(initialDataState);
	const [resultState, setResultState] = useState(
		processWithGroups(products, initialDataState)
	);
	const [collapsedState, setCollapsedState] = useState([]);
	const onDataStateChange = useCallback((event) => {
		const newDataState = processWithGroups(products, event.dataState);
		setDataState(event.dataState);
		setResultState(newDataState);
	}, []);

	const onExpandChange = useCallback(
		(event) => {
			const item = event.dataItem;
			if (item.groupId) {
				const collapsedIds = !event.value
					? [...collapsedState, item.groupId]
					: collapsedState.filter((groupId) => groupId !== item.groupId);
				setCollapsedState(collapsedIds);
			}
		},
		[collapsedState]
	);

	const newData = setExpandedState({
		data: resultState.data,
		collapsedIds: collapsedState,
	});

	return (
		<Grid
			style={{
				height: "520px",
				width: "850px",
			}}
			pageable={{
				pageSizes: true,
			}}
			groupable={true}
			lockGroups={true}
			data={newData}
			total={resultState.total}
			onDataStateChange={onDataStateChange}
			{...dataState}
			onExpandChange={onExpandChange}
			expandField="expanded"
		>
			<Column
				field="ProductName"
				title="Product Name"
				width="250px"
				locked={true}
			/>
			<Column
				field="Category.CategoryName"
				title="Category Name"
				width="150px"
				locked={true}
			/>
			<Column field="Discontinued" title="Discontinued" width="140px" />
			<Column field="UnitPrice" title="Unit Price" width="120px" />
			<Column field="UnitsInStock" title="Units In Stock" width="150px" />
			<Column field="QuantityPerUnit" title="Quantity Per Unit" width="200px" />
			<Column
				field="Category.Description"
				title="Category Description"
				width="400px"
			/>
			<Column field="UnitsOnOrder" title="Units on Order" width="150px" />
		</Grid>
	);
}

export default ProductsGrid;