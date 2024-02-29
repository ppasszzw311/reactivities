import { useEffect} from "react";
import { Container } from "semantic-ui-react";
import "./slyle.css";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent content="讀取資料中"/>

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "6rem" }}>
        <ActivityDashboard        />
      </Container>
    </>
  );
}

export default  observer( App);
