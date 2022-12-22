import './App.css';
import Dashboard from './Dashboard';
import AddCards from './AddCards';
import Home from './Home';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
const App = () => {
     return (
            <div>
                <Router>
                        <Routes>
                            <Route exact path="/" element={<Home/>}/>
                            <Route exact path="/addcards" element={<AddCards/>}/>
                            <Route exact path="/dashboard" element={<Dashboard/>}/>
                            <Route exact path="/login" element={<Login/>}/>
                        </Routes>
                </Router>
            </div>
        );
}
export default App
