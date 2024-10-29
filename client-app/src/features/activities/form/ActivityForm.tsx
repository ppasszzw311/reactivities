import { Button, Header, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import CustomInput from "../../../app/common/form/CustomInput";
import CustomTextArea from "../../../app/common/form/CustomTextArea";
import CustomSelectInput from "../../../app/common/form/CustomSelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import CustomDatePicker from "../../../app/common/form/CustomDatePicker";

// eslint-disable-next-line react-refresh/only-export-components
export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const { loading, loadActivity, loadingInitial, createActivity, updateActivity } = activityStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    date: null,
    city: "",
    description: "",
    venue: "",
  });

  // 建立一個驗證的schema
  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required("The activity description is required"),
    category: Yup.string().required("The activity category is required"),
    date: Yup.string().required("The activity date is required"),
    city: Yup.string().required("The activity city is required"),
    venue: Yup.string().required("The activity venue is required"),
  });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  const handleFormSubmit = (activity: Activity) => {
    if (!activity.id) {
      activity.id = uuid();
      createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    } else {
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    }
  };

  if (loadingInitial) return <LoadingComponent content="資料載入中..." />;

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <CustomInput placeholder="Title" name="title" />
            <CustomTextArea
              placeholder="Description"
              name="description"
              rows={3}
            />
            <CustomSelectInput
              placeholder="Category"
              name="category"
              options={categoryOptions}
            />
            <CustomDatePicker
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMM-yyyy-dd h:mm aa"
            />
            <Header content="Location Details" sub color="teal" />
            <CustomInput placeholder="City" name="city" />
            <CustomInput placeholder="Venue" name="venue" />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="儲存"
            />
            <Button
              as={Link}
              to="/activities"
              floated="right"
              type="button"
              content="取消"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
