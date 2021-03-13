import Container from '@material-ui/core/Container';
import Typography  from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LinearStepper from './LinearStepper';

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

  return (
    <Container maxWidth="md">
       <Box my={4} >
        <Typography variant="h4" component="h1">
              TOPSIS React
          </Typography>
      <LinearStepper />
      </Box>
    </Container>
  );
}

export default App;
