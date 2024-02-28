import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import "./slyle.css";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { Activity } from "../models/activity";
import {v4 as uuid} from 'uuid';

function App() {
  const [activities, setActities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

  const [editMode, setEditMode] = useState(false);

  // side effect
  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActities(response.data);
      });
  }, []);

  // 取得一比
  // useEffect(() => {
  //   axios.get('http://localhost:5000/api/activities/eec4d42d-d3fb-4589-91f3-137250f14ba1')
  //     .then(response => {
  //       setSelectAct(response.data)
  //     })
  // }, [])

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  // 處理活動的創建
  const handleCreateOrEditActivity = (activity: Activity) => {
    // 如果有activity 的id，將更新過的activity更新到列表
    activity.id 
    ? setActities([...activities.filter(x => x.id !== activity.id), activity])
    : setActities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  } 

  // 處理活動的刪除
  const handleDeleteActivity = (id : string) => {
    setActities([...activities.filter(x => x.id !== id)])
  }

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{ marginTop: "6rem" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
