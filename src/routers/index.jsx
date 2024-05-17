import { Route, Routes } from "react-router-dom";
import pages from "./routes";


const Routers = () => {
  const pageRoutes = pages.map(({ path, title, element, nestedRoutes }) => {
    if (nestedRoutes) {
      const nestedPageRoutes = nestedRoutes.map(
        ({nestedPath,nestedElement}) => (
          <Route
            key={nestedPath}
            path={`/${path}/${nestedPath}`}
            element={nestedElement}
          />
        )
      );
      return (
        <Route key={title} path={`/${path}`} element={element}>
          {nestedPageRoutes}
        </Route>
      );
    } else {
      return <Route key={title} path={`/${path}`} element={element} />;
    }
  });
  return <Routes>{pageRoutes}</Routes>
};

export default Routers;
