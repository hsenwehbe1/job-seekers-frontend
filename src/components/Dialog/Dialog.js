import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import classes from './Dialog.css'
import Tip1 from '../../assets/icons/Dialog1.svg'
import Tip2 from '../../assets/icons/Dialog2.svg'
import Tip3 from '../../assets/icons/Dialog3.svg'
import Tip4 from '../../assets/images/lkn.png'
import { Link } from 'react-router-dom';
export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(props.isShown);
  const [radio, setRadio] = React.useState({
      radio1: true,
      radio2: false,
      radio3: false,
      radio4: false
  })
  const handleClickOpen = ()=>{
    setOpen(true);
  };
  const handleClose = ()=>{
    localStorage.removeItem('dialog')
    setOpen(false);
  };
  const rightHandler = ()=>{
    if(radio.radio1){
        setRadio({
            radio1: false,
            radio2: true,
            radio3: false,
            radio4: false
        })   
    }else if (radio.radio2){
        setRadio({
            radio1: false,
            radio2: false,
            radio3: true,
            radio4: false
        }) 
    }else if(radio.radio3){
        setRadio({
            radio1: false,
            radio2: false,
            radio3: false,
            radio4: true
        }) 
    }else{
      setRadio({
          radio1: true,
          radio2: false,
          radio3: false,
          radio4: false
      }) 
    }
  }
  const leftHandler = ()=>{
    if(radio.radio1){
        setRadio({
            radio1: false,
            radio2: false,
            radio3: false,
            radio4: true
        })   
    }else if (radio.radio2){
        setRadio({
            radio1: true,
            radio2: false,
            radio3: false,
            radio4: false
        }) 
    }else if(radio.radio3){
        setRadio({
            radio1: false,
            radio2: true,
            radio3: false,
            radio4: false
        }) 
    }else{
      setRadio({
          radio1: false,
          radio2: false,
          radio3: true,
          radio4: false
      }) 
    }
  }
  let pic = ''
  let text = ''
  if(radio.radio1){
      text = 'Choosing a college major is hard, not to mention a career. Talk to our network of experts and hear about their journeys'
      pic = <img src={Tip1} alt='a' className='img-fluid'/>
  }else if(radio.radio2){
      text = 'Use our assessment to learn about emerging career opportunities that are relevant to your unique interests'
      pic = <img src={Tip2} alt='a' className='img-fluid'/>
  }else if(radio.radio3){
      text = 'Use our tool to help guide you on your career journey and build your network'
      pic = <img src={Tip3} alt='a' className='img-fluid'/>
  }else if(radio.radio4){
      text = <span><Link onClick={()=>{window.open('https://www.linkedin.com/signup/cold-join?trk=guest_homepage-basic_nav-header-join')}}>Create your LinkedIn account</Link> as soon as possible to connect and chat with our mentors, as well as gain exposure to Hiring Managers and Recruiters</span>
      pic = <img src={Tip4} alt='a' className='img-fluid'/>
}
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent>
            <div className="text-center">
                {pic}
                <i onClick = {rightHandler} className={`fas fa-arrow-circle-right ${classes.rightarrow}`}></i>
                <i onClick={leftHandler} className={`fas fa-arrow-circle-left ${classes.leftarrow}`}></i>
                <br></br>
                <span className={classes.text}>
                    {text}
                </span><br></br>
                <span className={classes.pr_2}><input type="radio" name="tips1" checked={radio.radio1}/></span><span className={classes.pr_2}><input type="radio" name="tips1" checked={radio.radio2}/></span><span className={classes.pr_2}><input type="radio" name="tips1" checked={radio.radio3}/></span><span className={classes.pr_2}><input type="radio" name="tips1" checked={radio.radio4}/></span>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Exit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}