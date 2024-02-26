import { useEffect, useState } from 'react'
import { Header, List } from "semantic-ui-react";
import axios from "axios";
import './App.css'

function App() {
  const [activities, setActities] = useState([]);

  // side effect 
  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(response => {
        setActities(response.data);
      })
  }, [])
  return (
    <>
      <Header as='h2' icon="user" content={"Retent"}/>
        React itive
      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>
            {activity.title}
          </List.Item>
        ))}
      </List>
    </>

  )
}

export default App
