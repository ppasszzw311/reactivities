import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { SyntheticEvent, useState } from "react";
import { observer } from "mobx-react-lite";

interface Props {
    activity: Activity;
}

export default observer( function ActivityListItem({activity} : Props) {
    const {activityStore} = useStore();
    const { loading, deleteActivity } = activityStore;

    const [target, setTarget] = useState('');

    const handleActivityDelete = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
        setTarget(e.currentTarget.name);
        deleteActivity(id)
    }

  return (
    <Segment.Group>
        <Segment>
            <Item.Group>
                <Item>
                    <Item.Image size='tiny' circular src='/assets/user.png'/>
                <Item.Content>
                    <Item.Header as={Link} to={`/activities/${activity.id}`} content={activity.title}/>
<Item.Description>Host by bob</Item.Description>
             
                </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
        <Segment>
            <span>
                <Icon name='clock' />{activity.date} 
                <Icon name='marker' />{activity.venue}
            </span>
        </Segment>
        <Segment secondary>
            Attendees
        </Segment>
        <Segment clearing>
            <span>{activity.description}</span>
            <Button as={Link} to={`/activities/${activity.id}`} color='teal' floated="right" content='查看詳細'/>
        </Segment>
    </Segment.Group>
  );
})
