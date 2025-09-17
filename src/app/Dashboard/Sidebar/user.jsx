"use client";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";

export default function Users() {
  const users = [
    { id: 1, firstName: "John",lastName:"Doe", email: "john@example.com",age:35,country:"Australia"},
    { id: 2, firstName: "John",lastName:"Doe", email: "jane@example.com",age:38 ,country:"America"},
    { id: 3, firstName: "John",lastName:"Doe", email: "michael@example.com",age:40,country:"Ireland"},
    { id: 3, firstName: "John",lastName:"Doe", email: "michael@example.com",age:40,country:"Ireland"},
    { id: 3, firstName: "John",lastName:"Doe", email: "michael@example.com",age:40,country:"Ireland"},
    { id: 3, firstName: "John",lastName:"Doe", email: "michael@example.com",age:40,country:"Ireland"},
    { id: 3, firstName: "John",lastName:"Doe", email: "michael@example.com",age:40,country:"Ireland"},
    { id: 3, firstName: "John",lastName:"Doe", email: "michael@example.com",age:40,country:"Ireland"},
    { id: 3, firstName: "John",lastName:"Doe", email: "michael@example.com",age:40,country:"Ireland"},
    { id: 3, firstName: "John",lastName:"Doe", email: "michael@example.com",age:40,country:"Ireland"},
  ];

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Users Data
      </Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>FirstName</TableCell>
              <TableCell>LastName</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Country</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.country}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
