import type {FC, JSX} from "react"
import {useState} from "react";
import {AllCommunityModule, ModuleRegistry} from 'ag-grid-community';
import type {ColDef, ColGroupDef} from 'ag-grid-community';
import {AgGridReact} from 'ag-grid-react';

ModuleRegistry.registerModules([AllCommunityModule]);


const Journal: FC = () => {
    const [rowData, setRowData] = useState([
        {
            well: 'well 1',
            condensatePlannedProduction: null,
            condensateProduction: 5,
            oilPlannedProduction: 10,
            oilProduction: 15,
        },
        {
            well: 'well 2',
            condensatePlannedProduction: 4,
            condensateProduction: 8,
            oilPlannedProduction: 10,
            oilProduction: 11,
        },
        {
            well: 'well 3',
            condensatePlannedProduction: 7,
            condensateProduction: 2,
            oilPlannedProduction: 5,
            oilProduction: 7,
        },
        {
            well: 'well 4',
            condensatePlannedProduction: null,
            condensateProduction: null,
            oilPlannedProduction: 6,
            oilProduction: 2,
        },
    ]);

    const handelChangeInput = () => {

    }
    const columnData: (ColDef | ColGroupDef)[] = [
        {field: 'well', headerName: 'Родовище',},
        {
            headerName: "Видобуток конденсату, т/добу",
            children: [
                {
                    field: 'condensatePlannedProduction',
                    headerName: 'План',
                    editable: true,
                    cellEditorParams: {
                        pattern: '/^[+-]?(\\d+\\.?\\d*|\\.\\d+)$/',
                        inputType: 'number',
                    },
                },
                {
                    field: 'condensateProduction',
                    headerName: 'Факт',
                    editable: true,
                    cellEditorParams: {
                        pattern: '/^[+-]?(\\d+\\.?\\d*|\\.\\d+)$/',
                        inputType: 'number',
                    },
                },
            ]
        },
        {
            headerName: 'Видобуток нафти, т/добу',
            children: [
                {
                    field: 'oilPlannedProduction',
                    headerName: 'План',
                    editable: true,
                    cellEditorParams: {
                        pattern: '/^[+-]?(\\d+\\.?\\d*|\\.\\d+)$/',
                        inputType: 'number',
                    },
                },
                {
                    field: 'oilProduction',
                    headerName: 'Факт',
                    editable: true,
                    cellEditorParams: {
                        pattern: '/^[+-]?(\\d+\\.?\\d*|\\.\\d+)$/',
                        inputType: 'number',
                    },
                },
            ]
        }
    ];

    return (
        <div className="ag-theme-alpine" style={{height: '100%', width: "100%"}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnData}
                autoSizeStrategy={{
                    type: 'fitGridWidth'
                }}
                suppressMovableColumns={true}
                defaultColDef={{
                    resizable: false
                }}

            />
        </div>
    )
}

export default Journal;