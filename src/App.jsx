import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ExplorePage from "./pages/ExplorePage";
import DestinationsPage from "./pages/DestinationsPage";
import ConnectionsPage from "./pages/ConnectionsPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ChatPage from "./pages/ChatPage";
import IsAnon from "./components/IsAnon.jsx";
import IsPrivate from "./components/IsPrivate.jsx";
import BottomNav from "./components/BottomNav.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <IsAnon>
              <LandingPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/explore"
          element={
            <IsPrivate>
              <ExplorePage />
            </IsPrivate>
          }
        />
        <Route
          path="/destinations"
          element={
            <IsPrivate>
              <DestinationsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/connections"
          element={
            <IsPrivate>
              <ConnectionsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/editprofile"
          element={
            <IsPrivate>
              <EditProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/chat/:connectionId"
          element={
            <IsPrivate>
              <ChatPage />
            </IsPrivate>
          }
        />
      </Routes>
      {isLoggedIn && <BottomNav />}
    </>
  );
}

export default App;
