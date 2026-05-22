import './App.css'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ExplorePage from './pages/ExplorePage'
import DestinationsPage from './pages/DestinationsPage'
import ConnectionsPage from './pages/ConnectionsPage'
import ProfilePage from './pages/ProfilePage'
import EditProfilePage from './pages/EditProfilePage'
import ChatPage from './pages/ChatPage'



function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/explore" element={<ExplorePage/>}/>
      <Route path="/destinations" element={<DestinationsPage/>}/>
      <Route path="/connections" element={<ConnectionsPage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="/editprofile" element={<EditProfilePage/>}/>
      <Route path="/chat/:connectionId" element={<ChatPage/>}/>
    </Routes>
    </>
  )
}

export default App
