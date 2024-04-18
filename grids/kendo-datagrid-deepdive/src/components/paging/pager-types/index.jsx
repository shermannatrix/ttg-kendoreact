import { useState } from 'react';
import { NumericTextBox } from '@progress/kendo-react-inputs';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { sampleProducts as products } from '../../../data/sample-products';

function ProductsGrid() {
	const createState = (skip, take) => {
		let pagerSettings = {
			buttonCount: 5,
			info: true,
			type: "numeric",
			pageSizes: true,
			previousNext: true,
		};

		return {
			items: products.slice(skip, skip + take),
			total: products.length,
			skip: skip,
			pageSize: take,
			pageable: pagerSettings,
		};
	};

	const [state, setState] = useState(createState(0, 10));
	const pageChange = (event) => {
		setState(createState(event.page.skip, event.page.take));
	};

	const updatePagerState = (key, value) => {
		const newPageableState = Object.assign({}, state.pageable, {
			[key]: value,
		});
		setState(
			Object.assign({}, state, {
				pageable: newPageableState,
			})
		);
	};

	return (
		<div>
			<div className="example-config row">
				<div className="col-md-6">
					<dl>
						<dt>Pager type</dt>
						<dd>
							<input
								type="radio"
								name="pager"
								id="numeric"
								className="k-radio k-radio-md"
								value="numeric"
								defaultChecked={true}
								onChange={(e) => {
									updatePagerState("type", e.target.value);
								}}
							/>
							<label className="k-radio-label" htmlFor="numeric">
								Numeric&nbsp;
							</label>
							<input
								type="radio"
								name="pager"
								id="input"
								className="k-radio k-radio-md"
								value="input"
								onChange={(e) => {
									updatePagerState("type", e.target.value);
								}}
							/>
							<label className="k-radio-label" htmlFor="input">
								Input&nbsp;
							</label>
						</dd>
					</dl>
					<dl>
						<dt>Max. number of buttons</dt>
						<dd>
							<div
								style={{
									width: 100,
								}}
							>
								<NumericTextBox
									defaultValue={5}
									className="k-input k-input-md k-rounded-md k-input-solid k-input-solid-md"
									onChange={(e) => {
										updatePagerState("buttonCount", e.value);
									}}
								/>
							</div>
						</dd>
					</dl>
				</div>
				<div className="cold-md-6 row">
					<div className="col-md-12">
						<input
							className="k-checkbox k-checkbox-md k-rounded-md"
							defaultChecked={true}
							id="showInfo"
							type="checkbox"
							onChange={(e) => {
								updatePagerState("info", e.target.value);
							}}
						/>
						<label htmlFor="showInfo" className="k-checkbox-label">
							Show info
						</label>
					</div>

					<div className="col-md-12">
						<input className="k-checkbox k-checkbox-md k-rounded-md"
							defaultChecked={true}
							id="pageSize"
							type="checkbox"
							onChange={(e) => {
								updatePagerState("pageSizes", e.target.checked);
							}}
						/>
						<label htmlFor="pageSize" className="k-checkbox-label">
							Show page sizes
						</label>
					</div>

					<div className="col-md-12">
						<input
							className="k-checkbox k-checkbox-md k-rounded-md"
							defaultChecked={true}
							id="previousNext"
							type="checkbox"
							onChange={(e) => {
								updatePagerState("previousNext", e.target.checked);
							}}
						/>
						<label htmlFor="previousNext" className="k-checkbox-label">
							Show previous / next buttons	
						</label>
					</div>
				</div>
			</div>
			<Grid
				style={{
					height: "280px",
				}}
				data={state.items}
				onPageChange={pageChange}
				total={state.total}
				skip={state.skip}
				pageable={state.pageable}
				pageSize={state.pageSize}
			>
				<Column field="ProductID" />
				<Column field="ProductName" title="Product Name" />
				<Column field="UnitPrice" title="Unit Price" />
			</Grid>
		</div>
	);
}

export default ProductsGrid;