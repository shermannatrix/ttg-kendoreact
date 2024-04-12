import { useState } from 'react';
import {
	Grid,
	GridColumn as Column,
	GridToolbar
} from '@progress/kendo-react-grid';
import { Input } from '@progress/kendo-react-inputs';
import { filterBy } from '@progress/kendo-data-query';
import {sampleProducts as products} from '../../data/sample-products';

function ProductsGrid() {
	const [data, setData] = useState(products);
	const filterData = (e) => {
		let value = e.target.value;
		let filter = {
			logic: "or",
			filters: [
				{
					field: "ProductID",
					operator: "contains",
					value: value,
				},
				{
					field: "ProductName",
					operator: "contains",
					value: value,
				},
				{
					field: "Category.CategoryName",
					operator: "contains",
					value: value,
				},
				{
					field: "UnitPrice",
					operator: "contains",
					value: value,
				},
				{
					field: "UnitsInStock",
					operator: "contains",
					value: value,
				}
			],
		};
		setData(filterBy(products, filter));
	};

	return (
		<Grid
			style={{
				height: "400px"
			}}
			data={data}
		>
			<GridToolbar>
				<Input onChange={filterData} />
			</GridToolbar>
			<Column field="ProductID" title="ID" width="40px" />
			<Column field="ProductName" title="Name" width="250px" />
			<Column field="Category.CategoryName" title="CategoryName" />
			<Column field="UnitPrice" title="Price" />
			<Column field="UnitsInStock" title="In stock" />
		</Grid>
	);
}

export default ProductsGrid;