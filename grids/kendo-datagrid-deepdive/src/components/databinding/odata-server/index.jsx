import { useState } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { ProductsLoader } from './products-loader';

function ProductsGrid() {
	const [products, setProducts] = useState({
		data: [],
		total: 77,
	});

	const [dataState, setDataState] = useState({
		take: 10,
		skip: 0,
	});

	const dataStateChange = (e) => {
		setDataState(e.dataState);
	};

	const dataReceived = (products) => {
		if (products.data) {
			setProducts(products);
		} else {
			setProducts({
				data: [],
				total: 0,
			});
		}
	};

	return (
		<div>
			<Grid
				filterable={true}
				sortable={true}
				pageable={true}
				{...dataState}
				data={products}
				onDataStateChange={dataStateChange}
			>
				<Column field="ProductID" filter="numeric" title="ID" />
				<Column field="ProductName" title="Name" />
				<Column field="UnitPrice" filter="numeric" format="{0:c}" title="Price" />
				<Column field="UnitsInStock" filter="numeric" title="In stock" />
			</Grid>

			<ProductsLoader dataState={dataState} onDataReceived={dataReceived} />
		</div>
	);
}

export default ProductsGrid;