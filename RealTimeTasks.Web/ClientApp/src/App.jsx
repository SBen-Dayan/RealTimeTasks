import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import UserContextComponent from './components/UserContext';
import PrivateRoute from './components/PrivateRoute';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

const App = () => {
    return (
        <UserContextComponent>
            <Layout>
                <Routes>
                    <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </Layout>
        </UserContextComponent>
    );
}

export default App;