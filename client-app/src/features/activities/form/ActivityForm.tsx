import { Button, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from 'uuid';
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    date: '',
    city: '',
    description: '',
    venue: '',
  })

  useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(activity!))
  }, [id, loadActivity])

  // const handleSubmit = () => {
  //   if (!activity.id) {
  //     activity.id = uuid();
  //     createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
  //   } else {
  //     updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
  //   }
  // };

  // const handleInputChange = (
  //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = event.target;
  //   setActivity({ ...activity, [name]: value });
  // };

  if (loadingInitial) return <LoadingComponent content="資料載入中..." />

  return (
    <Segment clearing>
      <Formik enableReinitialize initialValues={activity} onSubmit={valuse => console.log(valuse)}>
        {({ handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <Field
              placeholder="Title"
              name="title"
            />
            <Field
              placeholder="Description"
              name="description"
            />
            <Field
              placeholder="Category"
              name="category"
            />
            <Field
              type="date"
              placeholder="Date"
              name="date"
            />
            <Field
              placeholder="City"
              name="city"
            />
            <Field
              placeholder="Venue"
              name="venue"
            />
            <Button
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="儲存"
            />
            <Button
              as={Link}
              to='/activities'
              floated="right"
              type="button"
              content="取消"
            />
          </Form>)}
      </Formik>
    </Segment>
  );
});
