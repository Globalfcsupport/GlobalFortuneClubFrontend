import { Route, Routes } from "react-router-dom";
import pages from "./routes";

const Routers = () => {
  const pageRoutes = pages.map(({ path, title, element, nestedRoutes }) => {
    if (nestedRoutes) {
      const nestedPageRoutes = nestedRoutes.map(
        ({ nestedPath, nestedElement, nestedNestedRoutes }) => {
          if (nestedNestedRoutes) {
            const nestedNestedPageRoutes = nestedNestedRoutes.map(
              ({ nestedNestedPath, nestedNestedElement }) => (
                <Route
                  key={nestedNestedPath}
                  path={nestedNestedPath}
                  element={nestedNestedElement}
                />
              )
            );
            return (
              <Route key={nestedPath} path={nestedPath} element={nestedElement}>
                <Route index element={nestedNestedRoutes[0].nestedNestedElement} />
                {nestedNestedPageRoutes}
              </Route>
            );
          }
          return (
            <Route key={nestedPath} path={nestedPath} element={nestedElement} />
          );
        }
      );
      return (
        <Route key={path} path={path} element={element}>
          {nestedPageRoutes}
        </Route>
      );
    }
    return <Route key={path} path={path} element={element} />;
  });

  return <Routes>{pageRoutes}</Routes>;
};

export default Routers;
