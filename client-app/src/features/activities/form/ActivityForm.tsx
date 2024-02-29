import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ChangeEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    selectedActivity,
    closeFrom,
    createActivity,
    updateActivity,
    loading,
  } = activityStore;
  // 初始化activity
  const initialActivity = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    date: "",
    city: "",
    description: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialActivity);

  const handleSubmit = () => {
    activity.id ? updateActivity(activity) : createActivity(activity)
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="儲存"
        />
        <Button
          onClick={() => closeFrom()}
          floated="right"
          type="button"
          content="取消"
        />
      </Form>
    </Segment>
  );
});
