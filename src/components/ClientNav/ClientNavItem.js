import React from 'react';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

//Icons
import HomeIcon from '@material-ui/icons/Home';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import TodayIcon from '@material-ui/icons/Today';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import ShutterSpeedIcon from '@material-ui/icons/ShutterSpeed';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

export default function ClientNavItem() {
	return (
		<List component='nav' aria-labelledby='nested-list-subheader'>
			<ListItem button key='Home' component={Link} to='/'>
				<ListItemIcon>
					<HomeIcon />
				</ListItemIcon>
				<ListItemText primary='Home' />
			</ListItem>
			<ListItem button key='Profile' component={Link} to='/profile'>
				<ListItemIcon>
					<PersonPinIcon />
				</ListItemIcon>
				<ListItemText primary='Profile' />
			</ListItem>
			<ListItem button key='Weight' component={Link} to='/weight'>
				<ListItemIcon>
					<TodayIcon />
				</ListItemIcon>
				<ListItemText primary='Weight' />
			</ListItem>
			<ListItem button key='Macros' component={Link} to='/macros'>
				<ListItemIcon>
					<FastfoodIcon />
				</ListItemIcon>
				<ListItemText primary='Macros' />
			</ListItem>
			<ListItem button key='Exercise' component={Link} to='/exercise'>
				<ListItemIcon>
					<FitnessCenterIcon />
				</ListItemIcon>
				<ListItemText primary='Exercise' />
			</ListItem>
			<ListItem button key='Measurements' component={Link} to='/measurements'>
				<ListItemIcon>
					<ShutterSpeedIcon />
				</ListItemIcon>
				<ListItemText primary='Measurements' />
			</ListItem>
			<ListItem button key='Check-In' component={Link} to='/check-in'>
				<ListItemIcon>
					<ImportantDevicesIcon />
				</ListItemIcon>
				<ListItemText primary='Check-In' />
			</ListItem>
		</List>
	);
}
