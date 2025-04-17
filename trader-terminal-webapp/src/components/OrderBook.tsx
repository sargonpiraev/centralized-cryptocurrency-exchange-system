import React from 'react';
import { OrderBook as OrderBookType, OrderBookEntry } from '../types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

interface OrderBookProps {
  orderBook: OrderBookType;
}

const OrderBook: React.FC<OrderBookProps> = ({ orderBook }) => {
  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    });
  };

  const renderOrderBookSide = (entries: OrderBookEntry[], isBids: boolean) => {
    return (
      <TableContainer component={Paper} sx={{ 
        backgroundColor: 'transparent',
        '& .MuiTableCell-root': {
          py: 1,
          fontSize: '0.875rem',
          border: 'none',
        },
        '& .MuiTableRow-root:hover': {
          backgroundColor: 'action.hover',
        }
      }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow key={index} hover>
                <TableCell align="right" sx={{ 
                  color: isBids ? 'success.main' : 'error.main',
                  fontWeight: 'bold'
                }}>
                  {formatNumber(entry.price)}
                </TableCell>
                <TableCell align="right">{formatNumber(entry.amount)}</TableCell>
                <TableCell align="right">{formatNumber(entry.total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Order Book</Typography>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: 2,
        flex: 1,
        '& .MuiPaper-root': {
          backgroundColor: 'background.paper',
          height: '100%',
        }
      }}>
        <Box>
          <Typography variant="subtitle2" sx={{ 
            color: 'success.main',
            fontWeight: 'bold',
            mb: 1
          }}>
            Bids
          </Typography>
          {renderOrderBookSide(orderBook.bids, true)}
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ 
            color: 'error.main',
            fontWeight: 'bold',
            mb: 1
          }}>
            Asks
          </Typography>
          {renderOrderBookSide(orderBook.asks, false)}
        </Box>
      </Box>
    </Box>
  );
};

export default OrderBook; 