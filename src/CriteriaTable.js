import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {useTranslation} from 'react-i18next';

export default function CriteriaTable(props) {
    const { t, i18n} = useTranslation();

    const data_columns = [
        {name: t('DATA_COLUMN_CRITERION'), attribute:'criterionName'},
        {name: t('DATA_COLUMN_TYPE'), attribute:'type'},
        {name: t('DATA_COLUMN_WEIGHT')+' (%)', attribute: 'weight'},
        {name: t('BUTTONS_REMOVE')}
    ];


    return (
      <TableContainer component={Paper} >
        <Table  aria-label="a dense table">
          <TableHead>
            <TableRow>
                {data_columns.map((column,idx) => (
                    idx === 0 ?
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
              <TableCell align="center">{row.type === 1 ? t('CRITERION_TYPE_COST'): t('CRITERION_TYPE_BENEFIT')}</TableCell>
              <TableCell align="center">{row.weight}</TableCell>
              <TableCell align="center"><Button variant="contained" color="secondary" onClick={()=> props.removeRow(idx)} > {t('BUTTONS_REMOVE')} </Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }