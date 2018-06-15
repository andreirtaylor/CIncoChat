import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { Notifications } from '@material-ui/icons';

export default props => {
  const { users, changeRecipient } = props;
  return (
    <div>
      <h1> Your Contacts </h1>
      <ul style={{ fontSize: '150%' }}>
        {users.map(user => (
          <Card
            style={{ maxWidth: 200, marginLeft: user.selected && 'auto' }}
            key={user.id}
            onClick={e => changeRecipient(user.id)}
          >
            <Typography
              color={user.notification ? 'primary' : 'default'}
              variant={'headline'}
            >
              {user.notification ? (
                <div>
                  {' '}
                  user.username{' '}
                  <span>
                    <Notifications />
                  </span>
                </div>
              ) : (
                user.username
              )}
            </Typography>
          </Card>
        ))}
      </ul>
    </div>
  );
};
