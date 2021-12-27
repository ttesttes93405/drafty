import React, { useEffect, useState } from "react";
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

  const [noteList, setNoteList] = useState({
    "A": { id: "A", title: "AAA", content: null, peekContent: '', order: 0, },
    "B": { id: "B", title: "BBB", content: null, peekContent: '', order: 1, },
  });

  const [currentId, setCurrentId] = useState(noteList['A'].id);

  const onSaveHandler = (id, exportContent) => {
    // console.log(`save [${id}] = ${JSON.stringify(exportContent, null, 2)}`);

    const content = JSON.stringify(exportContent);
    const peekContent = exportContent.blocks ? exportContent.blocks[0].text : '';

    console.log(exportContent)

    const newNoteList = {
      ...noteList,
      [id]: {
        ...noteList[id],
        content,
        peekContent
      }
    };

    setNoteList(newNoteList);


  };

  const onTitleUpdateHandler = (id, title) => {
    const newNoteList = {
      ...noteList,
      [id]: {
        ...noteList[id],
        title,
      }
    }
    setNoteList(newNoteList);
  }

  const onLoadHandler = (id) => {
    return noteList[id];
  };


  return (
    <Container>
      <SideBox
        currentId={currentId}
        setIdHandler={setCurrentId}
        notes={noteList}
      />
      <NoteEditorContainer
        id={currentId}
        onSaveHandler={onSaveHandler}
        onLoadHandler={onLoadHandler}
        onTitleUpdateHandler={onTitleUpdateHandler}
      />
    </Container>
  );
}

export default App;
