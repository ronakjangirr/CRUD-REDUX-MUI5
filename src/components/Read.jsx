import React, {useEffect, useState} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { readFormAction, deleteFormAction } from '../features/formDetailSlice';
import { Button, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

function Read() {
  const dispatch = useDispatch();
  const [myData, setMyData] = useState([])
  const [selectedRows, setSelectedRows] = useState([]);

  const { forms, loading } = useSelector((state) => state.formDetail);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(readFormAction());
}, [dispatch]);

useEffect(() => {
  setMyData(forms);
}, [forms]);

useEffect(() => {
  console.log("Readdd", myData);
}, [myData]);


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  {
    field: 'number',
    headerName: 'Number',
    width: 130,
  },
  {
    field: 'description',
    headerName: 'Description',
    description: 'This column has a value getter and is not sortable.',
    width: 160,
  },
  { field: 'currency', headerName: 'Currency', width: 130 },
  { field: 'gender', headerName: 'Gender', width: 130 },
];

const handleSelectionChange=(rowSelectionModel)=>{
  setSelectedRows(rowSelectionModel)
}

const handleDelete=()=>{
  console.log("selectedRows",selectedRows)
  dispatch(deleteFormAction(selectedRows))
}

const handleEdit = () => {
  // Navigate to the edit route with selected row ID as a parameter
  if (selectedRows) {
    navigate(`/update/${selectedRows}`);
  }
};

  return (
    <>
   
    <div style={{ height: "80vh", width: '100%', marginTop:"5rem" }}>
      <DataGrid
        rows={myData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={handleSelectionChange}
      />
       <Box>
      <Button variant="contained" onClick={handleDelete}>Delete</Button>
      <Button variant="contained" onClick={handleEdit}>Edit</Button>
{selectedRows}
    </Box>
    </div>
    </>
  )
}

export default Read