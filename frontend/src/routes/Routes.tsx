import React, { useMemo } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import Home from "../pages/Home/Home";
import { ROUTE } from "../constants/route.constants";
function AppRoutes() {
    const routeArray = useMemo(() => {
        const routes: RouteObject[] = [];
        routes.push({
            index: true,
            element: <Navigate to={ROUTE.home.fullPath} />,
        });
        routes.push({
            path: ROUTE.home.path,
            element: <Home />,
        });
        return routes;
    }, []);
    const routes = useRoutes(routeArray);
    return <React.Fragment>{routes}</React.Fragment>;
}

export default AppRoutes;
