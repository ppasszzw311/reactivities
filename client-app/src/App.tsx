import { useEffect, useState } from 'react'
import { Header, List } from "semantic-ui-react";
import axios from "axios";
import './App.css'

function App() {
  const [activities, setActities] = useState([]);
  const [selectAct, setSelectAct] = useState("");

  // side effect 
  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(response => {
        setActities(response.data);
      })
  }, [])

  // 取得一比
  useEffect(() => {
    axios.get('http://localhost:5000/api/activities/eec4d42d-d3fb-4589-91f3-137250f14ba1')
      .then(response => {
        setSelectAct(response.data)
      })
  }, [])

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 14);
  function generateFormattedGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function generateGUID() {
    var guid = generateFormattedGUID();
    return guid.substr(0, 8) + '-' + guid.substr(8, 4) + '-' + '4' + guid.substr(13, 3) + '-' +
      ((guid[16] === '8') ? '8' : (guid[16] === '9') ? '9' : 'a') + guid.substr(17, 3) + '-' + guid.substr(20, 12);
  }

  // 新增
  useEffect(() => {
    axios.post('http://localhost:5000/api/activities/', {
      "id": generateGUID(),
      "title": "Test Create Activity",
      "description": "Description of the test event",
      "category": "Culture",
      "date": currentDate.toISOString(),
      "city": "London",
      "venue": "Tower of London"
    })
      .then(response => {
        alert(response.status);
      })
      .catch((error: any) => {
        alert(error)
      })
  }, [])
  return (
    <>
      <Header as='h2' icon="user" content={"Retent"} />
      React itive
      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>
            {activity.id} ,{activity.title}
          </List.Item>
        ))}
      </List>
      <div>取得一筆</div>
      <div>
        {JSON.stringify(selectAct)}
      </div>
    </>

  )
}

export default App
