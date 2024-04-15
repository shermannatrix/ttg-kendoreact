import { useState } from 'react';
import {
	Grid,
	GridColumn as Column
} from '@progress/kendo-react-grid';
import { filterBy } from '@progress/kendo-data-query';
import { RangeFilterCell } from './rangeFilterCell';
import { DropDownFilterCell } from './dropdownFilterCell';
import { sampleProducts as products } from './../../../data/sample-products';

const categories = Array.from(
	new Set(
		products.map((p) => (p.Category ? p.Category.CategoryName : ""))
	)
);

const CategoryFilterCell = (props) => (
	<DropDownFilterCell
		{...props}
		data={categories}
		defaultItem={"Select category"}
	/>
);

function ProductsGrid() {
	const [data, setData] = useState(products);
	const [filter, setFilter] = useState();
	const filterChange = (event) => {
		setData(filterBy(products, event.filter));
		setFilter(event.filter);
	};

	return (
		<Grid
			style={{
				height:"400px",
			}}
			data={data}
			filterable={true}
			filter={filter}
			onFilterChange={filterChange}
		>
			<Column field="ProductID" title="ID" filterable={false} width="60px" />
			<Column field="ProductName" title="Product Name" />
			<Column
				field="Category.CategoryName"
				title="CategoryName"
				filterCell={CategoryFilterCell}
			/>
			<Column
				field="UnitPrice"
				title="Unit Price"
				format="{0:c}"
				filterCell={RangeFilterCell}
			/>
		</Grid>
	);
}

export default ProductsGrid;