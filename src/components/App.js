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

  const [noteList, setNoteList] = useState([
    { id: "A", title: "AAA", content: null, },
    { id: "B", title: "BBB", content: null, },
  ]);

  const [currentId, setCurrentId] = useState(noteList[0].id);


  useEffect(() => {
    console.log(JSON.stringify(noteList, null, 2));
  }, [noteList,]);

  const onSaveHandler = (id, exportContent) => {
    // console.log(`save [${id}] = ${JSON.stringify(exportContent, null, 2)}`);

    const content = JSON.stringify(exportContent);

    const newNoteList = noteList.map(el => {
      if (el.id === id) {
        return {
          ...el,
          content,
        };
      }
      return el;
    })

    setNoteList(newNoteList);


  };

  const onLoadHandler = (id) => {
    return JSON.parse(noteList.find(el => el.id === id).content);
  };


  return (
    <Container>
      <SideBox setIdHandler={setCurrentId} list={noteList} />
      <NoteEditorContainer
        id={currentId}
        onSaveHandler={onSaveHandler}
        onLoadHandler={onLoadHandler}
      />
    </Container>
  );
}

export default App;
