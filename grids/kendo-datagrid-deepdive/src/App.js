import * as React from 'react';
// import SoftwareVerGrid from './components/custom-sort-compare/SoftwareVerGrid';
import './App.css';
// import ProductFiltering from './components/filtering-basics/ProductFiltering';
import ProductsGrid from './components/grouping/aggregates';

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
