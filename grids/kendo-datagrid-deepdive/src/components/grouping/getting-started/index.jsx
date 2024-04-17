import { useState, useCallback } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { groupBy } from '@progress/kendo-data-query';
import {
	setExpandedState,
	setGroupIds
} from '@progress/kendo-react-data-tools';
import { sampleProducts as products } from '../../../data/sample-products';

const initialGroup = [
	{
		field: "UnitsInStock",
	},
	{
		field: "ProductName",
	}
];

const processWithGroups = (data, group) => {
	const newDataState = groupBy(data, group);
	setGroupIds({
		data: newDataState,
		group: group,
	});
	return newDataState;
};

function ProductsGrid() {
	const [group, setGroup] = useState(initialGroup);
	const [resultState, setResultState] = useState(processWithGroups(products, initialGroup));
	const [collapsedState, setCollapsedState] = useState([]);

	const onGroupChange = useCallback((event) => {
		const newGroups = event.group;
		const areNewGroupsUnique = !newGroups.some(
			(item, index) => newGroups.findIndex((group) => group.field === item.field) !== index
		);

		if (areNewGroupsUnique) {
			const newDataState = processWithGroups(products, event.group);
			setGroup(event.group);
			setResultState(newDataState);
		}
	}, []);

	const onExpandChange = useCallback(
		(event) => {
			const item = event.dataItem;
			if (item.groupId) {
				const newCollapsedIds = !event.value
					? [...collapsedState, item.groupId]
					: collapsedState.filter((groupId) => groupId !== item.groupId);
				setCollapsedState(newCollapsedIds);
			}
		},
		[collapsedState]
	);

	const newData = setExpandedState({
		data: resultState,
		collapsedIds: collapsedState,
	});

	return (
		<Grid
			style={{
				width: "700px",
			}}
			groupable={true}
			data={newData}
			onGroupChange={onGroupChange}
			group={group}
			onExpandChange={onExpandChange}
			expandField="expanded"
		>
			<Column field="ProductID" filterable={false} title="ID" width="50px" />
			<Column field="ProductName" title="Product Name" />
			<Column field="UnitPrice" title="Unit Price" filter="numeric" />
			<Column field="UnitsInStock" title="Units In Stock" filter="numeric" />
			<Column field="Category.CategoryName" title="Category Name" />
		</Grid>
	);

}

export default ProductsGrid;