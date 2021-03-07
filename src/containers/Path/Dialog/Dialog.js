import React from 'react'
import classes from './Dialog.css'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Slide from '@material-ui/core/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(props.isShown);

  const handleClose = () => {
      props.handler()
    setOpen(false)
  }
  let content = (
      props.data.map((element, index)=>{
          return <div className='mb-3'><img src={`data:image/png;base64,${element.image}`} alt='Advisor' style={{'marginRight':'10px'}} className='rounded-circle' width='40px' height='40px' key={`p${index}`}/> <span onClick={()=>{window.location.pathname=`advisor/${element._id}`}} className={classes.name}>{element.fname} {element.lname}</span></div>
      })
  )
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}