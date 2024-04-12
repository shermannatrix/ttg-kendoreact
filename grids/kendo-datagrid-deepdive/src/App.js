import * as React from 'react';
// import SoftwareVerGrid from './components/custom-sort-compare/SoftwareVerGrid';
import './App.css';
import '@progress/kendo-theme-default/dist/all.css';
// import ProductFiltering from './components/filtering-basics/ProductFiltering';
import ProductsGrid from './components/filtering/custom-filter-op';

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
