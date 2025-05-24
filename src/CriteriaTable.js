import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {useTranslation} from 'react-i18next';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  draggingItem: {
    background: 'rgb(235,235,235)',
  },
}));

export default function CriteriaTable(props) {
    const { t } = useTranslation();
    const classes = useStyles(); 

    const data_columns = [
        {name: t('DATA_COLUMN_CRITERION'), attribute:'criterionName'},
        {name: t('DATA_COLUMN_TYPE'), attribute:'type'},
        {name: t('DATA_COLUMN_WEIGHT')+' (%)', attribute: 'weight'},
        {name: t('BUTTONS_REMOVE')}
    ];


    return (
      <DragDropContext onDragEnd={props.handleOnDragEnd}>
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
            <Droppable droppableId="criteria-list">
              {(provided) => (
                <TableBody
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {props.rows.map((row, idx) => (
                    <Draggable key={row.criterionName} draggableId={row.criterionName} index={idx}>
                      {(provided, snapshot) => (
                        <TableRow
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={snapshot.isDragging ? classes.draggingItem : ''}
                        >
                          <TableCell component="th" scope="row">
                          {row.criterionName}
                          </TableCell>
                        <TableCell align="center">{row.type === 1 ? t('CRITERION_TYPE_COST'): t('CRITERION_TYPE_BENEFIT')}</TableCell>
                        <TableCell align="center">{row.weight}</TableCell>
                        <TableCell align="center"><Button variant="contained" color="secondary" onClick={()=> props.removeRow(idx)} > {t('BUTTONS_REMOVE')} </Button></TableCell>
                        </TableRow>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </Table>
        </TableContainer>
      </DragDropContext>
    );
  }