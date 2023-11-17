import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { ListItemButton,ListItemIcon,ListItemText } from '@mui/material';
import { NavLink,Link, useNavigate  } from "react-router-dom";
import Orders from './Orders';

const ListItems = () => {
  const navigate = useNavigate();
  const handleroute = (route)=>{
    console.log('hi');
    navigate(route)
  }
  return (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <Link to="/" className="list">
          <ListItemText primary="Dashboard" />
        </Link>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon >
          <ShoppingCartIcon />
        </ListItemIcon>
        <Link to="/orders" className="list">
          <ListItemText primary="Orders" />
        </Link>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <Link to="/customer">
          <ListItemText primary="Customers" />
        </Link>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItemButton>
    </React.Fragment>
  )
}

export default ListItems;