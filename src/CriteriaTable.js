import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

export default function CriteriaTable(props) {
    const data_columns = [
        {name:'Critério', attribute:'criterionName'},
        {name:'Tipo', attribute:'type'},
        {name:'Peso (%)', attribute: 'weight'},
        {name:'Remover'}
    ];

    return (
      <TableContainer component={Paper} >
        <Table  aria-label="a dense table">
          <TableHead>
            <TableRow>
                {data_columns.map((column,idx) => (
                    idx == 0 ?
                    <TableCell key={column.name}>{column.name}</TableCell>
                    :
                    <TableCell align="center" key={column.name}>{column.name}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row, idx) => (
              <TableRow key={row.criterionName}>
                <TableCell component="th" scope="row">
                {row.criterionName}
                </TableCell>
              <TableCell align="center">{row.type == 1 ? "Custo": "Benefício"}</TableCell>
              <TableCell align="center">{row.weight}</TableCell>
              <TableCell align="center"><Button variant="contained" color="secondary" onClick={()=> props.removeRow(idx)} > Remover</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }