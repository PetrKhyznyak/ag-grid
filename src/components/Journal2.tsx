import {type FC, type JSX, useState} from "react"
import {AllCommunityModule, type CellValueChangedEvent, ModuleRegistry} from 'ag-grid-community';
import type {
    ColDef,
    ColGroupDef,
} from 'ag-grid-community';
import {AgGridReact} from 'ag-grid-react';
import dataList from "../data/mock-data.json";
import headers from "../data/headers.json"
import {_logIfDebug} from "ag-grid-community/dist/types/src/utils/function";

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
    const data = dataList.find(item => item.id === 1);
    const header = headers.find(item => item.id === 1);
    const [rowData, setRowData] = useState<RowData[]>(data?.data ?? []);


    let columnDefs = (header?.headers ?? []) as (ColDef<RowData> | ColGroupDef<RowData>)[];

    // Добавляем spacer в рантайме
    columnDefs = columnDefs.map(col => {
        // Только для ColDef, у ColGroupDef нет 'field'
        if ((col as ColDef<RowData>).type === 'spacer') {
            console.log(1)
            return {
                ...col,
                valueGetter: () => '',
            } as ColDef<RowData>;
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
        <div className="ag-theme-alpine" style={{height: '100%', width: "100%"}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                onCellValueChanged={handelCellValueChange}
                onGridReady={(params) => {
                    params.api.sizeColumnsToFit();
                }}
                autoSizeStrategy={{
                    type: "fitGridWidth",
                }}
                defaultColDef={{
                    resizable: false,
                    minWidth: header?.minWidth ? Number(header?.minWidth) : 50,
                    maxWidth: header?.maxWidth
                }}
            />
        </div>
    )
}

export default Journal2;