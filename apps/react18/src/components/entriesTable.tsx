import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {DeliveryEntry} from '../pizza-delivery/types';

export type EntriesTableProps = {
  entries: DeliveryEntry[]
};

export default function EntriesTable({entries}: EntriesTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{maxWidth: 650}} aria-label="entries table">
        <TableHead>
          <TableRow>
            <TableCell>Order</TableCell>
            <TableCell>Deliveree</TableCell>
            <TableCell>X</TableCell>
            <TableCell>Y</TableCell>
            <TableCell>Pizzas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.dId}>
              <TableCell align="right">{entry.order}</TableCell>
              <TableCell align="right">{entry.dId}</TableCell>
              <TableCell align="right">{entry.x}</TableCell>
              <TableCell align="right">{entry.y}</TableCell>
              <TableCell align="right">{entry.pizzas}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
