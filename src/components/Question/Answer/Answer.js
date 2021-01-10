import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function RadioButtonsGroup(props) {
  const [value, setValue] = React.useState('strongly agree');

  const handleChange = (event) => {
    props.questionHandler(event.target.value, 1)
    setValue(event.target.value);
  };
  console.log(value)
  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="strongly agree" control={<Radio />} label="Strongly Agree" />
        <FormControlLabel value="agree" control={<Radio />} label="Agree" />
        <FormControlLabel value="disagree" control={<Radio />} label="Disagree" />
        <FormControlLabel value="strongly disagree" control={<Radio />} label="Strongly Disagree" />
      </RadioGroup>
    </FormControl>
  );
}