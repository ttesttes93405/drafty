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

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

  .wrapper {
    /* background-color: #eee; */
    

    p {
      color: #888;
    }
  }

`;


function NoteEditorContainer(props) {

  const { id, onSaveHandler, onLoadHandler, onTitleUpdateHandler, } = props;

  const data = onLoadHandler(id);



  return (
    <Container>
      {id ? (
        <RichEditor
          id={id}
          onSaveHandler={onSaveHandler}
          onTitleUpdateHandler={onTitleUpdateHandler}
          data={data}
        />
      ) : (
        <EmptyContainer>
          <div className='wrapper'>
            <p>新增一個筆記開始編輯！</p>
          </div>
        </EmptyContainer>
      )}
    </Container>
  );
}

export default NoteEditorContainer;