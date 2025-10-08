'use client';
import {Box, Table,Typography, Paper,TableCell, TableContainer, TableHead, TableRow, TableBody } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
export default function Templates () {
  const [users, setUsers] = useState([{}])
    return(
        <Box>
            <Typography sx={{ fontSize: 25, fontWeight: "bold", mb: 2, mt: 1 }}>
                      Email templates
                    </Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow  sx={{
                "& th": {
                  backgroundColor: "primary.main",
                  color: "white",
                  fontSize: 12,
                },
              }}>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Content</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell>From Email</TableCell>
                            <TableCell>From Name</TableCell>
                            <TableCell>Created at</TableCell>
                            <TableCell>Updated at</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
       </Box>
    );
 }