import {type FC, type JSX, useState} from "react"
import {AllCommunityModule, ModuleRegistry} from 'ag-grid-community';
import type {ColDef, ColGroupDef} from 'ag-grid-community';
import {AgGridReact} from 'ag-grid-react';
import dataList from "../data/mock-data.json";
import headers from "../data/headers.json"

ModuleRegistry.registerModules([AllCommunityModule]);

type CellValue = string | number | boolean | null | undefined;
type RowData = {
    [key: string]: {
        [field: string]: CellValue;
    } | CellValue | undefined;
};


const Journal: FC = () => {
    const data = dataList.find(item => item.id === 2);
    const header = headers.find(item => item.id === 2);
    const [rowData, setRowData] = useState<RowData[] | undefined>(data?.data);


    const columnDefs = (header?.headers ?? []) as (ColDef<RowData> | ColGroupDef<RowData>)[];


    const handelCellValueChange = (params: any) => {
        const updatedData = [...rowData];
        updatedData[params.node.rowIndex] = params.data;
        setRowData(updatedData);
    }

    console.log(rowData);

    return (
        <div className="ag-theme-alpine" style={{height: '100%', width: "100%"}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                onCellValueChanged={handelCellValueChange}
                suppressMovableColumns={true}
                defaultColDef={{
                    resizable: false,
                    minWidth: 80,
                    maxWidth: 100
                }}

            />
        </div>
    )
}

export default Journal;