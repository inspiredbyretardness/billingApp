import * as React from 'react';
import Container from '@mui/material/Container'
import MUIDataTable from "mui-datatables";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { BillingState } from './Context/BillingProvider';
import { Bars } from  'react-loader-spinner'
import api from './config/services'

function Orders() {
  const {setnavName} = BillingState()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalData,setmodalData] = React.useState()
  const [loading,setloading] = React.useState(false)
  const [billingData,setbillingData] = React.useState([])
  const [page,setPage] = React.useState(1)
  const [count,setCount] = React.useState(100)
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const getTableData = async()=>{
    try {
      const {data} = await api.get("/billing/getBillSet",{ params: { pagination: 5,page:page } })
      console.log(data);
      setbillingData(data)
    } catch (error) {
      
    }
  }
  const columns = [
    {
     name: "date",
     label: "Date",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
      name: "_id",
      label: "ID",
      options: {
       filter: true,
       sort: true,
      }
     },
    {
     name: "customer.name",
     label: "Name",
    },
    {
     name: "customer.address",
     label: "Adresss",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
      name: "customer.phone",
      label: "Phone",
      options: {
       filter: true,
       sort: false,
      }
     },
    {
      name: "paymentMethod",
      label: "Payment Method",
      options: {
       filter: true,
       sort: false,
      }
     },
     {
      name: "billAmt",
      label: "Sale Amount",
      options: {
       filter: true,
       sort: false,
      }
     }
   ];
   
  const changePage = async(page, sortOrder) => {
    setbillingData([])
    try {
      const {data} = await api.get("/billing/getBillSet",{ params: { pagination: 5,page:page <1? 1:page } })
      console.log(data);
      setbillingData(data)
    } catch (error) {
      
    }
    };
   const options = {
     filterType: 'checkbox',
     enableNestedDataAccess: '.',
     onRowClick: handleOpen,
     serverSide: true,
     count:count,
     rowsPerPage: 5,
     rowsPerPageOptions: [5],
     onTableChange: (action, tableState) => {
      console.log(tableState);
      switch (action) {
        case 'changePage':
          changePage(tableState.page, tableState.sortOrder);
          break;
        case 'sort':
          this.sort(tableState.page, tableState.sortOrder);
          break;
        default:
          console.log('action not handled.');
      }
     }

   };
  
   React.useEffect(()=>{
    setnavName('Orders')
    getTableData()
  },[])
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
 

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <MUIDataTable
          title={"Sales list"}
          data={billingData}
          columns={columns}
          options={options}
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={loading}
        />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
    </Container>
  );
}

export default Orders