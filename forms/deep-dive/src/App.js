import React from 'react';
// import SimpleForm from './components/simple-form';
import './App.css';
// import FormsAndLabels from './components/forms-labels';
import FormDemo from './components/checkboxes-radiobuttons';
import '@progress/kendo-theme-material/dist/material-lime-dark.css';

function App() {
	return (
		<div className="App">
			<h1>Deep-diving into the Form Component in KendoReact!</h1>
			<FormDemo />
			{/* <SimpleForm /> */}
			{/* <FormsAndLabels /> */}
		</div>
	);
}

export default App;
