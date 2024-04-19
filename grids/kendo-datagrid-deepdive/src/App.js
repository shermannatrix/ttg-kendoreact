import * as React from 'react';
// import SoftwareVerGrid from './components/custom-sort-compare/SoftwareVerGrid';
import './App.css';
// import ProductFiltering from './components/filtering-basics/ProductFiltering';
import ProductsGrid from './components/databinding/odata-server';
import '@progress/kendo-theme-material/dist/material-lime-dark.css';

function App() {
	
	return (
		<div className="App">
			<h1>Welcome to my Deep-dive into Kendo DataGrid!</h1>
			<ProductsGrid />
			{/* <ProductFiltering /> */}
			{/* <SoftwareVerGrid /> */}
		</div>
	);
}

export default App;
