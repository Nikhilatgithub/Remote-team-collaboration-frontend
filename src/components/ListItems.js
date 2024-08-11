
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupsIcon from '@mui/icons-material/Groups';
import AddTaskIcon from '@mui/icons-material/AddTask';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import BadgeIcon from '@mui/icons-material/Badge';
import { Link } from 'react-router-dom';



export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Communication
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <MarkUnreadChatAltIcon />
      </ListItemIcon>
      <ListItemText primary="Messages" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <VideoCallIcon />
      </ListItemIcon>
      <ListItemText primary="Video Conference" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BadgeIcon />
      </ListItemIcon>
      <ListItemText primary="My Profile" />
    </ListItemButton>
  </React.Fragment>
);


export const adminListItems = (
    <React.Fragment>
      <ListItemButton >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      <ListItemButton component={Link} to='/create-project'>
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Create new Project" />
      </ListItemButton>

      <ListItemButton component={Link} to='/update-project'>
        <ListItemIcon>
        <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Project" />
      </ListItemButton>

      <ListItemButton component={Link} to='/add-user'>
        <ListItemIcon>
          <GroupAddIcon />
        </ListItemIcon>
        <ListItemText primary="Add new User" />
      </ListItemButton>

      <ListItemButton component={Link} to="/add-user">
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary="Manage User" />
      </ListItemButton>

      <ListItemButton component={Link} to="/add-task">
        <ListItemIcon>
          <AddTaskIcon />
        </ListItemIcon>
        <ListItemText primary="Create new Task" />
      </ListItemButton>

      <ListItemButton component={Link} to="/manage-task">
        <ListItemIcon>
          <TaskAltIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Task" />
      </ListItemButton>

      <ListItemButton component={Link} to="/add-team">
        <ListItemIcon>
          <GroupsIcon />
        </ListItemIcon>
        <ListItemText primary="Create new Team" />
      </ListItemButton>

      <ListItemButton component={Link} to="/manage-team" >
        <ListItemIcon>
          <GroupsIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Team" />
      </ListItemButton>

    </React.Fragment>
  );
  