import { Button, Item, Label, Segment } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";



export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { activitiesByDate, deleteActivity, loading } = activityStore
    const [target, setTarget] = useState('');

    const handleActivityDelete = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
        setTarget(e.currentTarget.name);
        deleteActivity(id)
    }


    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.length === 0 && <Item>沒有資料</Item>}
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as={'a'}>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}</div>
                                <div>{activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button as={Link} to={`/activities/${activity.id}`} floated="right" content='查看詳細' color="blue" />
                                <Button name={activity.id} loading={loading && target === activity.id} onClick={(e) => handleActivityDelete(e, activity.id)} floated="right" content='刪除' color='red'/>
                                <Label basic content={activity.category}/>
                            </Item.Extra>
                        </Item.Content>

                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})