import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import api from './config/services'

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [lastOrder,setlastOrder] = React.useState({billAmt:0,date:0});
  const lasteOrder = async ()=>{
    try {
      let data = await (await api.get("billing/getLastOrder")).data[0]
      console.log(data);
      setlastOrder(data)
    } catch (error) {
      
    }
  }
  React.useEffect(()=>{
    lasteOrder()
  },[])
  return (
    <React.Fragment>
      <Title>Recent Order</Title>
      <Typography component="p" variant="h4">
        {`Rs ${lastOrder.billAmt}`}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {`on ${lastOrder.date}`}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}