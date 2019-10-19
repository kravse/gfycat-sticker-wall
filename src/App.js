import React from 'react';
import './App.css';
import Gif from './Gif'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      validSearchTerm: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchTerm = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault()
    this.setState({ error: '' });
    if (!this.searchTerm.current.value || this.searchTerm.current.value.length < 2) {
      this.setState({error: 'Enter a word.'});
      return;
    }
    this.setState({validSearchTerm: this.searchTerm.current.value});
    this.searchTerm.current.value = ''
  }

  render() {
    console.log('rendered')
    return (
      <div className="App">
        <header className="App-header">
          <h1>ADD A STICKER</h1>
        </header>
        {this.state.error && <p className="error">{this.state.error}</p>}
        <form onSubmit={this.handleSubmit}>
          <input ref={this.searchTerm} type="text" name="searchTerm"></input>
        </form>
        {this.state.validSearchTerm && <Gif searchTerm={this.state.validSearchTerm}></Gif>}
      </div>
    );
  }
}

export default App;