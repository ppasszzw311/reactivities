import { Container, Menu, Button} from "semantic-ui-react";
import logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";


export default function NavBar() {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src={logo} alt="logo" style={{marginRight: 10}}/>
                    範例網頁
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name="活動"/>
                <Menu.Item>
                    <Button as={NavLink} to='/create-activity' content="新增活動" />
                </Menu.Item>
            </Container>

        </Menu>

    );
}
