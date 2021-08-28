import { useParams, useLocation, useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


const Battle = () => {
    const classes = useStyles();

    const { index } = useParams();
    const location = useLocation();
    const history = useHistory();
    const battles = location.state;

    const battle = battles[index];

    const handleDelete = () => {
        fetch("http://127.0.0.1:8000/delete/", {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(battle)
        }).then((res) => res.json())
            .then((data) => {console.log(data); alert("Deleted Battle!"); history.push('/battles')})
            .catch((err) => {console.log(err); alert(err)})
    }

    return(
        <div>
        <Button color="primary" variant="contained" onClick={() => history.push({pathname: `/updateBattle/${index}`,state: battle})}>Update</Button>
        <Button color="primary" variant="contained" onClick={handleDelete}>Delete</Button>
       <TableContainer component={Paper}>
       <Table className={classes.table} aria-label="simple table">
         <TableHead>
           <TableRow>
             <TableCell>Sr. No</TableCell>
             <TableCell>Battle Names</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {Object.keys(battle).map((key) => (
             <TableRow key={key}>
               <TableCell>
                 {key}
               </TableCell>
               <TableCell>
                 {battle[key]}
               </TableCell>             
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     </div>
    );
};

export default Battle;