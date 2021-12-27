import styled from "styled-components";
// import NoteEditor from "./NoteEditor";
import RichEditor from "./RichEditor";


const Container = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    padding: 16px;
`;


function NoteEditorContainer(props) {

  const { id, onSaveHandler, onLoadHandler, } = props;


  return (
    <Container>
      <p>NoteEditorContainer #{id}</p>
      <RichEditor
        id={id}
        onSaveHandler={onSaveHandler}
        onLoadHandler={onLoadHandler}
      />
    </Container>
  );
}

export default NoteEditorContainer;