import * as React from 'react';
import {
	GridColumnMenuFilter,
	GridColumnMenuCheckboxFilter
} from '@progress/kendo-react-grid';
import { sampleProducts } from '../../data/sample-products';

export const ColumnMenu = (props) => {
	return (
		<div>
			<GridColumnMenuFilter {...props} expanded={true} />
		</div>
	);
};

export const ColumnMenuCheckboxFilter = (props) => {
	return (
		<div>
			<GridColumnMenuCheckboxFilter
				{...props}
				data={sampleProducts}
				expanded={true}
			/>
		</div>
	);
};