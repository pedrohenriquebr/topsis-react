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
import { useTranslation,  } from 'react-i18next';
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import XLSX from 'xlsx';
import {criteriaToDataColumns} from './helpers';

// Helper function to reorder list
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

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


export default function LinearStepper(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const dataColumnName = t('DATA_COLUMN_NAME');
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
  const steps = ['INSERTCRITERIA','INSERTDATASET', 'SEERESULTS'];

  
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

  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }

    const items = reorder(
      state.criteria,
      result.source.index,
      result.destination.index
    );

    setState({
      ...state,
      criteria: items,
    });
  };

  const mapRows = (row, idx) => {
    let _row = {...row};
    _row.name = _row[dataColumnName];
    delete _row[dataColumnName];
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

  const handleRandomizeWeights = () => {
    if (state.criteria.length === 0) {
      return;
    }

    // Deep copy criteria
    const newCriteria = JSON.parse(JSON.stringify(state.criteria));

    // Generate N random numbers with order-based bias
    const N = newCriteria.length;
    const randomNumbers = newCriteria.map((_, i) => (Math.random() * (N - i)) + 0.0001);

    // Calculate sum of random numbers
    let sumOfRandomNumbers = randomNumbers.reduce((acc, val) => acc + val, 0);

    // Handle edge case where sum is 0
    if (sumOfRandomNumbers === 0) {
      // Assign equal weights if sum is 0
      const equalWeight = Math.floor(100 / newCriteria.length);
      let remainder = 100 % newCriteria.length;
      newCriteria.forEach((criterion, index) => {
        criterion.weight = equalWeight + (remainder > 0 ? 1 : 0);
        if (remainder > 0) {
          remainder--;
        }
      });
      setState({
        ...state,
        criteria: newCriteria,
        sum: 100,
        disabledForm: true,
      });
      return;
    }

    // Calculate proportional weights and round them
    let roundedWeights = newCriteria.map((criterion, index) => {
      const proportionalWeight = (randomNumbers[index] / sumOfRandomNumbers) * 100;
      return Math.round(proportionalWeight);
    });

    // Calculate sum of rounded weights
    let currentSumRounded = roundedWeights.reduce((acc, val) => acc + val, 0);

    // Calculate difference
    let diff = 100 - currentSumRounded;

    // Distribute the difference
    // Add or subtract difference from weights one by one
    // This simple distribution might not be perfectly even but works for most cases
    for (let i = 0; i < Math.abs(diff); i++) {
      const weightIndexToAdjust = i % roundedWeights.length;
      if (diff > 0) {
        roundedWeights[weightIndexToAdjust]++;
      } else {
        // Ensure weight doesn't go below 0, though unlikely with positive random numbers
        if (roundedWeights[weightIndexToAdjust] > 0) {
          roundedWeights[weightIndexToAdjust]--;
        } else {
          // If a weight is already 0 and we need to decrease, try the next one
          // This could be improved by finding a non-zero weight to decrement
           for(let j = 0; j < roundedWeights.length; j++) {
             const nextIndex = (weightIndexToAdjust + j + 1) % roundedWeights.length;
             if (roundedWeights[nextIndex] > 0) {
                roundedWeights[nextIndex]--;
                break;
             }
           }
        }
      }
    }
    
    // Update the weight property of each criterion
    newCriteria.forEach((criterion, index) => {
      criterion.weight = roundedWeights[index];
    });

    // Update state
    setState({
      ...state,
      criteria: newCriteria,
      sum: 100, // Sum is now 100
      disabledForm: true, // Form should be disabled as sum is 100
      disableGrid: false, // Enable grid as criteria are now set with weights
    });
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Box>
            <CriteriaTable 
                rows={state.criteria} 
                removeRow={removeRow} 
                handleOnDragEnd={handleOnDragEnd} 
            />
            <Box mt={2} mb={2}> {/* Added Box for spacing */}
              <Button
                variant="outlined" // Added variant for better appearance
                color="secondary" // Added color for distinction
                className={classes.button}
                onClick={handleRandomizeWeights} // Connected the function
                disabled={state.criteria.length === 0}
              >
                Randomize Weights
              </Button>
            </Box>
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
        return <Typography>{t('UNKNOWN_STEP')}</Typography>;
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

  return (
    <Box className={classes.root}>
      <Stepper activeStep={activeStep}>
       {steps.map((label, idx) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{t(label)}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <div>
          <Typography className={classes.instructions}>
            {t('ALL_STEPS_COMPLETED')}
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
              {t('BUTTON_BACK')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={(activeStep === 0 && state.disableGrid )|| (activeStep === 1 && state.disableResults)}
              className={classes.button}
            >
              {activeStep === steps.length - 1 ? t('BUTTON_FINISH') : t('BUTTON_NEXT')}
            </Button>
          </div>
        </div>
      )}
    </Box>
  );
}
