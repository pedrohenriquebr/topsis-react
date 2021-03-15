import Container from '@material-ui/core/Container';
import Typography  from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LinearStepper from './LinearStepper';

function App() {
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
