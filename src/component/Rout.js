//import e from 'express';
import React from 'react';
//import fn from './Layout';
import Fn from './Sample';

 export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {valueee: ' ',pass:''};
    this.handleChange = this.handleChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log(e.target.name);
    if(e.target.name==='pass')
    this.setState({pass: e.target.value});
    this.setState({valueee: e.target.value});
}


  handleSubmit = (event) => {

     console.log(this.state);
    fetch("/express_backend", 
      {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
    //   .then(r => {
    //     return r.json();
    //     //console.log(r.json());
    // })
    // .then(data => {
    //     console.log(data);
    // })
   // .then((res)=> console. log(res))
   // .then(res => res.json())
    //.then(json => console.log(json));

    .then(res => res.json()) .then(json => console.log(json.values));

    Fn(this.state);

  }



  UNSAFE_componentWillMount() {
    //Setting state here will trigger re-rendering.
    this.callBackendAPI()
      .then(res => this.setState({ valueee: res.values}))
      //.then(Fn(this.state));  
  }
  callBackendAPI = async () => {
    const response = await fetch('/jana');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };




  render() {
    return (
      <>
      <form action="#" onSubmit={this.handleSubmit}>
          Name:<input type="text" name='pass' onChange={this.handleChange} /> <br/> <br/>
          <input type="text" name='valueee'onChange={this.handleChange} /> <br/> <br/>
          <p>Text: {this.state.value}</p>
          <button type='submit'>Submit</button>
      </form>
  
      </>
    );
  }
}
