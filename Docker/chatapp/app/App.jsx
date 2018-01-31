import React from 'react';
import Message from './Message.jsx';
import Input from './Input.jsx';
import * as messageService from '../client/messageService.js';

const App = React.createClass({
  getInitialState() {
    return {
      name: "Bob",
      newMessage: "",
      messages: []
    };
  },

  componentWillMount() {
    messageService.getMessages(function(messages) {
      this.setState({messages: messages});
    }.bind(this));
  },

  componentDidMount() {
    messageService.listenForMessages(function(messages) {
      this.setState({messages: messages});
    }.bind(this));
  },

  handleNameChange(event) {
    this.setState({name: event.target.value});
  },

  handleMessageChange(event) {
    this.setState({newMessage: event.target.value});
  },

  clearChat(event) {
    messageService.clearMessages();
  },

  handleKeyPress(event) {
    if (!this.state.name || !this.state.newMessage) {
      return;
    }
    if (event.key === 'Enter') {
      this.setState({newMessage: ""});
      messageService.sendMessage(this.state.name, this.state.newMessage);
    }
  },

  render() {
    const messageDivs = this.state.messages.reduce((pre, cur) => {
      return pre.concat(<Message message={cur}/>);
    }, []);

    return (
      <div>
        <h2>Chat Application!!!</h2>
        <div>
          {messageDivs}
        </div>
        <Input label={"Message"} value={this.state.newMessage} onChange={this.handleMessageChange} onKeyPress={this.handleKeyPress} />
        <br/>
        <Input label={"Name"} value={this.state.name} onChange={this.handleNameChange} />
        <br/>
        <button onClick={this.clearChat}>Clear Chat History</button>

      </div>
    );
  }
});

export default App;
