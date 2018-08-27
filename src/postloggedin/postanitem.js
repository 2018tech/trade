import React from 'react';
import axios from 'axios'

export default class PostanItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      value: 0,
      items: [],
      message: false
    };
  };

  onNamechange(e) {
    this.setState({
      name: e.target.value
    });
  };

  onDescriptionchange(e){
    this.setState({
      description: e.target.value
    })
  }

  onValuechange(e){
    this.setState({
      value: e.target.value
    })
  }

  componentDidMount() {
    axios.get('/collection').then(res=> this.setState({ items: res.data}))
  };

//item below is the id of the item
  onDelete(item, e){
    e.preventDefault();
    console.log(item);
    // axios.delete('/itemdelete?id=' + e).then(res=>console.log(res))
  }

  onPostanItem(e) {
    e.preventDefault();
    fetch('/postitem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        value: this.state.value
      })
    })
    .then(res => {
      switch(res.status) {
        case 200:
        this.setState({message: true})
        break;
        default:
        console.log(res.status);
      }
    })
    .catch(err => console.log('Error ', err));
  }

  render() {
    const renderitems = () => {
      return this.state.items.map((item, i)=> {
        return (
          <div key={i}>
            <p>
        {i+1}. Name: {item.name}; Description: {item.description}; Value: {item.value} <button onClick={(e)=> this.onDelete(item._id, e)}>{item._id}</button>
            </p>
          </div>
        )
      })
    }
    return (
      <div className="postanitempage">
        <form>
          <div className="titles">Post Your Item</div>
            Name:
            <input type="name" onChange={e => this.onNamechange(e)}></input>
            Description:
            <input type="description" onChange={e => this.onDescriptionchange(e)}></input>
            Value:
            <input type="value" onChange={e => this.onValuechange(e)}></input>
          <button type="submit" onClick={e => this.onPostanItem(e)} className="btn btn-default">Post</button>
          {this.state.message ? <p className="message">Your Item has been posted! Check it out on Home!</p>: null}
        </form>
        <br></br>
        <div className="titles"><p>All Items</p></div>
        {renderitems()}
        <div className="itembelow"></div>
      </div>

    );
  }
}
