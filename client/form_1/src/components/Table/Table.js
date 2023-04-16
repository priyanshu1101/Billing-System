import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CircularProgress from '@mui/material/CircularProgress';
import { getData } from '../../api/data';
import { Button } from '@mui/material';
import { CSVLink } from "react-csv";


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.Billing_FirstName}</TableCell>
        <TableCell>{row.Billing_LastName}</TableCell>
        <TableCell>{row.Billing_CompanyName}</TableCell>
        <TableCell>{row.Billing_Address}</TableCell>
        <TableCell>{row.Billing_Address2}</TableCell>
        <TableCell>{row.Billing_Pincode}</TableCell>
        <TableCell>{row.Billing_City}</TableCell>
        <TableCell>{row.Billing_State}</TableCell>
        <TableCell>{row.Billing_Phone}</TableCell>
        <TableCell>{row.GSTNumber}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box lx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Shipping
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Compnay Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Address 2</TableCell>
                    <TableCell>Pincode</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>State</TableCell>
                    <TableCell>Phone</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell>{row.Shipping_FirstName}</TableCell>
                  <TableCell>{row.Shipping_LastName}</TableCell>
                  <TableCell>{row.Shipping_CompanyName}</TableCell>
                  <TableCell>{row.Shipping_Address}</TableCell>
                  <TableCell>{row.Shipping_Address2}</TableCell>
                  <TableCell>{row.Shipping_Pincode}</TableCell>
                  <TableCell>{row.Shipping_City}</TableCell>
                  <TableCell>{row.Shipping_State}</TableCell>
                  <TableCell>{row.Shipping_Phone}</TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function CollapsibleTable() {
  const renameProps = (obj, newProps) => {
    const renamedProps = {};
    Object.keys(obj).forEach(key => {
      renamedProps[newProps[key] || key] = obj[key];
    });
    return renamedProps;
  };


  const [data, setData] = useState([]);
  useEffect(() => {
    getData()
      .then((Response) => {

        const shipping = Response.data.shipingData.map(item => renameProps(item, { firstName: 'Shipping_FirstName', lastName: 'Shipping_LastName', companyName: 'Shipping_CompanyName', address: 'Shipping_Address', address2: 'Shipping_Address2', pincode: 'Shipping_Pincode', city: 'Shipping_City', state: 'Shipping_State', phone: 'Shipping_Phone' }));
        const billing = Response.data.billingData.map(item => renameProps(item, { firstName: 'Billing_FirstName', lastName: 'Billing_LastName', companyName: 'Billing_CompanyName', address: 'Billing_Address', address2: 'Billing_Address2', pincode: 'Billing_Pincode', city: 'Billing_City', state: 'Billing_State', phone: 'Billing_Phone' }));

        const mergedData = shipping.map(item1 => {
          const item2 = billing.find(item2 => item2.id === item1.id);
          return Object.assign({}, item1, item2);
        });

        setData(mergedData);
      })
      .catch((err) => { console.log(err); })
  }, []);

  return (
    <div>
    <div>

    <TableContainer component={Paper} style={{ maxWidth:"99%", marginTop:"10px",marginLeft:"auto", marginRight:"auto"}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Compnay Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Address 2</TableCell>
            <TableCell>Pincode</TableCell>
            <TableCell>City</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>GST Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ?
            (
              data.map((row) => (
                <Row key={row.name} row={row} />
              ))
            ) :
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px' }}>
              <CircularProgress />
            </div>
          }
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    <div>
    <br></br>
    <CSVLink data={data} style={{textDecoration: 'none'}} filename={"my_data.csv"}>
      <Button variant="contained" >Download CSV</Button>
    </CSVLink>
    </div>
    </div>
  );
}
