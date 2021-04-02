import { Breadcrumbs, Button, Container, Link, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Datatable from '../components/Datatable';
import VisitNoteDialog from '../components/VisitNoteDialog';
import axios from "../config/axios";
import { useHistory } from "react-router-dom";

function Notas() {
    const [data, setData] = useState(null);
    const [noteData, setNoteData] = useState(null);
    const [open, setOpen] = useState(false);
    const history = useHistory()

    useEffect(() => {
        const getNotas = async () => {
            axios.get('/notas').then(res => {
                setData(res.data.notas);
                console.log(res.data.notas);
            })
                .catch(err => {
                    console.log(err);
                })
        }
        getNotas();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const getNoteData = async (id, nombre) => {
        axios.get('notas/' + id).then(res => {
            let result = res.data.nota;
            result.nombre = nombre;
            setNoteData(result);
            handleClickOpen();
        })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Container>
            <center>
                <Typography variant='h4' style={{ marginTop: 20, marginBottom: 30 }}>
                    Notas de visita
                </Typography>
            </center>

            <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: 20 }}>
                <Link color="inherit" href="/" >
                    Inicio
                </Link>
                <Typography color="textPrimary">Notas de visita</Typography>
            </Breadcrumbs>

            <Button color='primary' 
            variant='contained' 
            style={{ marginBottom: 20 }}
            onClick={() => history.push('/notas/nuevaNota')} >
                Nueva nota de visita
            </Button>
            <Datatable data={data} title='Notas de visita' onRowClick={(rowData) => getNoteData(rowData[0], rowData[1])} />
            <VisitNoteDialog data={noteData} open={open} handleClose={handleClose} />
        </Container>
    )
}

export default Notas
