import { useState } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { sampleProducts as products } from '../../../data/sample-products';

const initialDataState = {
	skip: 0,
	take: 10,
};

function ProductsGrid() {
	const [page, setPage] = useState(initialDataState);
	const [pageSizeValue, setPageSizeValue] = useState();

	const pageChange = (event) => {
		const targetEvent = event.targetEvent;
		const take = targetEvent.value === 'All' 
			? products.length
			: event.page.take;
		
		if (targetEvent.value) {
			setPageSizeValue(targetEvent.value);
		}
		setPage({
			...event.page,
			take,
		});
	};

	return (
		<Grid
			style={{
				height: "400px",
			}}
			data={products.slice(page.skip, page.take + page.skip)}
			skip={page.skip}
			take={page.take}
			total={products.length}
			pageable={{
				buttonCount: 4,
				pageSizes: [5, 10, 15, "All"],
				pageSizeValue: pageSizeValue,
			}}
			onPageChange={pageChange}
		>
			<Column field="ProductID" />
			<Column field="ProductName" title="Product Name" />
			<Column field="UnitPrice" title="Unit Price" />
		</Grid>
	);
}

export default ProductsGrid;