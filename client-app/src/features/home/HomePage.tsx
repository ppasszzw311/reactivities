import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";


export default function HomePage() {
    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as={'h1'} inverted>
                    <Image size="massive" src='/assets/logo.png' alt='logo' style={{matginBottom: 12}}/>
                    活動紀錄者
                </Header>
                <Header as={'h2'} inverted content='歡迎來到活動紀錄者'/>
                <Button as={Link} to='/activities' size='huge' inverted content='到活動'/>
            </Container>
        </Segment>
    )
}