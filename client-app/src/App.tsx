import React, {Component} from 'react';
import { Header } from 'semantic-ui-react';
import './App.css';
import { render } from 'react-dom';
import axios from 'axios';
import { List } from 'semantic-ui-react'
import { listenerCount } from 'cluster';


class App extends Component{
  state = {
    values: []
  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/values').then((response) =>{
      
   
    this.setState({
      values: response.data
    })
  })
  }
  
  render()
  {
  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities' />
      <List>
        
        {this.state.values.map((value: any) => (
           <List.Item key={value.id}>{value.name}</List.Item>
         ))}
    </List>
       
      
    </div>
  );
  }
}

export default App;
