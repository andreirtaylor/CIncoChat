import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    height: 450,
    width: '100%'
  }})

class MessageList extends React.Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }

  render(){
  const {messages, recipient, classes} = this.props;

  return (
    <div>
      <h1> Messages </h1>
      <div className={classes.root}>
        <GridList spacing={2} className={classes.gridList} cellHeight={60} cols={1}>
          { messages.map((msg) => 
            <GridListTile  key={msg.id} cols={1}>
              <Card style={{ backgroundColor: recipient !== msg.sender ? "rgba(63, 81, 181, 0.1)": 'rgba(76, 175, 80, 0.1)', maxWidth: 400, marginLeft: (msg.sender !== recipient  && "auto")}}>
                <CardContent>
                  <Typography>
                    {msg.message}
                  </Typography>
                </CardContent>
              </Card>
            </GridListTile>
          ) }
          <div ref={(el) => { this.el = el; }}></div>
        </GridList>
      </div>
    </div>
  )
  }
}


export default withStyles(styles)(MessageList);
