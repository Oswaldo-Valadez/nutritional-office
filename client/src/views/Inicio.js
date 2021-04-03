import React, { Fragment } from "react";

import { Paper, Grid, Typography } from "@material-ui/core";

const Inicio = () => {
  return (
    <Grid container spacing={3}>
      <Grid xs={12} item component={Paper} style={{ padding: "30px" }}>
          <Typography>
              Bienvenido al Sistema de la Oficina Nutricional
          </Typography>
      </Grid>
    </Grid>
  );
};

export default Inicio;
