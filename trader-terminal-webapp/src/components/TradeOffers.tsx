import React from 'react';
import { Trade } from '../types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

interface TradeOffersProps {
  trades: Trade[];
}

const TradeOffers: React.FC<TradeOffersProps> = ({ trades }) => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Trade Offers</Typography>
      <TableContainer component={Paper} sx={{ 
        flex: 1,
        '& .MuiTableCell-root': {
          py: 1.5,
          fontSize: '0.875rem',
        },
        '& .MuiTableHead-root': {
          backgroundColor: 'background.paper',
        },
        '& .MuiTableRow-root:hover': {
          backgroundColor: 'action.hover',
        }
      }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Pair</TableCell>
              <TableCell>Side</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trades.map((trade) => (
              <TableRow key={trade.id} hover>
                <TableCell>{trade.pair}</TableCell>
                <TableCell sx={{ 
                  color: trade.side === 'buy' ? 'success.main' : 'error.main',
                  fontWeight: 'bold'
                }}>
                  {trade.side.toUpperCase()}
                </TableCell>
                <TableCell align="right">{trade.price.toFixed(2)}</TableCell>
                <TableCell align="right">{trade.amount.toFixed(4)}</TableCell>
                <TableCell>
                  {new Date(trade.timestamp).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TradeOffers; 