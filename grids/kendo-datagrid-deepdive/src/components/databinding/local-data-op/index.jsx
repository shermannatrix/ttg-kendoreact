import { useState } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';
import { sampleProducts as products } from '../../../data/sample-products';

const initialDataState = {
	sort: [
		{
			field: "code",
			dir: "asc",
		},
	],
	take: 10,
	skip: 0,
	group: [
		{
			field: "CategoryID",
		},
	],
};

const DiscontinuedCell = (props) => (
	<td {...props.tdProps}>
		<input
			disabled={true}
			type="checkbox"
			checked={props.dataItem[props.field || ""]}
		/>
	</td>
);

function ProductsGrid() {
	const [dataState, setDataState] = useState(initialDataState);
	const [dataResult, setDataResult] = useState(process(products, dataState));

	const expandChange = (event) => {
		const isExpanded = 
			event.dataItem.expanded === undefined
				? event.dataItem.aggregates
				: event.dataItem.expanded;
			event.dataItem.expanded = !isExpanded;
			setDataResult({
				...dataResult,
				data: [...dataResult.data],
			});
	};

	return (
		<Grid
			pageable={true}
			sortable={true}
			filterable={true}
			groupable={true}
			expandField="expanded"
			onExpandChange={expandChange}
			style={{
				height: "400px",
			}}
			data={dataResult}
			{...dataState}
			onDataStateChange={(e) => {
				setDataState(e.dataState);
				setDataResult(process(products, e.dataState));
			}}
		>
			<Column field="ProductID" title="ID" width="80px" filterable={false} />
			<Column field="CategoryID" title="CategoryID" width="250px" />
			<Column field="ProductName" title="Name" width="250px" />
			<Column field="UnitPrice" title="Price" filter="numeric" width="150px" />
			<Column field="UnitsInStock" title="In stock" filter="numeric" width="150px" />
			<Column field="Discontinued" filter="boolean" cells={{data: DiscontinuedCell}} />
		</Grid>
	);
}

export default ProductsGrid;