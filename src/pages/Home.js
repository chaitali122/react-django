import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useState } from 'react';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: 50,
        flexDirection: 'row'
    },
    input: {
        margin: 10
    }
  }));

const Home = () => {

    const classes = useStyles();
    const [fields, setFields] = useState({
        name: "",
        year : "",
        battle_number: "",
        attacker_king : "",    
        defender_king: "",
        attacker_1 : "",    
        attacker_2: "",
        attacker_3: "",
        atacker_4 : "",
        defender_1: "",
        defender_2: "",
        defender_3 : "",    
        defender_4 : "",    
        attacker_outcome: "",
        battle_type: "",
        major_death: "",
        major_capture: "",
        attacker_size: "",
        defender_size: "",
        attacker_commander: "",
        defender_commander: "",
        summer : "",    
        location : "",    
        region: "",
        note: "",
    })
    const handleChange = (event, fieldName) => {
        setFields((prevFields) => {
            return({
              ...prevFields,
              [fieldName]: event.target.value
            });
        })
    }

    const handleClick = () => {
        fetch("http://127.0.0.1:8000/create/", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fields)
        }).then((res) => res.json())
            .then((data) => {console.log(data); alert("Added New Battle!")})
            .catch((err) => {console.log(err); alert(err)})
    }

    return(
    <div className={classes.root}>
        <Typography variant="h6" className={classes.title}>
            Add a battle
          </Typography>
          <div style={{display: 'flex', flex:1, flexDirection: 'column'}}>
        <TextField id="filled-basic" label="Name" variant="filled" className={classes.input} onChange={(event) => handleChange(event, "name")} />
        <TextField id="filled-basic" label="Year" variant="filled"  className={classes.input}onChange={(event) => handleChange(event, "year")}/>
        <TextField id="filled-basic" label="Battle number" variant="filled" className={classes.input}onChange={(event) => handleChange(event, "battle_no")} />
        <TextField id="filled-basic" label="Attacker king" variant="filled" className={classes.input}onChange={(event) => handleChange(event, "attacker_king")} />
        <TextField id="filled-basic" label="Defender king" variant="filled" className={classes.input}onChange={(event) => handleChange(event, "defender_king")} />
        <TextField id="filled-basic" label="Attacker 1" variant="filled" className={classes.input}onChange={(event) => handleChange(event, "attacker_1")} />
        <TextField id="filled-basic" label="Attacker 2" variant="filled" className={classes.input}onChange={(event) => handleChange(event, "attacker_2")} />
        <TextField id="filled-basic" label="Attacker 3" variant="filled" className={classes.input} onChange={(event) => handleChange(event, "attacker_3")}/>
        <TextField id="filled-basic" label="Attacker 4" variant="filled" className={classes.input}onChange={(event) => handleChange(event, "attacker_4")} />
        <TextField id="filled-basic" label="Defender 1" variant="filled" className={classes.input}onChange={(event) => handleChange(event, "defender_1")} />
        <TextField id="filled-basic" label="Defender 2" variant="filled" className={classes.input} onChange={(event) => handleChange(event, "defender_2")}/>
        <TextField id="filled-basic" label="Defender 3" variant="filled" className={classes.input}onChange={(event) => handleChange(event, "defender_3")} />
        <TextField id="filled-basic" label="Defender 4" variant="filled"  className={classes.input}onChange={(event) => handleChange(event, "defender_4")}/>
        <TextField id="filled-basic" label="Attacker outcome" variant="filled"  className={classes.input}onChange={(event) => handleChange(event, "attacker_outcome")}/>
        <TextField id="filled-basic" label="Battle type" variant="filled" className={classes.input} onChange={(event) => handleChange(event, "battle_yype")}/>
        <TextField id="filled-basic" label="Major death" variant="filled" className={classes.input}onChange={(event) => handleChange(event, "major_death")} />
        <TextField id="filled-basic" label="Attacker size" variant="filled" className={classes.input} onChange={(event) => handleChange(event, "attacker_size")}/>
        <TextField id="filled-basic" label="Defender size:" variant="filled" className={classes.input}onChange={(event) => handleChange(event, "defender_size")} />
        <TextField id="filled-basic" label="Attacker commander" variant="filled" className={classes.input}onChange={(event) => handleChange(event, "attacker_commander")} />
        <TextField id="filled-basic" label="Defender commander" variant="filled" className={classes.input} onChange={(event) => handleChange(event, "defender_commander")}/>
        <TextField id="filled-basic" label="Summer" variant="filled" className={classes.input} onChange={(event) => handleChange(event, "summer")}/>
        <TextField id="filled-basic" label="Location" variant="filled" className={classes.input}onChange={(event) => handleChange(event, "location")} />
        <TextField id="filled-basic" label="Region" variant="filled" className={classes.input} onChange={(event) => handleChange(event, "region")}/>
        <TextField id="filled-basic" label="Note" variant="filled" className={classes.input} onChange={(event) => handleChange(event, "note")}/>
        <Button color="primary" variant="contained" onClick={handleClick} className={classes.input}>Create</Button>
        </div>



    </div>);
}

export default Home;