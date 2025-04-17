import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import CurrentOrders from './CurrentOrders';
import OrderHistory from './OrderHistory';
import TradeOffers from './TradeOffers';
import { Order, Trade } from '../types';

interface TradingTablesProps {
  currentOrders: Order[];
  orderHistory: Order[];
  trades: Trade[];
  onCancelOrder: (orderId: string) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`trading-tables-tabpanel-${index}`}
      aria-labelledby={`trading-tables-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1, height: '100%' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const TradingTables: React.FC<TradingTablesProps> = ({
  currentOrders,
  orderHistory,
  trades,
  onCancelOrder
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="trading tables tabs"
          variant="fullWidth"
        >
          <Tab label="Current Orders" />
          <Tab label="Order History" />
          <Tab label="Trades" />
        </Tabs>
      </Paper>
      <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
        <TabPanel value={value} index={0}>
          <CurrentOrders orders={currentOrders} onCancelOrder={onCancelOrder} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <OrderHistory orders={orderHistory} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TradeOffers trades={trades} />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default TradingTables; 