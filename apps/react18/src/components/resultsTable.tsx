import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {DeliveryResults} from '../pizza-delivery/types';

export type ResultsTableProps = {
  history: DeliveryResults[]
};

export default function ResultsTable({history}: ResultsTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{maxWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Deliverees</TableCell>
            <TableCell>Pizzas</TableCell>
            <TableCell>Houses</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((r) => (
            <TableRow key={r.id}>
              <TableCell>
                {r.id}
              </TableCell>
              <TableCell>
                {r.date?.toLocaleDateString()} {r.date?.toLocaleTimeString()}
              </TableCell>
              <TableCell align="right">{r.deliverees}</TableCell>
              <TableCell align="right">{r.pizzasCount}</TableCell>
              <TableCell align="right">{r.housesCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
