import React from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

//Icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import TodayIcon from '@material-ui/icons/Today';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import ShutterSpeedIcon from '@material-ui/icons/ShutterSpeed';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}));

export default function ClientNav() {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<nav className={classes.root}>
			<CssBaseline />
			<AppBar
				position='fixed'
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						className={clsx(classes.menuButton, open && classes.hide)}>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap>
						Welcome, Jamie!
					</Typography>
				</Toolbar>
			</AppBar>
			<Toolbar />
			<Drawer
				className={classes.drawer}
				variant='persistent'
				anchor='left'
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</div>
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
					<ListItem
						button
						key='Measurements'
						component={Link}
						to='/measurements'>
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
			</Drawer>
		</nav>
	);
}
