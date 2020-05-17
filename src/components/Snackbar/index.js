import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}



export default function SnackBars(props) {
    const { openSuccessSnackbar, openErrorSnackbar, handleClose,message } = props
    return (
        <div>
            <Snackbar open={openSuccessSnackbar} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar open={openErrorSnackbar} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}

SnackBars.propTypes = {
    openSuccessSnackbar: PropTypes.bool,
    openErrorSnackbar: PropTypes.bool,
    handleClose: PropTypes.func,
    message: PropTypes.string
}