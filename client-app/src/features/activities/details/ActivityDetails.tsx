import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardMeta,
  Image,
} from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useEffect, useState } from "react";

interface Props {
  activity: Activity;
  cancelSelectActivity: () => void;
  openForm: (id: string) => void;
}

export default function ActivityDetails({
  activity,
  openForm,
  cancelSelectActivity,
}: Props) {
  const [imgSrc, setImgSrc] = useState(null);

  // 針對類別更改後的圖片修改載入
  useEffect(() => {
    import(`../../../assets/images/categoryImages/${activity.category}.jpg`)
      .then((imageModule) => {
        setImgSrc(imageModule.default);
      })
      .catch((error) => {
        console.error("圖片加載失敗", error);
      });
  }, [activity.category]);
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
            onClick={() => cancelSelectActivity()}
            basic
            color="grey"
            content="返回"
          />
        </Button.Group>
      </CardContent>
    </Card>
  );
}
