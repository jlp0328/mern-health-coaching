import React from "react";
import { Link } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

//Icons
import HomeIcon from "@material-ui/icons/Home";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import TodayIcon from "@material-ui/icons/Today";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import ShutterSpeedIcon from "@material-ui/icons/ShutterSpeed";
import ImportantDevicesIcon from "@material-ui/icons/ImportantDevices";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";

import clientNav from "./data/client-nav.json";

export default function ClientNavItem() {
  let iconMap = new Map();
  iconMap.set("home", <HomeIcon />);
  iconMap.set("profile", <PersonPinIcon />);
  iconMap.set("weight", <TodayIcon />);
  iconMap.set("macros", <FastfoodIcon />);
  iconMap.set("exercise", <FitnessCenterIcon />);
  iconMap.set("measurements", <ShutterSpeedIcon />);
  iconMap.set("check-in", <ImportantDevicesIcon />);

  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      {clientNav.map(item => {
        return (
          <ListItem button key={item.name} component={Link} to={item.route}>
            <ListItemIcon>{iconMap.get(item.name.toLowerCase())}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        );
      })}
    </List>
  );
}
