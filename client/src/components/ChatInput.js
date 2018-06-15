import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {msg: ''};
  }

  comeOn() {
    const {send} = this.props;
    send(this.state.msg)
    this.setState({msg: ""})
  }

  render() {
    return (
      <div style={{display:'flex',  alignItems: "center", justifyContent: "center" }}>
          <TextField
            id="multiline-flexible"
            label="Multiline"
            multiline
            value={this.state.msg}
            rows='2'
            onChange={e => this.setState({msg: e.target.value})}
            style={{flex:1}}
          />
          <span>&nbsp;</span>
          <Button variant="contained"  style={{ marginTop: 20, height: 40 }} color="primary" onClick={e => this.comeOn() }>
            Send
          </Button>
          <span>&nbsp;</span>
      </div>
    );
  }
}

export default ChatInput
