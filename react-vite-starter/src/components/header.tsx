import { Container, Navbar, Form } from "react-bootstrap";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { changeMode } from "../redux/app/app.slide";
import { useEffect } from "react";



const Header = () => {
    const users = useAppSelector(state => state.user.listUsers);

    const mode = useAppSelector(state => state.app.mode);
    const dispatch = useDispatch();

    useEffect(() => {
        const body = document.querySelector("body");
        if (body) {
            body.setAttribute("data-bs-theme", mode);
        }
    }, [mode])

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">DungND Redux {users.length} </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content -end">
                    <Form.Check
                        defaultChecked={mode === "dark" ? true : false}
                        onChange={(e) => dispatch(changeMode(e.target.checked == true ? "dark" : "light"))}
                        type="switch"
                        id="custom-switch"
                        label={mode === "light" ? <Navbar.Text>Light Mode</Navbar.Text> : <Navbar.Text>Dark Mode</Navbar.Text>}
                    />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;