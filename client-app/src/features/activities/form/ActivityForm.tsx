import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ChangeEvent, useState } from "react";

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
}

export default function ActivityCorm({ activity: selectedActivity, closeForm, createOrEdit }: Props) {
  // 初始化activity
  const initialActivity = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    date: '',
    city: '',
    description: '',
    venue: '',
  };

  const [activity, setActivity] = useState(initialActivity);

  const handleSubmit = () => {
    createOrEdit(activity);
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setActivity({...activity, [name]: value})
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input placeholder="Title" value={activity.title} name='title' onChange={handleInputChange}/>
        <Form.TextArea placeholder="Description" value={activity.description} name='description' onChange={handleInputChange}/>
        <Form.Input placeholder="Category" value={activity.category} name='category' onChange={handleInputChange}/>
        <Form.Input placeholder="Date" value={activity.date} name='date' onChange={handleInputChange}/>
        <Form.Input placeholder="City" value={activity.city} name='city' onChange={handleInputChange}/>
        <Form.Input placeholder="Venue" value={activity.venue} name='venue' onChange={handleInputChange}/>
        <Button floated="right" positive type="submit" content="儲存" />
        <Button
          onClick={() => closeForm()}
          floated="right"
          type="button"
          content="取消"
        />
      </Form>
    </Segment>
  );
}