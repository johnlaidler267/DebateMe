import SearchIcon from '@mui/icons-material/Search';
import { Button, Form } from 'react-bootstrap';
import { HeaderText, Header, TM } from "./TitleElements";

// make a title for top of the web page
const Title = () => {
    return (
        <Header>
            <HeaderText>
                DebateMe<TM>TM</TM>
                <Form className='d-flex justify-content-center align-items-center w-50'>
                    <Form.Group controlId="formElectionName">
                        <Form.Control type="text" placeholder="Enter election name" style={{
                            width: "24vw",
                            height: 45,
                            borderTopLeftRadius: "1.25rem",
                            borderBottomLeftRadius: "1.25rem",
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0
                        }} />
                    </Form.Group>
                    <Button variant="secondary" type="submit" style={{
                        height: 45,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderTopRightRadius: "1.25rem",
                        borderBottomRightRadius: "1.25rem"
                    }}>
                        <SearchIcon />
                    </Button>
                </Form>
            </HeaderText>
        </Header>
    );
};

export default Title;