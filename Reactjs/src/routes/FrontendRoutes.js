import { Navigate, useRoutes } from 'react-router-dom';
import Home from 'src/pages/Frontend/Home'
import LoanCalculator from 'src/pages/Frontend/Loan/LoanCalculator'

const FrontendRoutes = [
    {
        path: '/', 
        element: <Home />
    },
    {
        path: '/loan-calculator', 
        element: <LoanCalculator />
    },
]


export default FrontendRoutes;