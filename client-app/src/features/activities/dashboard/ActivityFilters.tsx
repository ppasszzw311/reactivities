import { observer } from "mobx-react-lite";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default observer(function ActivityFilters() {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 27 }}>
        <Header icon="filter" attached color="teal" content="篩選" />
        <Menu.Item content="所有活動" />
        <Menu.Item content="正在進行" />
        <Menu.Item content="i'm hosting" />
      </Menu>
      <Header />
      <Calendar />
    </>
  );
});
