import {
  Box,
} from '@mui/material';
import React from 'react';
import {DeliveryResults} from '../pizza-delivery/types';

export type ResultsViewProps = {
  result: DeliveryResults
};

export default function ResultsView({result} : ResultsViewProps) {
  return (
    <>
      <Box>
        <label>Id:</label>
        <span>{result.id}</span>
      </Box>
      <Box>
        <label>Date:</label>
        <span>{result.date?.toLocaleDateString()}</span>
      </Box>
      <Box>
        <label>Deliverees:</label>
        <span>{result.deliverees}</span>
      </Box>
      <Box>
        <label>Pizzas:</label>
        <span>{result.pizzasCount}</span>
      </Box>
      <Box>
        <label>Houses:</label>
        <span>{result.housesCount}</span>
      </Box>
    </>
  )
}
