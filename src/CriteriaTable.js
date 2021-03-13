import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';


const useStyles  = makeStyles((theme) =>({
  table: {
    width: 500
  }
}))

export default function CriteriaTable(props) {
    const data_columns = [
        {name:'Critério', attribute:'criterionName'},
        {name:'Tipo', attribute:'type'},
        {name:'Peso (%)', attribute: 'weight'},
        {name:'Remover'}
    ];
    const styles  = useStyles();

    return (
      <TableContainer component={Paper}  className={styles.table} >
        <Table  aria-label="a dense table">
          <TableHead>
            <TableRow>
                {data_columns.map((column,idx) => (
                    idx == 0 ?
                    <TableCell key={column.name}>{column.name}</TableCell>
                    :
                    <TableCell align="right" key={column.name}>{column.name}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row, idx) => (
              <TableRow key={row.criterionName}>
                <TableCell component="th" scope="row">
                {row.criterionName}
                </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.weight}</TableCell>
              <TableCell align="right"><Button variant="contained" color="secondary" onClick={()=> props.removeRow(idx)} > Remover</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }