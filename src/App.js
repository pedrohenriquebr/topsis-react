import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Typography  from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CriteriaTable from './CriteriaTable';
import Form from './Form';
import topsis_predict from "./topsis";

const useStyles = makeStyles(theme => ({
  root : {
    margin: theme.spacing(6,0,3)
  },
}));

function App() {
  const criteria = [
    { name: "Price", type: 1, weight: 0.1 },
    { name: "Hardware", type: 2, weight: 0.2 },
    { name: "Screen", type: 2, weight: 0.3 },
    { name: "Camera", type: 2, weight: 0.05 },
    { name: "Performance", type: 2, weight: 0.4 },
  ];

  const dataset = [
    [749, 5.1, 5.5, 4.2, 4.7],
    [5599, 9, 8.4, 8.8, 9.3],
    [699, 4.8, 5.1, 4.2, 4.2],
    [1368, 7.7, 8.6, 8.3, 4.6],
  ];

  const [state, setState] = useState({
    rows: []
  });

  const  styles  = useStyles();
  const removeRow = (idx) => {
    setState({...state, rows: [...state.rows.filter((d,i) => i !== idx)]});
  };

  const handleSubmit = (row) => {
    setState({...state, rows: [...state.rows, row]});
  };

  return (
    <Container maxWidth="md">
       <Box my={4} >
        <Typography variant="h4" component="h1">
              TOPSIS React
          </Typography>
        <Box my={4} display="flex" flexDirection="column" width={500}>
          <CriteriaTable  rows={state.rows} removeRow={removeRow}/>
          <Form handleSubmit={handleSubmit}/>
        </Box>
       </Box>
    </Container>
  );
}

export default App;
