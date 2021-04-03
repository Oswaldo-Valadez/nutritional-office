import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import React from "react";

function Datatable({ data, title, onRowClick }) {
  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiPaper: {
          root: {
            border: "1px solid rgba(0, 0, 0, 0.12)",
          },
        },
      },
    });

  const getRows = () => {
    let rows = [];
    data?.forEach((row) => {
      rows.push(Object.values(row));
    });
    return rows;
  };

  const columns = [
    {
      name: "id_nota",
      label: "ID Nota",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "nombre",
      label: "Nombre Completo",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "fecha",
      label: "Fecha",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "idExpediente",
      label: "ID Expediente",
      options: {
        filter: true,
        sort: false,
        display: false
      }
    },
    {
      name: "genero",
      label: "Género",
      options: {
        filter: true,
        sort: false,
        display: false
      }
    },
  ];

  const opciones = () => {
    return {
      selectableRows: false,
      rowsPerPage: 10,
      rowsPerPageOptions: [10, 20, 50],
      responsive: "standard",
      download: false,
      print: false,
      onRowClick: onRowClick,
      elevation: 0,
      textLabels: {
        body: {
          noMatch: "Lo sentimos, no hemos encontrado registros.",
          toolTip: "Ordenar",
          columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
        },
        pagination: {
          next: "Siguiente página",
          previous: "Página anterior",
          rowsPerPage: "Filas por página:",
          displayRows: "de",
        },
        toolbar: {
          search: "Buscar",
          downloadCsv: "Descargar CSV",
          print: "Imprimir",
          viewColumns: "Ver columnas",
          filterTable: "Filtrar Tabla",
        },
        filter: {
          all: "Todo",
          title: "FILTROS",
          reset: "REINICIAR",
        },
        viewColumns: {
          title: "Mostrar Columnas",
          titleAria: "Mostrar/Ocultar Columnas de la Tabla",
        },
        selectedRows: {
          text: "fila(s) seleccionadas",
          delete: "Eliminat",
          deleteAria: "Eliminar Filas Seleccionadas",
        },
      },
    };
  };

  return (
    <div>
      {data ? (
        <MuiThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={title}
            data={getRows()}
            columns={columns}
            options={opciones()}
          />
        </MuiThemeProvider>
      ) : (
        <div />
      )}
    </div>
  );
}

export default Datatable;
