import React, { useState } from "react";
import axios from 'axios';

function Covid_Form() {
  let url= "http://localhost:5000/" 
  const [state, setState] = useState({
    date: "",
    county: "",
    state: "",
    cases:"",
    deaths: 1,
  });

 
  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };
  const OnSubmit=(e) =>
  {
  
   e.preventDefault();
   const coviddata={
           date:state.date,
           county:state.county,
           state:state.state,
           cases:state.cases,
           deaths:state.deaths

   }
   
   axios.post(url+"adddata", coviddata)
   .then(res => console.log(res.data));
   }
  return (
    <div style={{marginTop: 10}}>
      <h3>Add Data</h3>
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
        
        
        <div className="form-group">
        <center>
            <input type="submit" value="Add this data" className="btn btn-primary" />
        </center>                   
        </div>
                
      </form>
      
    </div>
  );
 
}

export default Covid_Form;
