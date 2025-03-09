import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './components/AppLayout'
import Home from './pages/Home'
import { QueryClient, QueryClientProvider } from 'react-query'
import Cars from './pages/Cars'
import RentProvider from './context/RentProvider'
import PaymentRentCar from './pages/PaymentRentCar'
import TestAdd from './ai/testAdd'
import Register from './pages/Register'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'


const queryClient = new QueryClient()

function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <RentProvider>
        <Toaster />
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path='cars' element={<Cars />} />
            <Route path='payment' element={<PaymentRentCar />} />
            <Route path='test' element={<TestAdd /> } />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          
        </Routes>
      </RentProvider>
    </QueryClientProvider>
  )
}

export default App
