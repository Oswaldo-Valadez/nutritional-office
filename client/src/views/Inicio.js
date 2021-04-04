import React, { Fragment } from "react";

import { Paper, Grid, Typography } from "@material-ui/core";

const Inicio = () => {
  return (
    <Grid container spacing={3}>
      <Grid xs={12} item>
        <Paper variant="outlined" style={{ padding: "30px", textAlign:"center" }}>
          <Typography variant="h1">
            Bienvenido al Sistema de la Oficina Nutricional
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Inicio;
