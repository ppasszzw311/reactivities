import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardMeta,
  Image,
} from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";



export default function ActivityDetails() {
  const {activityStore} = useStore();
  const [imgSrc, setImgSrc] = useState(null);
  const { selectedActivity: activity, openForm, cancelSelectedActivity } =activityStore
  // 針對類別更改後的圖片修改載入
  useEffect(() => {
    activity && import(`../../../assets/images/categoryImages/${activity.category}.jpg`)
      .then((imageModule) => {
        setImgSrc(imageModule.default);
      })
      .catch((error) => {
        console.error("圖片加載失敗", error);
      });
  }, [activity]);

  if (!activity) return <LoadingComponent />; 

  return (
    <Card>
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
          <Button
            onClick={() => openForm(activity.id)}
            basic
            color="blue"
            content="修改"
          />
          <Button
            onClick={() => cancelSelectedActivity()}
            basic
            color="grey"
            content="返回"
          />
        </Button.Group>
      </CardContent>
    </Card>
  );
}
