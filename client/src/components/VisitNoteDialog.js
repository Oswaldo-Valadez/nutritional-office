import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Box, Divider } from '@material-ui/core';
import { dateTimeToDate, getICCResult, getIMCResult } from '../utils/functions';
import moment from "moment";
import "moment/locale/es";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

export default function VisitNoteDialog({ data, open, handleClose }) {
    return (
        <div>
            <Dialog onClose={handleClose} open={open} >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Nota de visita
                </DialogTitle>
                <Divider />
                {data ? (
                    <>
                        <DialogTitle>
                            <Box display='flex'>
                                <Box flexGrow={1} style={{ marginRight: 50 }}>
                                    <Typography variant='subtitle1'>
                                        {data.nombre}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant='subtitle1'>
                                        {moment(data.register_date).format("DD/MM/YYYY")}
                                    </Typography>
                                </Box>
                            </Box>
                        </DialogTitle>
                        <DialogContent dividers>
                            <Typography gutterBottom>
                                <b>Peso: </b>{data.weight}kg
                            </Typography>
                            <Typography gutterBottom>
                                <b>Talla: </b>{data.size}m
                            </Typography>
                            <Typography gutterBottom>
                                <b>Cintura: </b>{data.waist}cm
                            </Typography>
                            <Typography gutterBottom>
                                <b>Cadera: </b>{data.hip}cm
                            </Typography>
                            <Typography gutterBottom>
                                <b>Presión arterial alta: </b>{data.blood_pressure_high}mmHg
                            </Typography>
                            <Typography gutterBottom>
                                <b>Presión arterial baja: </b>{data.blood_pressure_low}mmHg
                            </Typography>
                            <Typography gutterBottom>
                                <b>IMC: </b>{data.bmi} - {getIMCResult(data.bmi)}
                            </Typography>
                            <Typography gutterBottom>
                                <b>ICC: </b>{data.whr} - {getICCResult(data.whr, data.waist, 0)}
                            </Typography>
                            <Typography gutterBottom>
                                <b>Anotaciones: </b>{data.annotations}
                            </Typography>
                        </DialogContent>
                    </>
                )
                    : (<DialogContent>Sin información</DialogContent>)}
            </Dialog>
        </div>
    );
}
