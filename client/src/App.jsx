import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Badge,
  ListGroup,
  Form,
  Button,
  ListGroupItem,
} from "react-bootstrap";

export default function App() {
  // Definiera tillstånd för användare, namn, ålder och e-post
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  // Använd useEffect för att hämta användardata från servern när komponenten renderas
  useEffect(() => {
    Axios.get("http://localhost:3001").then((res) => {
      setUsers(res.data);
    });
  }, [users]); // Uppdatera endast när användarlistan ändras

  // Funktion för att skapa en ny användare när knappen klickas
  const createUser = () => {
    if (name && age && email) {
      Axios.post("http://localhost:3001/createUser", {
        name: name,
        age: age,
        email: email,
      }).then((res) => res.data);
    }
  };

  // const createUser = async (e) => {
  //   e.preventDefault();
  //   if (name && age && email) {
  //     try {
  //       const res = await Axios.post("http://localhost:3001/createUser", {
  //         name: name,
  //         age: age,
  //         email: email,
  //       });
  //       // تحديث القائمة بعد إنشاء المستخدم
  //       setUsers([...users, res.data]);
  //       // فرغ الحقول بعد الإنشاء
  //       setName("");
  //       setAge("");
  //       setEmail("");
  //     } catch (error) {
  //       console.error("Error creating user:", error);
  //     }
  //   }
  // };

  return (
    <>
      <Container>
        <Form className="form">
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            type="number"
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
          />
          <Form.Control
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" onClick={createUser}>
            Create user
          </Button>
        </Form>

        <div className="result">
          {/* Visa varje användares information i en kort layout */}
          {users.map((user) => {
            return (
              <ListGroup key={user._id}>
                <ListGroupItem
                  variant="dark"
                  className="d-flex justify-content-between align-items-center"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{user.name}</div>
                    {user.email}
                  </div>
                  <Badge bg="success" pill>
                    {user.age}
                  </Badge>
                </ListGroupItem>
              </ListGroup>
            );
          })}
        </div>
      </Container>
    </>
  );
}
