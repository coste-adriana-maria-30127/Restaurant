import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Auth from "./user/pages/Auth";
import Register from "./user/pages/Register";
import MainPage from "./restaurant/MainPage";
import Order from "./order/pages/Order";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/:uid/main/page" element={<MainPage />} />
        <Route path="/order/:rid" element={<Order />} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />

        <Route path="/auth" element={<Navigate to="/auth" />} />
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main className="body">
          <Routes>{routes}</Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};
export default App;
