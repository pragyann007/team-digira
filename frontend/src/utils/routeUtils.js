import routes from "../config/routes.json";

export const getRoutesByRole = (role) => {
  return routes
    .filter((route) => route.roles.includes(role))
    .map((route) => ({
      ...route,
      children: route.children
        ? route.children.filter((child) => child.roles.includes(role))
        : [],
    }));
};

export const getRouteByPath = (path) => {
  for (const route of routes) {
    if (route.path === path) return route;
    if (route.children) {
      const found = route.children.find((child) => child.path === path);
      if (found) return found;
    }
  }
  return null;
};
