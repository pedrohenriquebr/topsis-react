import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CriteriaTable from "./CriteriaTable";
import Form from "./Form";
import Grid from "./Grid";
import GridForm from "./GridForm";
import ResultGrid from './ResultGrid';
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import XLSX from 'xlsx';
import {criteriaToDataColumns} from './helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(6, 0, 3),
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Insira os critérios", "Insira as alternativas", "Veja o resulado"];
}



export default function LinearStepper(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    criteria: [],
    sum: 0,
    disabledForm: false,
    disableGrid: true,
    disableResults: true,
    dataset: [],
    loading: false
  });

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  
  const handleSubmit = (row) => {
    //check the weights
    const nextSum = state.sum + parseInt(row.weight);
    setState({
      ...state,
      criteria: [...state.criteria, { ...row, weight: parseInt(row.weight) }],
      sum: nextSum,
      disabledForm: nextSum >= 100,
      disableGrid: false,
    });
  };

  const mapRows = (row, idx) => {
    let _row = {...row};
    _row.name = _row.Nome;
    delete _row.Nome;
   return  {..._row, 
          name: _row.name, 
          id: idx + state.dataset.length }
  };

  const handleGridSubmit = (row) => {
    setState({ ...state, dataset: [...state.dataset, {...row, id: state.dataset.length}], disableResults: false});
  };

  const handleFile = (file) => {
    setState({...state, loading: true});
		const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 0 });
      console.log(data.map(mapRows));
       setState({...state, dataset: data.map(mapRows),
          disableResults: false,
          loading: false
        });
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Box>
            <CriteriaTable rows={state.criteria} removeRow={removeRow} />
            <Form disabled={state.disabledForm} handleSubmit={handleSubmit} />
          </Box>
        );
      case 1:
        return (
          <Box>
            <Grid
              dataset={state.dataset}
              disable={state.disableGrid}
              columns={criteriaToDataColumns(state.criteria)}
              loading={state.loading}
            />
            <GridForm
              fields={state.criteria.map(d => d.criterionName)}
              disabled={state.disableGrid}
              handleSubmit={handleGridSubmit}
              handleFile={handleFile}
            />
          </Box>
        );
      case 2:
        return (
          <Box>
           <ResultGrid
            dataset={state.dataset}
            disable={state.disableResults}
            criteria={state.criteria}
           />
          </Box>
      );
      default:
        return <Typography>Etapa desconhecida</Typography>;
    }
  }

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const removeRow = (idx) => {
    const nextSum = state.sum - parseInt(state.criteria[idx].weight);
    setState({
      ...state,
      criteria: [...state.criteria.filter((d, i) => i !== idx)],
      sum: nextSum,
      disabledForm: nextSum >= 100,
      disableGrid: nextSum === 0,
    });
  };

  useEffect(() =>{
    setState({
        ...state,
        criteria:[
            {criterionName: 'Preço', type: 1, weight: 10},
            {criterionName: 'Hardware', type: 2, weight: 20},
            {criterionName: 'Performance', type: 2, weight: 70},
        ],
        disableGrid: false,
        disableResuls: true
    })
  },[])

  return (
    <Box className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, idx) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <div>
          <Typography className={classes.instructions}>
            Todas as etapas completadas
          </Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </div>
      ) : (
        <div>
          <div>{getStepContent(activeStep)}</div>
          <div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={(activeStep == 0 && state.disableGrid )|| (activeStep == 1 && state.disableResults)}
              className={classes.button}
            >
              {activeStep === steps.length - 1 ? "Finalizar" : "Próximo"}
            </Button>
          </div>
        </div>
      )}
    </Box>
  );
}
