import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface OrderFormProps {
  selectedPair: string;
}

const OrderForm: React.FC<OrderFormProps> = ({ selectedPair }) => {
  const [orderType, setOrderType] = useState<'limit' | 'market'>('limit');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement order submission logic here
    console.log({
      pair: selectedPair,
      type: orderType,
      side,
      price: orderType === 'limit' ? parseFloat(price) : undefined,
      amount: parseFloat(amount),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        New Order
      </Typography>
      <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
        {selectedPair}
      </Typography>
      <FormControl fullWidth size="small">
        <InputLabel>Order Type</InputLabel>
        <Select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value as 'limit' | 'market')}
          label="Order Type"
        >
          <MenuItem value="limit">Limit</MenuItem>
          <MenuItem value="market">Market</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>Side</InputLabel>
        <Select
          value={side}
          onChange={(e) => setSide(e.target.value as 'buy' | 'sell')}
          label="Side"
        >
          <MenuItem value="buy">Buy</MenuItem>
          <MenuItem value="sell">Sell</MenuItem>
        </Select>
      </FormControl>
      {orderType === 'limit' && (
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          size="small"
          fullWidth
          required
        />
      )}
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        size="small"
        fullWidth
        required
      />
      <Button
        type="submit"
        variant="contained"
        color={side === 'buy' ? 'success' : 'error'}
        fullWidth
        sx={{ mt: 2 }}
      >
        {side === 'buy' ? 'Buy' : 'Sell'} {selectedPair.split('/')[0]}
      </Button>
    </Box>
  );
};

export default OrderForm; 