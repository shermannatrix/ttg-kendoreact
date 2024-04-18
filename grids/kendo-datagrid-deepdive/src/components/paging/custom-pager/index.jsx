import { useState } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Slider, NumericTextBox } from '@progress/kendo-react-inputs';
import { sampleProducts as products } from '../../../data/sample-products';

const MyPager = (props) => {
	const currentPage = Math.floor(props.skip / props.take) + 1;
	const totalPages = Math.ceil((props.total || 0) / props.take);
	const handleChange = (e) => {
		if (props.onPageChange) {
			props.onPageChange({
				target: e.target,
				skip: (e.value - 1) * props.take,
				take: props.take,
				syntheticEvent: e,
				nativeEvent: e.nativeEvent,
			});
		}
	};

	return (
		<div 
			className="k-pager k-pager-md k-grid-pager"
			style={{
				borderTop: "1px solid",
				borderTopColor: "inherit",
			}}
		>
			<div className="col-4">
				<Slider
					buttons={true}
					step={1}
					value={currentPage}
					min={1}
					max={totalPages}
					onChange={handleChange}
				/>
			</div>
			<div className="col-4">
				<NumericTextBox
					value={currentPage}
					onChange={handleChange}
					min={1}
					max={totalPages}
				/>
			</div>
			<div className="col-4">
				{`Page ${currentPage} or ${totalPages}`}
			</div>
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
				<Column field="UnitPrice" title="Unit Price" />
			</Grid>
		</div>
	);
}

export default ProductsGrid;