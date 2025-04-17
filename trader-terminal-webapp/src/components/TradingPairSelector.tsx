import React from 'react';
import { Box, Select, MenuItem, Typography } from '@mui/material';
import { TradingPair } from '../types';

interface TradingPairSelectorProps {
  pairs: TradingPair[];
  selectedPair: string;
  onPairChange: (pair: string) => void;
}

const TradingPairSelector: React.FC<TradingPairSelectorProps> = ({
  pairs,
  selectedPair,
  onPairChange,
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        Trading Pair:
      </Typography>
      <Select
        value={selectedPair}
        onChange={(e) => onPairChange(e.target.value)}
        size="small"
        sx={{
          minWidth: 120,
          backgroundColor: 'background.paper',
          '& .MuiSelect-select': {
            py: 1,
          },
        }}
      >
        {pairs.map((pair) => (
          <MenuItem key={pair.id} value={pair.symbol}>
            {pair.symbol}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default TradingPairSelector; 