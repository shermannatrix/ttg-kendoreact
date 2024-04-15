import { useState } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Pager } from '@progress/kendo-react-data-tools';
import { sampleProducts as products } from '../../../data/sample-products';

const MyPager = (props) => {
	return (
		<div
			style={{
				overflow: "hidden",
			}}
		>
			<Pager
				responsive={true}
				skip={props.skip}
				take={props.take}
				total={200}
				onPageChange={props.onPageChange}
				buttonCount={5}
				info={true}
				previousNext={true}
				type="numeric"
				pageSizes={[10, 15, 20]}
			/>
		</div>
	);
};

function ProductsGrid() {
	const [page, setPage] = useState({
		skip: 0,
		take: 10,
	});

	const pageChange = (event) => {
		setPage(event.page);
	};

	return (
		<div>
			<Grid
				style={{
					height: "400px",
				}}
				data={products.slice(page.skip, page.take + page.skip)}
				skip={page.skip}
				take={page.take}
				total={products.length}
				pageable={true}
				onPageChange={pageChange}
				pager={MyPager}
			>
				<Column field="ProductID" />
				<Column field="ProductName" title="Product Name" />
				<Column field="Unit Price" title="Unit Price" />
			</Grid>
		</div>
	);
}

export default ProductsGrid;