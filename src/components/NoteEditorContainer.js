import { useEffect } from "react";
import styled from "styled-components";
// import NoteEditor from "./NoteEditor";
import RichEditor from "./RichEditor";


const Container = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    max-height: 100vh;
    overflow-y: hidden;
`;


function NoteEditorContainer(props) {

  const { id, onSaveHandler, onLoadHandler, onTitleUpdateHandler, } = props;

  const data = onLoadHandler(id);

  return (
    <Container>
      <RichEditor
        id={id}
        onSaveHandler={onSaveHandler}
        onTitleUpdateHandler={onTitleUpdateHandler}
        data={data}
      />
    </Container>
  );
}

export default NoteEditorContainer;