import styled from "styled-components";
// import NoteEditor from "./NoteEditor";
import RichEditor from "./RichEditor";


const Container = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    padding: 16px;
`;


function NoteEditorContainer() {
  return (
    <Container>
      <p>NoteEditorContainer</p>
      <RichEditor />
    </Container>
  );
}

export default NoteEditorContainer;