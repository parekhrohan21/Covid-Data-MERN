import React, {useEffect, useState } from "react";
import axios from 'axios';

function Covid_UpDateForm(props) {
  const [state, setState] = useState({
    date: "",
    county: "",
    state: "",
    cases:"",
    deaths: 1,
  });
  const [StatedLoaded, Set_StatedLoaded]=useState(false)
  let url= "http://localhost:5000/"
  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };
// this is on compunt Did Mount Event analogy
useEffect(() => {
    axios.get('http://localhost:5000/getdata/'+props.match.params.id)
        .then(res => {
            // set the state variable from the data received from the axios api
            setState(res.data)
        }) //
       
        .catch(err => {
          console.log("error has occured")
        })
}, []);

useEffect(() => {
    if (state.length>0)
    Set_StatedLoaded(true)
 }, [state]);

 
  const OnSubmit=(e) =>
   {
   
    e.preventDefault();
    const coviddata={
      date:state.date,
      county:state.county,
      state:state.state,
      cases:state.cases,
      deaths:state.deaths,
            formate:state.formate

    }
    
    axios.post(url+"updatecovid/"+props.match.params.id, coviddata)
    .then(res => console.log(res.data));
    

   }
  return (
    <div style={{marginTop: 10}}>
      <h3> Update Data Id: {props.match.params.id}</h3>
      <form onSubmit={OnSubmit} method="Post">

      <div className="form-group"> 
          <label>Date </label>
          <input  className="form-control"
            type="date" name="date"
            value={state.date}
            onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>County </label>
          <input  className="form-control"
            name="county"value={state.county}
            onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>State </label>
          <input  className="form-control"
            name="state"value={state.state}
            onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>Cases </label>
          <input  className="form-control"
            name="cases"value={state.caases}
            onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>Deaths </label>
          <input  className="form-control"
            name="deaths"value={state.deaths}
            onChange={handleChange}/>
        </div>

        <center>
        <div className="form-group">
                        <input type="submit" value="UpDate" className="btn btn-primary" />
                    </div>
        </center>            
      </form>
      
    </div>
  );
}

export default Covid_UpDateForm;
