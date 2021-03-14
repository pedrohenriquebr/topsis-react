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
import topsis_predict from "./topsis";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

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

const criteriaToDataColumns = (criteria) =>
  [{field: 'name', headerName: 'Nome', width: 200},
    ...criteria.map((d) => ({
    field: d.criterionName,
    headerName: [...d.criterionName[0].toUpperCase(), d.criterionName.slice(1)],
    type: "number",
    width: 160 
  }))]

export default function LinearStepper(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    criteria: [],
    sum: 0,
    disabledForm: false,
    disableGrid: true,
    dataset: [],
  });

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

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
              columns={criteriaToDataColumns(state.criteria)}
            />
            <GridForm
              disabled={state.disableGrid}
              handleSubmit={handleGridSubmit}
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

  const handleGridSubmit = (row) => {
    setState({ ...state, dataset: [...state.dataset, row] });
  };

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
              disabled={state.disableGrid}
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
