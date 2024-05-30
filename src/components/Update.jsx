import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import {updateFormAction} from "../features/formDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
  const { id } = useParams();       // with use of useParams we can receive id from read component which is used on edit button link to= {`/edit/${item.id}`

  const { forms, loading } = useSelector((state) => state.formDetail);
  const [updatedData, setUpdateData] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      debugger
      const singleUser = forms?.filter((item) => item.id === id);
      if (singleUser && singleUser.length > 0) {
        setUpdateData(singleUser[0]); // Select the first user from the filtered list
      }
    }
  }, [id, forms]);

  const currency = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];

  const gender = [
    {
      value: "Male",
    },
    {
      value: "Female",
    },
  ];

  const handleChange = (e) => {
    setUpdateData({ ...updatedData, [e.target.name]: e.target.value });
  };

   const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(updatedData);
    dispatch(updateFormAction(updatedData))
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Set height to 100% of the viewport height
          backgroundColor: "yellow",
        }}
      >
        <Box
          component="form"
          sx={{
            backgroundColor: "whitesmoke",
            padding: 4, // Add some padding
            borderRadius: "1px solid black", // Add border radius for better look
            maxWidth: "400px", // Set a maximum width for the form
            width: "100%", // Ensure form takes full width on smaller screens
            marginTop: "3rem",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div>
            <TextField
              type="text"
              label="Name"
              defaultValue="Your Name"
              name="name"
              value={updatedData && updatedData.name}
              onChange={handleChange}
              sx={{ width: "100%", mt: 1 }}
            />
          </div>
          <div>
            <TextField
              type="email"
              label="Email"
              defaultValue="Your Email"
              name="email"
              value={updatedData && updatedData.email}
              onChange={handleChange}
              sx={{ width: "100%", mt: 1 }}
              
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Phone Number"
              defaultValue="Your Phone"
              name="number"
              value={updatedData && updatedData.number}
              onChange={handleChange}
              sx={{ width: "100%", mt: 1 }}
              
            />
          </div>
          <div>
            <TextField
              label="Multiline"
              type="text"
              multiline
              rows={2}
              defaultValue="Default Value"
              name="description"
              value={updatedData && updatedData.description}
              onChange={handleChange}
              sx={{ width: "100%", mt: 1 }}
            />
          </div>
          <div>
            <TextField
              select
              type="select"
              label="Select"
              defaultValue="EUR"
              name="currency"
              value={updatedData && updatedData.currency}
              onChange={handleChange}
              sx={{ width: "100%", my: 2 }}
              
            >
              {currency.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              select
              type="select"
              label="Gender"
              defaultValue="Male"
              name="gender"
              value={updatedData && updatedData.gender}
              onChange={handleChange}
              sx={{ width: "100%", mt: 1 }}
            >
              {gender.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <Button type="submit">Edit</Button>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default Update;
