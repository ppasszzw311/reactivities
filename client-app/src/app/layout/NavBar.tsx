import { Container, Menu, Button} from "semantic-ui-react";
import logo from "../../assets/images/logo.png";

interface Props {
    openForm: () => void;
}

export default function NavBar({openForm}: Props) {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src={logo} alt="logo" style={{marginRight: 10}}/>
                    範例網頁
                </Menu.Item>
                <Menu.Item name="活動"/>
                <Menu.Item>
                    <Button onClick={() => openForm()} content="新增活動" />
                </Menu.Item>
            </Container>

        </Menu>

    );
}
