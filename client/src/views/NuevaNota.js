import { Box, Button, Card, CardContent, Container, Divider, Grid, Paper, TextField, Typography } from '@material-ui/core'
import React from 'react'
import '../App.css'

function NuevaNota() {
    return (
        <Container style={{ marginTop: 20 }}>
            <Grid container spacing={2}>
                <Grid item sm={9}>
                    <Paper elevation={3} style={{ padding: 15 }} >
                        <Typography variant='h5' paragraph >Nueva nota de visita</Typography>
                        <Box display='flex'>
                            <Box flexGrow={1}>
                                <Typography variant='h6'>Nombre del paciente</Typography>
                            </Box>
                            <Box>
                                <Typography variant='h6' paragraph>01/04/2021</Typography>
                            </Box>
                        </Box>
                        <form noValidate >
                            <Grid container spacing={2} >
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="lastName"
                                        label="Peso actual(Kg)"
                                        name="lastName"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="lastName"
                                        label="Talla(m)"
                                        name="lastName"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="lastName"
                                        label="Cintura(cm)"
                                        name="lastName"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="lastName"
                                        label="Cadera(cm)"
                                        name="lastName"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="lastName"
                                        label="Presión arterial alta"
                                        name="lastName"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="lastName"
                                        label="Presión arterial baja"
                                        name="lastName"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant='h6'>IMC:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant='h6'>ICC:</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        id="lastName"
                                        label="Anotaciones"
                                        name="lastName"
                                        multiline
                                        rows={3}
                                    />
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: 15, marginBottom: 10 }}
                                >
                                    Aceptar
                                </Button>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
                <Grid item sm={3} >
                    <aside>
                        <Paper elevation={2} style={{ padding: 15 }}>
                            <Typography variant='h5'>Nota de visita anterior</Typography>
                            <Divider style={{ marginTop: 15, marginBottom: 15 }} />
                            Información
                        </Paper>
                    </aside>
                </Grid>
            </Grid>
        </Container>
    )
}

export default NuevaNota
