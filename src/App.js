import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Typography  from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CriteriaTable from './CriteriaTable';
import Form from './Form';
import Grid from './Grid';
import GridForm from './GridForm';
import topsis_predict from "./topsis";

const useStyles = makeStyles(theme => ({
  root : {
    margin: theme.spacing(6,0,3)
  },
}));

const criteriaToDataColumns = (criteria) => criteria.map((d) => (
  {
    field: d.criterionName,
    headerName: [...d.criterionName[0].toUpperCase(), d.criterionName.slice(1)],
    type: 'number'
  }
));
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
    criteria: [],
    sum: 0,
    disabledForm: false,
    disableGrid: true,
    dataset: []
  });

  const  styles  = useStyles();
  
  const removeRow = (idx) => {
    const nextSum = state.sum - parseInt(state.criteria[idx].weight);
    setState({...state,
      criteria: [...state.criteria.filter((d,i) => i !== idx)],
      sum: nextSum,
      disabledForm: nextSum >= 100,
      disableGrid: nextSum === 0
    });
  };

  const handleSubmit = (row) => {
    //check the weights
    const nextSum = state.sum + parseInt(row.weight);
    setState({...state,
      criteria: [...state.criteria, {...row, weight: parseInt(row.weight)}],
      sum: nextSum,
      disabledForm: nextSum >= 100,
      disableGrid: false
    });
    
  };

  const handleGridSubmit = (row) => {
    setState({...state,
      dataset: [...state.dataset, row]
    })
  }

  return (
    <Container maxWidth="md">
       <Box my={4} >
        <Typography variant="h4" component="h1">
              TOPSIS React
          </Typography>
        <Box my={4} display="flex" flexDirection="column" width={500}>
          <CriteriaTable  rows={state.criteria} removeRow={removeRow}/>
          <Form disabled={state.disabledForm} handleSubmit={handleSubmit} />
        </Box>
        {
        !state.disableGrid && 
          <Box >
          <Grid dataset={state.dataset} columns={criteriaToDataColumns(state.criteria)} />
          <GridForm disabled={state.disableGrid} handleSubmit={handleGridSubmit} />
          </Box>
        }
       </Box>
    </Container>
  );
}

export default App;
