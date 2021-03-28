import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import {makeStyles} from "@material-ui/core/styles";
import { useState } from "react";
import { useTranslation } from "react-i18next";

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
        criterionName: '',
        weight: 0,
        type: 1
    };

    const styles  = useStyles();
    const [state, setState] = useState(initState);
    const { t, i18n } = useTranslation();


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
        <form disabled className={styles.form} onSubmit={submitForm}>
            <Box display="flex" flexDirection='row'>
              <TextField  disabled={props.disabled} required name="criterionName" 
              className={styles.input} label={t('DATA_COLUMN_CRITERION')} variant="filled" 
              value={criterionName} onChange={handleChange} />
              <FormControl disabled={props.disabled} required className={styles.formControl} variant="filled">
                <InputLabel id="label-type">{t('DATA_COLUMN_TYPE')}</InputLabel>
                <Select
                  labelId="label-type"
                  name='type'
                  value={type}
                  onChange={handleChange}
                >
                  <MenuItem value={1}>{t('CRITERION_TYPE_COST')}</MenuItem>
                  <MenuItem value={2}>{t('CRITERION_TYPE_BENEFIT')}</MenuItem>
                </Select>
              </FormControl>

              <TextField disabled={props.disabled} required className={styles.input}
                type="number"  name="weight" label={t('DATA_COLUMN_WEIGHT') + " (%)"} variant="filled" 
                value={weight} onChange={handleChange} 
              />
            </Box>

            <Button disabled={props.disabled} className={styles.button} type="submit"  variant="contained" color="primary"> {t('BUTTONS_ADD')} </Button>
        </form>
  );
}
