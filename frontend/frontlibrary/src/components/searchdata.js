import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//import ReactPaginate from 'react-paginate';//for pagination

/*function search1() {
const [searchTerm, setsearchTerm] = useState('')

    return (
    <div className="search1"> 
    <input type="text" placeholder="Search...." onChange={event =>
         {setsearchTerm(event.target.value);}}/> 
    {this.Show_Datas}
    </div>
    );
}*/


/*
function search1() {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const handleChange = event => {
       setSearchTerm(event.target.value);
     };

            React.useEffect(() => {
    const results = Covidsdata.filter(county =>
      county.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);


    Show_results() {
        return this.state.covid.map(function(currentdata, i){
            console.log("currentodo object-->"+currentdata +"  i is "+i)
            return <Covidsdata covid={currentdata} key={i} />;

        })
    }


     render() {
     return (
        <div className="App">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
          />
            <div>
                <h3>Covid List</h3>
                <table className="table table-striped" class="table table-hover"
                style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>County</th>
                            <th>State</th>
                            <th>Cases</th>
                            <th>Deaths</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        { this.Show_results() }
                    </tbody>
                </table>

            </div>
          

        </div>);} }  */

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

    class ShowDatasList2 extends Component {

    constructor(props) {
        super(props);
        this.state = {covid:[],
      //  search:""
        };
    }
        
        componentDidMount() {
            axios.get('http://localhost:5000/dateRecords/')//('http://localhost:5000/allbooks')
            //'http://localhost:5000/todos/'
            
                .then(response => {
                    console.log("response.data",response.data)
                    this.setState({ covid: response.data });  // set state variable with received data
                    console.log("Received data",this.state.todos)
                })
                .catch(function (error){
                    console.log(error);
                })
    }

    Show_Datas() {
        return this.state.covid.map(function(currentdata, i){
            console.log("currentodo object-->"+currentdata +"  i is "+i)
            return <Covidsdata covid={currentdata} key={i} />;
        })
    }

updateSearch(event) { 
    this.setState({search: event.target.value.substr(0,20)})
}

 renderCovid = covid => {
    const search=this.state;
    var code =covid.code.toLowerCase()

    if (search !== "" && covid.name.indexOf( search ) === -1) {
        return null
    }
 }

onchange = e =>{
    this.setState({ search : e.target.value});
}
    render() {
       // const {search} = this.state;
        //let filtersearch=this.state.Covidsdata.filter( (covid) => {
        //     return covid.county.indexOf(this.state.search) !== -1;
         //   }
       // );
     //  const filtersearch = Covidsdata.filter( covid => {
       //    return covid.county.indexOf( search.toLocaleLowerCase()) !==-1
       //    })
        return (

            <div>
                    <input 
          className="pa3 bb br3 grow b--none bg-lightest-blue ma3"         
            type="text" value={this.state.search}
            onChange={this.onchange} //updateSearch.bind(this)
            placeholder="Search" name="text"   />
           <input 
          className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
          
            type="date" name="date" />
             


                <h3>Covid List</h3>
                <table className="table table-striped" class="table table-hover"
                style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>County</th>
                            <th>State</th>
                            <th>Cases</th>
                            <th>Deaths</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        { this.Show_Datas() }
                    </tbody>
                </table>

            </div>
            
        )
    }
}
export default ShowDatasList2;

/*
function searchdata(props) {
    const [state, setState] = useState({
        date: "",
        text:""
});
}

   <ul>
                    {filtersearch.map((covid) => { return <Covidsdata covid={covid}  key={covid.id}/>
                    }
                    )}
                </ul>
*/
