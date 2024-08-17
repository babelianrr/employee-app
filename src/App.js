import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import UserProfile from './components/UserProfile'
import NewProfile from './components/NewProfile'
import DetailProfile from './components/DetailProfile'
import AuthProvider from './hooks/AuthProvider'
import AdminRoute from '././router/AdminRoute'
import UserRoute from '././router/UserRoute'

function App() {
    return (
        <div className='App'>
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route exact path='/login' element={<Login />} />
                        <Route exact path='/register' element={<Register />} />
                        <Route element={<AdminRoute />}>
                            <Route exact path='/' element={<Home />} />
                            <Route exact path='/profile/:id' element={<DetailProfile />} />
                        </Route>
                        <Route element={<UserRoute />}>
                            <Route exact path='/my-profile' element={<UserProfile />} />
                            <Route exact path='/new-profile' element={<NewProfile />} />
                        </Route>
                        {/* Other routes */}
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    )
}

export default App