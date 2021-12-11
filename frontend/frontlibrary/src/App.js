import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Covid_Form from "./components/AddData"
import ShowDatasList from "./components/Displaydata1.js"
import ShowDatasList2 from "./components/searchdata.js"

import Covid_UpDateForm from "./components/DataUpdate"
import Func_DeleteData from "./components/DeleteData"
//import userInfo from "./components/Info"


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
        <center><h2> On-Line Covid Data using React   </h2> </center>
           <br/>
            
            <nav className="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand"><h3>Add a Data</h3></Link>
            <Link to="/DisplayData" className="navbar-brand"><h3>Display All Data</h3> </Link>
            <Link to="/searchdata" className="navbar-brand"><h3>Search Data</h3> </Link>


            
            </nav>
          <br/>
          <Route path="/" exact component={Covid_Form} />
          <Route path="/edit/:id" component={Covid_UpDateForm} />
          <Route path="/Delete/:id" component={Func_DeleteData} />
          <Route path="/DisplayData" component={ShowDatasList} /> 
          <Route path="/searchdata" component={ShowDatasList2} /> 



        </div>
      </Router>
    );
  }
}

export default App;
//<Link to="/userdata" className="navbar-brand"><h3>User Info</h3> </Link>
//<Route path="/userdata" component={userInfo} /> 