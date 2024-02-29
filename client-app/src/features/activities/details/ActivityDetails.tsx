import {  Grid
} from "semantic-ui-react";
import { useEffect} from "react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import ActivityDetailHeader from "./ActivityDetailHeader";
import ActivityDetailInfo from "./ActivityDetailInfo";
import ActivityDetailChat from "./ActivityDetailChat";
import ActivityDetailSidebar from "./ActivityDetailSidebar";

export default observer(function ActivityDetails() {
  const { activityStore } = useStore();
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
  // useEffect(() => {
  //   activity &&
  //     import(`/assets/categoryImages/${activity.category}.jpg`)
  //       .then((imageModule) => {
  //         setImgSrc(imageModule.default);
  //       })
  //       .catch((error) => {
  //         console.error("圖片加載失敗", error);
  //       });
  // }, [activity]);

  if (loadingInitial || !activity) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailHeader activity={activity}/>
        <ActivityDetailInfo activity={activity}/>
        <ActivityDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailSidebar />
      </Grid.Column>
    </Grid>
  );
});
