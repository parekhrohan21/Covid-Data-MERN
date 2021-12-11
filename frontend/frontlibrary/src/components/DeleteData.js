import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Covidsdata = props => (
    <tr>
        <td>{props.covid.date}</td>
        <td>{props.covid.county}</td>
        <td>{props.covid.state}</td>
        <td>{props.covid.cases}</td>
        <td>{props.covid.deaths}</td>
        <td>
            <Link to={"/edit/"+props.covid._id}>Edit</Link>
        </td>
        <td>
            <Link to={"/Delete/"+props.covid._id}>Delete</Link>
        </td>
    </tr>
)
function Func_DeleteData(props) 
 {
    const [state, setState] = useState({
        date: "",
        county: "",
        state: "",
        cases:"",
        deaths: 1,
      
    });
      //let url= "http://localhost:5000/"
    const [IsLoad, setLoad]=useState(false)
    const [IsDeleted,setDelete]=useState(false)
   
    useEffect(()=>{
        console.log("useeff delete"+props.match.params.id)
        axios.post("http://localhost:5000/deleteCovid/"+props.match.params.id)
        .then(res => {
            console.log("data deleted "+res.data)
            setDelete(true)
            axios.get("http://localhost:5000/alldata")
            .then(res => {
                // set the state variable from the data received from the axios api
                console.log("data received "+res.data)
                res.data.map(function(currentstate, i){
                    console.log(currentstate)
                //setLoad(true);
            })      
                setState(res.data)
                console.log("data set in the state and state length"+state.length)
            })
            .catch(err => {
              console.log("error has occured")
            })
                      }) 
        .catch(err => {
          console.log("error has occured")
        })
    },[props.match.params.id])

   
    
    function ShowCovidsTable() {
        return state.map(function(currentdata, i){
           
            return <Covidsdata covid={currentdata} key={i} />;
        })
    }
    useEffect(() => {
        if (state.length>0)
        setLoad(true)
        
     }, [state]);
     
     

     return (
        <div>
            <h3>Deleted Data </h3>
            <table className="table table-striped" style={{ marginTop: 20 }} >
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>County Year</th>
                        <th>State</th>
                        <th>Cases</th>
                        <th>Deaths</th>
                       
                    </tr>
                </thead>
                <tbody>
                    { IsLoad ? ShowCovidsTable() : console.log("No table data")}
                </tbody>
            </table>
        </div>
    )
    }

export default Func_DeleteData;