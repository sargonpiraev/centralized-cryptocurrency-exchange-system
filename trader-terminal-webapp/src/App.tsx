import React, { useState, useEffect } from 'react'
import { Box, CssBaseline, ThemeProvider, createTheme, Card } from '@mui/material'
import TradingChart from './components/TradingChart'
import OrderForm from './components/OrderForm'
import OrderBook from './components/OrderBook'
import LoadingFlower from './components/LoadingFlower'
import TradingPairSelector from './components/TradingPairSelector'
import TradingTables from './components/TradingTables'
import { 
  mockCandlesByPair, 
  mockOrdersByPair, 
  mockTradesByPair, 
  mockOrderBookByPair,
  tradingPairs 
} from './mockData'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
})

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPair, setSelectedPair] = useState(tradingPairs[0].symbol)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handlePairChange = (pair: string) => {
    setSelectedPair(pair)
  }

  const handleCancelOrder = (orderId: string) => {
    console.log('Canceling order:', orderId)
    // TODO: Implement actual order cancellation logic
  }

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoadingFlower />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        height: '100vh',
        width: '100vw',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gridTemplateRows: '2fr 1fr',
        gap: 1,
        p: 1,
        overflow: 'hidden'
      }}>
        <Card sx={{ 
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          gridColumn: '1',
          gridRow: '1',
          minHeight: '66.67vh',
          height: '100%',
          position: 'relative'
        }}>
          <Box sx={{ mb: 1, flexShrink: 0 }}>
            <TradingPairSelector
              pairs={tradingPairs}
              selectedPair={selectedPair}
              onPairChange={setSelectedPair}
            />
          </Box>
          <Box sx={{ 
            flex: 1,
            position: 'relative',
            minHeight: 0
          }}>
            <TradingChart candles={mockCandlesByPair[selectedPair]} />
          </Box>
        </Card>
        <Card sx={{ p: 1, gridColumn: '2', minHeight: 0 }}>
          <OrderForm selectedPair={selectedPair} />
        </Card>
        <Card sx={{ p: 1, minHeight: 0 }}>
          <OrderBook orderBook={mockOrderBookByPair[selectedPair]} />
        </Card>
        <Card sx={{ p: 1, gridColumn: '1', gridRow: '2', minHeight: 0 }}>
          <TradingTables
            currentOrders={mockOrdersByPair[selectedPair]}
            orderHistory={mockOrdersByPair[selectedPair]}
            trades={mockTradesByPair[selectedPair]}
            onCancelOrder={handleCancelOrder}
          />
        </Card>
      </Box>
    </ThemeProvider>
  )
}

export default App 