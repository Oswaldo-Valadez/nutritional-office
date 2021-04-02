import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import React from 'react'

function Datatable({ data, title, onRowClick }) {
    const getMuiTheme = () => createMuiTheme({
        overrides: {
            MuiTableBody: {
                root: {
                    backgroundColor: '#FAFAFA'
                }
            }
        }
    })

    const getRows = () => {
        let rows = []
        data?.forEach(row => {
            rows.push(Object.values(row))
        });
        return (rows)
    }

    const getColumns = () => {
        if (data[0]) return (Object.keys(data[0]));
        else return ['Sin información'];
    }

    const opciones = () => {
        return {
            selectableRows: false,
            rowsPerPage: 10,
            rowsPerPageOptions: [10, 20, 50],
            responsive: 'standard',
            download: false,
            onRowClick: onRowClick
        }
    }

    return (
        <div>
            {data ? (
                <MuiThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable
                        title={title}
                        data={getRows()}
                        columns={getColumns()}
                        options={opciones()}
                    />
                </MuiThemeProvider>
            )
                : (<div />)}
        </div>
    )
}

export default Datatable
