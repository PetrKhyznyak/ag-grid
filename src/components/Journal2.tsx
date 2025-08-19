import {type FC, type JSX, useState} from "react"
import {AllCommunityModule, type CellValueChangedEvent, type GridReadyEvent, ModuleRegistry} from 'ag-grid-community';
import type {
    ColDef,
    ColGroupDef,
} from 'ag-grid-community';
import {AgGridReact} from 'ag-grid-react';
import dataList from "../data/mock-data.json";
import headers from "../data/headers.json";

ModuleRegistry.registerModules([AllCommunityModule]);

type CellValue = string | number | boolean | null | undefined;
type RowData = {
    [key: string]: {
        [field: string]: CellValue;
    } | CellValue | undefined;
};

type AutoSize =
    | { type: "fitGridWidth" }
    | { type: "fitProvidedWidth", width: number }
    | { type: "fitCellContents" }




const Journal2: FC = () => {
    const data = dataList.find(item => item.id === 7);
    const header = headers.find(item => item.id === 7);
    const [rowData, setRowData] = useState<RowData[]>(data?.data ?? []);


    let columnDefs = (header?.headers ?? []) as (ColDef<RowData> | ColGroupDef<RowData>)[];

    columnDefs = columnDefs.map(col => {
        // Только для ColDef, у ColGroupDef нет 'field'
        if ((col as ColDef<RowData>).type === 'spacer') {
            return {
                ...col,
                valueGetter: () => '',
            } as ColDef<RowData>;
        }

        if (header?.id === 7 && col.field === 'workParameters') {
            return {
                ...col,
                tooltipValueGetter: (params: RowData) => params.value,
            }
        }
        return col;
    });

    const handelCellValueChange = (params: CellValueChangedEvent<RowData>) => {
        if(params.node.rowIndex != null) {
            const updatedData = [...rowData];
            updatedData[params.node.rowIndex] = params.data;
            setRowData(updatedData);
        }
    }
    const isValidAutoSize = (autoSize: string | undefined): autoSize is "fitGridWidth" | "fitProvidedWidth" | "fitCellContents" => {
        return ["fitGridWidth", "fitProvidedWidth", "fitCellContents"].includes(autoSize ?? "");
    }

    const getAutoSizeStrategy = (autoSize: string | undefined): AutoSize => {
        if (!isValidAutoSize(autoSize)) {
            return { type: 'fitGridWidth' };
        }
        if (autoSize === "fitProvidedWidth") {
            return { type: 'fitProvidedWidth', width: header?.width ? Number(header.width) : 100 };
        }
        return { type: autoSize };
    }

    console.log(rowData);
    console.log(columnDefs);

    return (
        <div className="ag-theme-alpine" style={{maxHeight: '600px', overflowY: 'scroll', width: "100%", overflow: "visible"}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                onCellValueChanged={handelCellValueChange}
                domLayout="autoHeight"
                onGridReady={(params: GridReadyEvent) => {
                    params.api.sizeColumnsToFit()
                }}
                defaultColDef={{
                    resizable: false,
                    autoHeight: true,
                    minWidth: header?.minWidth ? Number(header?.minWidth) : 50,
                    maxWidth: header?.maxWidth ?? 200,
                    suppressSizeToFit: false,
                    wrapHeaderText: true,
                    autoHeaderHeight: true
                }}

            />
        </div>
    )
}

export default Journal2;