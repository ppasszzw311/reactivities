import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardMeta,
  Container,
  Image,
} from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default observer(function ActivityDetails() {
  const { activityStore } = useStore();
  const [imgSrc, setImgSrc] = useState(null);
  const { id } = useParams();
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInitial,
  } = activityStore;

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity]);

  // 針對類別更改後的圖片修改載入
  useEffect(() => {
    activity &&
      import(`../../../assets/images/categoryImages/${activity.category}.jpg`)
        .then((imageModule) => {
          setImgSrc(imageModule.default);
        })
        .catch((error) => {
          console.error("圖片加載失敗", error);
        });
  }, [activity]);

  if (loadingInitial || !activity) return <LoadingComponent />;

  return (
    <Container style={{display: 'flex', justifyContent: 'center'}}>
      <Card style={{width: '100%'}}>
        <Image src={imgSrc} />
        <CardContent>
          <CardHeader>{activity.title}</CardHeader>
          <CardMeta>
            <span>{activity.date}</span>
          </CardMeta>
          <CardDescription>{activity.description}</CardDescription>
        </CardContent>
        <CardContent extra>
          <Button.Group widths={"2"}>
            <Button as={Link} to={`/manage/${activity.id}`} basic color="blue" content="修改" />
            <Button as={Link} to={'/activities'} basic color="grey" content="返回" />
          </Button.Group>
        </CardContent>
      </Card>
    </Container>
  );
});
