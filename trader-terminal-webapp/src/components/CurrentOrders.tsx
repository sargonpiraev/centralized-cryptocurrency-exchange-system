import React from 'react';
import { Order } from '../types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

interface CurrentOrdersProps {
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
}

const CurrentOrders: React.FC<CurrentOrdersProps> = ({ orders, onCancelOrder }) => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Current Orders</Typography>
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
              <TableCell align="center">Actions</TableCell>
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
                <TableCell align="center">
                  <Box
                    component="button"
                    onClick={() => onCancelOrder(order.id)}
                    sx={{
                      color: 'error.main',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      p: 0.5,
                      borderRadius: 1,
                      '&:hover': {
                        backgroundColor: 'error.light',
                        color: 'error.contrastText',
                      }
                    }}
                  >
                    Cancel
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CurrentOrders; 