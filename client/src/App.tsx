import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
// import Chat from "./pages/chat";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import { ThemeProvider } from "./context/theme";
import { useEffect, useState } from "react";

export default function App() {
  const [themeMode, setThemeMode] = useState("light");

  const darkTheme = () => {
    setThemeMode("dark"); // Corrected the assignment
  };

  const lightTheme = () => {
    setThemeMode("light"); // Corrected the assignment
  };

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light"); // Corrected the usage of document.querySelector
    document.documentElement.classList.add(themeMode); // Corrected the usage of document.querySelector
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/listing/:listingId" element={<Listing />} />

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/chat" element={<Chat />} /> */}
            <Route path="/create-listing" element={<CreateListing />} />
            <Route
              path="/update-listing/:listingId"
              element={<UpdateListing />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
