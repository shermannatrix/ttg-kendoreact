import React from 'react';
import '@progress/kendo-theme-material/dist/all.css';
// import SimpleForm from './components/simple-form';
import './App.css';
import FormsAndLabels from './components/forms-labels';

function App() {
	return (
		<div className="App">
			<h1>Deep-diving into the Form Component in KendoReact!</h1>
			{/* <SimpleForm /> */}
			<FormsAndLabels />
		</div>
	);
}

export default App;
