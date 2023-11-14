import React from 'react'
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import api from './config/services'

function preventDefault(event) {
    event.preventDefault();
  }
const RecentOrders = () => {
    const [orders,setOrders] = React.useState([]);
  const getAllOrders = async ()=>{
    try {
      const { data } = await api.get("/billing/getAllOrders")
      setOrders(data)
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(()=>{
      getAllOrders()
  },[])

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Adresss</TableCell>
            <TableCell>Jewellery</TableCell>            
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((row) => {
            
            return(
            <TableRow key={row.BillId}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.customer?.name}</TableCell>
              <TableCell>{row.customer?.address}</TableCell>
              <TableCell>{row.products?.map((j)=>j.product.productName).join(", ")}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`Rs ${row.billAmt}`}</TableCell>
            </TableRow>)
          })}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  )
}

export default RecentOrders;