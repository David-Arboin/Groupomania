import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header/Header.jsx'
import LoginPage from './pages/loginPage/index.jsx'
import HomePage from './pages/homePage/index.jsx'
import NotFound from './components/NotFound/NotFound'
import { Navigate } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const TokenContext = React.createContext()
export const UserIdContext = React.createContext()
export const NameContext = React.createContext()
export const LogInContext = React.createContext()

function App() {

    const [token, setToken] = React.useState()
    const [userId, setUserId] = React.useState()
    const [name, setName] = React.useState()


    return (
        <div className="App">
            <Router>
                <TokenContext.Provider value={[token, setToken]}>
                    <UserIdContext.Provider value={[userId, setUserId]}>
                        <NameContext.Provider value={[name, setName]}>
                                <Header />
                                <Routes>
                                    <Route
                                        exact
                                        path="/loginPage"
                                        element={<LoginPage />}
                                    ></Route>
                                    <Route
                                        path="/"
                                        element={
                                            <Navigate replace to="/loginPage" />
                                        }
                                    ></Route>
                                    <Route
                                        path="/homePage"
                                        element={<HomePage />}
                                    ></Route>
                                    <Route component={<NotFound />}></Route>
                                </Routes>
                        </NameContext.Provider>
                    </UserIdContext.Provider>
                </TokenContext.Provider>
            </Router>
        </div>
    )
}
export default App
