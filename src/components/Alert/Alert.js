import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/alert'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function SnackbarElement(props) {
  const classes = useStyles();
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.triggerAlert(false, props.alertType, props.alertMessage)
  };

  return (
    <div className={classes.root}>
      <Snackbar open={props.alertOpen} autoHideDuration={props.alertDuration} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.alertType}>
            {props.alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    alertOpen: state.alertState.alertOpen,
    alertType: state.alertState.alertType,
    alertMessage: state.alertState.alertMessage,
    alertDuration: state.alertState.alertDuration
  };
};
const mapDispatchToProps = dispatch => {
  return {
      triggerAlert: (alertOpen, alertType, alertMessage, alertDuration) => dispatch(actions.triggerAlert(alertOpen, alertType, alertMessage, alertDuration))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SnackbarElement);