import React, { useState, useEffect } from 'react'
import { Box, CssBaseline, ThemeProvider, createTheme, Card } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import OrderForm from './components/OrderForm'
import OrderBookContainer from './components/OrderBookContainer'
import LoadingFlower from './components/LoadingFlower'
import TradingPairSelector from './components/TradingPairSelector'
import TradingTables from './components/TradingTables'
import { setCurrentSymbol, selectCurrentSymbol } from './store/slices/tradingSlice'
import { 
  mockOrdersByPair, 
  mockTradesByPair, 
  tradingPairs 
} from './mocks/mockData'
import TradingChartContainer from './components/TradingChartContainer'

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
  const dispatch = useDispatch()
  const selectedPair = useSelector(selectCurrentSymbol)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handlePairChange = (pair: string) => {
    dispatch(setCurrentSymbol(pair))
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
              onPairChange={handlePairChange}
            />
          </Box>
          <Box sx={{ 
            flex: 1,
            position: 'relative',
            minHeight: 0
          }}>
            <TradingChartContainer />
          </Box>
        </Card>
        <Card sx={{ p: 1, gridColumn: '2', minHeight: 0 }}>
          <OrderForm selectedPair={selectedPair} />
        </Card>
        <Card sx={{ p: 1, minHeight: 0 }}>
          <OrderBookContainer />
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