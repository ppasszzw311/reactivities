import { Container } from "semantic-ui-react";
import "./slyle.css";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "6rem" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);
