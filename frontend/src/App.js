/* eslint-disable react/jsx-no-undef */
import GlobalStyle from './styles/global';
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid.js"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useEffect, useState} from "react";
import axios from "axios";

const Container = styled.div`
   width: 100%;
   max-width: 800px;
   margin-top: 20px;
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 10px;
`;

const Title = styled.h2``;

// function App() {
//   return (
//     <>
//       <Container>
//         <Title>USUÁRIOS</Title>
//         <Form />
//       </Container>
//       <ToastContainer autoClose={3000} position={"bottom-left"} />
//       <GlobalStyle />
//     </>
//   );
// }
function App() {

  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try{
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  console.log("Renderizando App");
  return (
    <div>
      <h1>Teste básico</h1>
      <Container>
      <Title>USUÁRIOS</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
      <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.position="bottom-left"} />
      <GlobalStyle />
    </div >
  );
}
export default App;
