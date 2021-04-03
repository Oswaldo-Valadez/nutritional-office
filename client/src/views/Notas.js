import React, { useEffect, useState } from "react";

import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Typography,
  Fab,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";

import Datatable from "../components/Datatable";
import VisitNoteDialog from "../components/VisitNoteDialog";
import axios from "../config/axios";
import { useHistory } from "react-router-dom";

function Notas() {
  const [data, setData] = useState(null);
  const [noteData, setNoteData] = useState(null);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const getNotas = async () => {
      axios
        .get("/notas")
        .then((res) => {
          setData(res.data.notas);
          console.log(res.data.notas);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getNotas();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getNoteData = async (id, nombre) => {
    axios
      .get("notas/" + id)
      .then((res) => {
        let result = res.data.nota;
        result.nombre = nombre;
        setNoteData(result);
        handleClickOpen();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            Inicio
          </Link>
          <Typography color="textPrimary">Notas de visita</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid item xs={12}>
        <Datatable
          data={data}
          title="Notas de visita"
          onRowClick={(rowData) => getNoteData(rowData[0], rowData[1])}
        />
      </Grid>

      <VisitNoteDialog data={noteData} open={open} handleClose={handleClose} />
      <Fab
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          zIndex: "1000",
        }}
        tooltip="HOLA"
        color="primary"
        onClick={() => history.push("/notas/nuevaNota")}
      >
        <AddIcon />
      </Fab>
    </Grid>
  );
}

export default Notas;
