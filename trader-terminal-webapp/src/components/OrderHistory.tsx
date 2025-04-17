import React from 'react';
import { Order } from '../types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'filled':
        return 'success.main';
      case 'cancelled':
        return 'error.main';
      default:
        return 'text.primary';
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Order History</Typography>
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
              <TableCell>Type</TableCell>
              <TableCell>Side</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell>{order.pair}</TableCell>
                <TableCell>{order.type}</TableCell>
                <TableCell sx={{ 
                  color: order.side === 'buy' ? 'success.main' : 'error.main',
                  fontWeight: 'bold'
                }}>
                  {order.side.toUpperCase()}
                </TableCell>
                <TableCell align="right">{order.price.toFixed(2)}</TableCell>
                <TableCell align="right">{order.amount.toFixed(4)}</TableCell>
                <TableCell align="right">{order.total.toFixed(2)}</TableCell>
                <TableCell sx={{ 
                  color: getStatusColor(order.status),
                  fontWeight: 'bold',
                  textTransform: 'capitalize'
                }}>
                  {order.status}
                </TableCell>
                <TableCell>
                  {new Date(order.timestamp).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderHistory; 