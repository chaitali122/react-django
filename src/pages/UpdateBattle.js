import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import {useLocation, useHistory} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: 50,
        flexDirection: 'row'
    },
    input: {
        margin: 10
    }
  }));

const UpdateBattle = () => {
    const history = useHistory()
    const location = useLocation();
    const battle = location.state
    const classes = useStyles();
    const [fields, setFields] = useState(battle)
    const handleChange = (event, fieldName) => {
        setFields((prevFields) => {
            return({
              ...prevFields,
              [fieldName]: event.target.value
            });
        })
    }

    const handleClick = () => {
        fetch("http://127.0.0.1:8000/update/", {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fields)
        }).then((res) => res.json())
            .then((data) => {console.log(data); alert("Updated Battle!"); history.push('/battles')})
            .catch((err) => {console.log(err); alert(err)})
    }

    return(
    <div className={classes.root}>
        <Typography variant="h6" className={classes.title}>
            Update battle
          </Typography>
          <div style={{display: 'flex', flex:1, flexDirection: 'column'}}>
          {Object.keys(battle).map((key) => (
        <TextField id="filled-basic" label={key} defaultValue={fields[key]} variant="filled" className={classes.input} onChange={(event) => handleChange(event, key)} />             
           ))}
        </div>
        <Button color="primary" variant="contained" onClick={handleClick} className={classes.input}>Update</Button>
    </div>);
}

export default UpdateBattle;