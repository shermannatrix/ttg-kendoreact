import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';

const products = [
  {
    ProductID: 1,
    version: "8.1.1",
  },
  {
    ProductID: 2,
    version: "5.2.5",
  },
  {
    ProductID: 3,
    version: "40.1.2",
  },
  {
    ProductID: 3,
    version: "1.1.2",
  },
  {
    ProductID: 3,
    version: "1.1.21",
  },
  {
    ProductID: 3,
    version: "40.1.8",
  },
  {
    ProductID: 3,
    version: "40.1.1",
  },
  {
    ProductID: 3,
    version: "40.1.40",
  },
];

function compareVersions(version1, version2) {
	const splitVersion1 = version1.split(".");
	const splitVersion2 = version2.split(".");
	const maxLength = Math.max(splitVersion1.length, splitVersion2.length);
	for (let i = 0; i < maxLength; i++) {
		const num1 = parseInt(splitVersion1[i] || "0");
		const num2 = parseInt(splitVersion2[i] || "0");
		if (num1 < num2) {
			return -1;
		} else if (num1 > num2) {
			return 1;
		}
	}
	return 0;
}

const customVersionCompare = (a, b, dir) => {
	const correction = dir === "asc" ? 1 : -1;
	return correction * compareVersions(a.version, b.version);
};

const initialDataState = {
	sort: [
		{
			field: "version",
			dir: "asc",
			compare: (a, b) => customVersionCompare(a, b, "asc"),
		},
	],
	take: 10,
	skip: 0,
};

function SoftwareVerGrid() {
	const [dataState, setDataState] = React.useState(initialDataState);
	const [dataResult, setDataResult] = React.useState(process(products, dataState));

	const onDataStateChange = (e) => {
		if (e.dataState.sort) {
			e.dataState.sort = e.dataState.sort.map((sort) => {
				if (sort.field == "version") {
					return {
						...sort, 
						compare: (a, b) => customVersionCompare(a, b, sort.dir),
					};
				}
				return sort;
			});
		}
		setDataState(e.dataState);
		setDataResult(process(products, e.dataState));
	};

	return (
		<Grid
			style={{
				height: "420px",
			}}
			data={dataResult}
			sortable={true}
			pageable={true}
			{...dataState}
			onDataStateChange={onDataStateChange}
		>
			<Column field="ProductID" title="Product Id" filter={"numeric"} />
			<Column field="version" />
		</Grid>
	);

	return (
		<>
		</>
	);
}

export default SoftwareVerGrid;