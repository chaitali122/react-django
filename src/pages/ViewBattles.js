import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


const ViewBattles = () => {

    const classes = useStyles();

    // const rows = ["battle1", "battle2", "battle3"]

    const [battles, setBattles] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/read/").then((res) => res.json())
            .then((data) => {setBattles(data)})
            .catch((err) => {console.log(err); alert(err)})
    }, [])

    return(
    <div>
        <div>View</div>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sr. No</TableCell>
            <TableCell>Battle Names</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {battles.map((battle, index) => (
            <TableRow key={index}>
              <TableCell>
                {index}
              </TableCell>
              <TableCell>
                <Link to={{
                    pathname: `/battle/${index}`,
                    state: battles
                }}>{battle.name}</Link>
              </TableCell>             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    );
}

export default ViewBattles;