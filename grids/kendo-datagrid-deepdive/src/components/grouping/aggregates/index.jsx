import { useState } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';
import { 
  setExpandedState,
  setGroupIds,
} from '@progress/kendo-react-data-tools';
import { sampleProducts as products } from '../../../data/sample-products';
import '@progress/kendo-theme-material/dist/material-lime-dark.css';

const initialDataState = {
  take: 10,
  skip: 0,
  group: [
    {
      field: "UnitsInStock",
    },
    {
      field: "ProductName",
    },
  ],
};

const aggregates = [
  {
    field: "UnitsInStock",
    aggregate: "sum",
  },
  {
    field: "UnitPrice",
    aggregate: "average",
  },
];

const processWithGroups = (data, dataState) => {
  const groups = dataState.group;
  if (groups) { 
    groups.map((group) => (group.aggregates = aggregates));
  }
  dataState.group = groups;
  const newDataState = process(data, dataState);
  setGroupIds({
    data: newDataState.data,
    group: dataState.group,
  });
  return newDataState;
};

function ProductsGrid() {
  const [dataState, setDataState] = useState(initialDataState);
  const [result, setResult] = useState(
    processWithGroups(products, initialDataState)
  );
  const [collapsedState, setCollapsedState] = useState([]);
  const dataStateChange = (event) => {
    const newDataState = processWithGroups(products, event.dataState);
    setResult(newDataState);
    setDataState(event.dataState);
  };

  const expandChange = (event) => {
    const item = event.dataItem;
    if (item.groupId) {
      const newCollapsedIds = !event.value
        ? [...collapsedState, item.groupId]
        : collapsedState.filter((groupId) => groupId !== item.groupId);
      setCollapsedState(newCollapsedIds);
    }
  };

  const cellRender = (tdElement, cellProps) => {
    if (cellProps.rowType === "groupFooter") {
      if (cellProps.field === "UnitPrice") {
        return (
          <td aria-colindex={cellProps.columnIndex} role={"gridcell"}>
            Average: {cellProps.dataItem.aggregates.UnitPrice.average}
          </td>
        );
      } else if (cellProps.field === "UnitsInStock") {
        return (
          <td aria-colindex={cellProps.columnIndex} role={"gridcell"}>
            Sum: {cellProps.dataItem.aggregates.UnitsInStock.sum}
          </td>
        );
      }
    }
    return tdElement;
  };

  const newData = setExpandedState({
    data: result.data,
    collapsedIds: collapsedState,
  });

  return (
    <Grid
      style={{
        height: "520px",
      }}
      resizable={true}
      reorderable={true}
      filterable={true}
      sortable={true}
      pageable={{
        pageSizes: true,
      }}
      groupable={{
        footer: "visible",
      }}
      data={newData}
      onDataStateChange={dataStateChange}
      {...dataState}
      onExpandChange={expandChange}
      expandField="expanded"
      cellRender={cellRender}
    >
      <Column field="ProductID" filterable={false} title="ID" width="50px" />
      <Column field="ProductName" title="Product Name" />
      <Column field="UnitPrice" title="Unit Price" filter="numeric" />
      <Column field="UnitsInStock" title="Units In Stock" filter="numeric" />
      <Column field="Category.CategoryName" title="Category Name" />
    </Grid>
  );
}

export default ProductsGrid;