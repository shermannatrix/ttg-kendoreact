import { useState } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Slider, SliderLabel } from '@progress/kendo-react-inputs';
import { Checkbox } from '@progress/kendo-react-inputs';
import { sampleProducts as products } from '../../../data/sample-products';

const initialDataState = {
	skip: 0,
	take: 10,
};

function ProductsGrid() {
	const [value, setValue] = useState(7);
	const [responsive, setResponsive] = useState(true);
	const [page, setPage] = useState(initialDataState);
	const [checkboxValue, setCheckboxValue] = useState(true);
	const [pageSizeValue, setPageSizeValue] = useState();
	const [gridWidth, setGridWidth] = useState(700);

	const pageChange = (event) => {
		const targetEvent = event.targetEvent;
		const take = targetEvent.value === "All" ? products.length : event.page.take;
		if (targetEvent.value) {
			setPageSizeValue(targetEvent.value);
		}
		setPage({
			...event.page,
			take,
		});
	};

	const handleSliderChange = (e) => {
		setValue(e.value);
		const newGridWidth = e.value * 100;
		setGridWidth(newGridWidth);
		console.log(newGridWidth);
	};

	const handleCheckboxChange = () => {
		const newCheckboxValue = !checkboxValue;
		setCheckboxValue(newCheckboxValue);
		setResponsive(newCheckboxValue);
	};

	return (
		<div>
			<div>
				<div className="example-config row">
					<Checkbox
						checked={checkboxValue}
						onChange={handleCheckboxChange}
						label={"Responsive Pager"}
					/>
				</div>
				<Slider
					buttons={true}
					step={2}
					defaultValue={7}
					min={1}
					max={10}
					onChange={handleSliderChange}
					value={value}
				>
					<SliderLabel position={1}>300</SliderLabel>
					<SliderLabel position={3}>400</SliderLabel>
					<SliderLabel position={5}>500</SliderLabel>
					<SliderLabel position={7}>600</SliderLabel>
					<SliderLabel position={10}>700</SliderLabel>
				</Slider>
				<br /><br />
			</div>
			<Grid
				key={gridWidth}
				style={{
					height: "400px",
					width: `${gridWidth}px`,
				}}
				data={products.slice(page.skip, page.take + page.skip)}
				skip={page.skip}
				take={page.take}
				total={products.length}
				pageable={{
					buttonCount: 4,
					pageSizes: [5, 10, 15, "All"],
					pageSizeValue: pageSizeValue,
					responsive: responsive,
				}}
				onPageChange={pageChange}
			>
				<Column field="ProductID" />
				<Column field="ProductName" title="Product Name" />
				<Column field="UnitPrice" title="Unit Price" />
			</Grid>
		</div>
	);
}

export default ProductsGrid;