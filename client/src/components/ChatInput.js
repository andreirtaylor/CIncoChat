import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { msg: '' };
  }

  sendMessage() {
    const { send } = this.props;
    send(this.state.msg);
    this.setState({ msg: '' });
  }

  handleShiftEnter = e => {
    // if both shift and enter are pressed send the message
    if (e.nativeEvent.keyCode === 13) {
      if (e.nativeEvent.shiftKey) {
        this.sendMessage();
      }
    }
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <TextField
          id="multiline-flexible"
          multiline
          value={this.state.msg}
          rows="2"
          onChange={e => this.setState({ msg: e.target.value })}
          onKeyUp={this.handleShiftEnter}
          style={{ flex: 1 }}
        />
        <span>&nbsp;</span>
        <Button
          variant="contained"
          style={{ marginTop: 20, height: 40 }}
          color="primary"
          onClick={e => this.sendMessage()}
        >
          Send
        </Button>
        <span>&nbsp;</span>
      </div>
    );
  }
}

export default ChatInput;
