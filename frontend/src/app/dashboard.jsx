import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getRoutesByRole } from "../utils/routeUtils";

const Dashboard = () => {
  const role = "admin";
  const roleRoutes = getRoutesByRole(role);

  return (
    <Router>
      <Routes>
        {roleRoutes.map((route) => (
          <Route
            key={route.id}
            path={route.path}
            element={<div>{route.label} Component</div>}
          >
            {route.children &&
              route.children.map((child) => (
                <Route
                  key={child.id}
                  path={child.path}
                  element={<div>{child.label} Component</div>}
                />
              ))}
          </Route>
        ))}
      </Routes>
    </Router>
  );
};

export default Dashboard;
