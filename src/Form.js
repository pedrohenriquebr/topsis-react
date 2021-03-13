import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import {makeStyles} from "@material-ui/core/styles";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0 , 1),
    minWidth: 150
  },
  button: {
    margin: theme.spacing(1,0)
  },
  form : {
    margin: theme.spacing(2,0),
  }
}));

export default function Form(props) {
    const initState = {
        criterionName: ' ',
        weight: 0,
        type: 1
    };

    const styles  = useStyles();
    const [state, setState] = useState(initState);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState({...state,
          [name]: value,
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
        props.handleSubmit(state);
        setState(initState);
    }
      
    const {criterionName, weight, type} = state;
  return (
        <form  className={styles.form} >
            <Box display="flex" flexDirection='row'>
              <TextField required name="criterionName" className={styles.input} label="Critério" variant="filled" value={criterionName} onChange={handleChange} />
              <FormControl required className={styles.formControl} variant="filled">
                <InputLabel id="label-type">Tipo</InputLabel>
                <Select
                  
                  labelId="label-type"
                  name="type"
                  value={type}
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Custo</MenuItem>
                  <MenuItem value={2}>Benefício</MenuItem>
                </Select>
              </FormControl>
              <TextField required className={styles.input} type="number"  name="weight"  label="Peso (%)" variant="filled" value={weight} onChange={handleChange} />
            </Box>
            <Button className={styles.button} type="submit" onClick={submitForm} variant="contained" color="primary"> Adicionar </Button>
        </form>
  );
}
