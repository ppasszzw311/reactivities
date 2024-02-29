import { Container, Menu, Button} from "semantic-ui-react";
import logo from "../../assets/images/logo.png";
import { useStore } from "../stores/store";


export default function NavBar() {
    const { activityStore } = useStore();
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src={logo} alt="logo" style={{marginRight: 10}}/>
                    範例網頁
                </Menu.Item>
                <Menu.Item name="活動"/>
                <Menu.Item>
                    <Button onClick={() => activityStore.openForm()} content="新增活動" />
                </Menu.Item>
            </Container>

        </Menu>

    );
}
