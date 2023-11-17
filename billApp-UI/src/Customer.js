import { Container, TextField } from "@mui/material";
import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import { BillingState } from "./Context/BillingProvider";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Bars } from "react-loader-spinner";
import api from "./config/services";
import { debounce } from "lodash";

const Customer = () => {
  const { setnavName } = BillingState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalData, setmodalData] = React.useState();
  const [loading, setloading] = React.useState(false);
  const [customerData, setCustomerData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(100);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchString,setsearchString] = React.useState("")

  React.useEffect(() => {
    setnavName("Orders");
  }, []);

  const getTableData = async () => {
    try {
      const { data } = await api.get("/customer/getCustomers", {
        params: { pagination: 5, page: page },
      });
      console.log(data);
      setCustomerData(data);
    } catch (error) {}
  };

  const getSearchData = async (string) => {
    try {
      const { data } = await api.get(`/customer/getCustByName/${string}`, {
        params: { pagination: 5, page: page },
      });
      console.log(data);
      setCustomerData(data);
    } catch (error) {}
  };
  
  const debouncedSearch = React.useRef(
    debounce(async (criteria) => {
      setsearchString(criteria)
      getSearchData(criteria)
      console.log(criteria);
    }, 300)
  ).current;

  const columns = [
    {
      name: "_id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "address",
      label: "Adresss",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "phone",
      label: "Phone",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];
  const changePage = async (page, sortOrder) => {
    console.log(page);
    setCustomerData([]);
    try {
      const { data } = await api.get(`/customer/getCustByName/${searchString}`, {
        params: { pagination: 5, page: page < 1 ? 1 : page+1 },
      });
      console.log(data);
      setCustomerData(data);
    } catch (error) {}
  };
  const options = {
    filterType: "checkbox",
    enableNestedDataAccess: ".",
    onRowClick: handleOpen,
    serverSide: true,
    count: count,
    rowsPerPage: 5,
    rowsPerPageOptions: [5],
    onTableChange: (action, tableState) => {
      switch (action) {
        case "changePage":
          changePage(tableState.page, tableState.sortOrder);
          break;
        case "sort":
          this.sort(tableState.page, tableState.sortOrder);
          break;
        default:
          console.log("action not handled.");
      }
    },
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const processChanges = (e)=>{
    debouncedSearch(e.target.value);
  }
  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div style={{margin:'10px'}}>
        <TextField id="standard-basic" label="Search customer" variant="standard" onChange={processChanges} />
      </div>
      <MUIDataTable
        title={"Sales list"}
        data={customerData}
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
};

export default Customer;
