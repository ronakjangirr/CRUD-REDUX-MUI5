import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import {createFormAction} from "../features/formDetailSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Create() {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    setUser({ ...user, [e.target.name]: e.target.value });
  };

   const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(user);
    const errors = {};

    debugger

    if (!user.name) {
      errors.name = "Name is required";
    }
    if (!user.email) {
      errors.email = "Email is required";
    }
    if (!user.number) {
      errors.number = "Phone number is required";
    }
    if (!user.description) {
      errors.description = "Description is required";
    }
    if (!user.currency) {
      errors.currency = "Currency is required";
    }
    if (!user.gender) {
      errors.gender = "Gender is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      debugger
      console.log(user);
      await dispatch(createFormAction( user ));
      setTimeout(()=>{
        navigate('/read')
      },2000)
      // Submit form data or perform other actions
    }
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
              onChange={handleChange}
              sx={{ width: "100%", mt: 1 }}
              error={!!errors.name}
              helperText={errors.name}
            />
          </div>
          <div>
            <TextField
              type="email"
              label="Email"
              defaultValue="Your Email"
              name="email"
              onChange={handleChange}
              sx={{ width: "100%", mt: 1 }}
              error={!!errors.email}
              helperText={errors.email}
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Phone Number"
              defaultValue="Your Phone"
              name="number"
              onChange={handleChange}
              sx={{ width: "100%", mt: 1 }}
              error={!!errors.number}
              helperText={errors.number}
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
              onChange={handleChange}
              sx={{ width: "100%", mt: 1 }}
              error={!!errors.description}
              helperText={errors.description}
            />
          </div>
          <div>
            <TextField
              select
              type="select"
              label="Select"
              defaultValue="EUR"
              name="currency"
              onChange={handleChange}
              sx={{ width: "100%", my: 2 }}
              error={!!errors.name}
              helperText={errors.name}
            >
              {currency.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {errors.currency && <div>{errors.currency}</div>}
          </div>
          <div>
            <TextField
              select
              type="select"
              label="Gender"
              defaultValue="Male"
              name="gender"
              onChange={handleChange}
              sx={{ width: "100%", mt: 1 }}
              error={!!errors.gender}
            >
              {gender.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            {errors.gender && <div>{errors.gender}</div>}
          </div>
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default Create;
