import styled from "styled-components";
import NoteEditorContainer from "./NoteEditorContainer";
import SideBox from "./SideBox";


const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  

`;

function App() {
  return (
    <Container>
      <SideBox />
      <NoteEditorContainer />
    </Container>
  );
}

export default App;
