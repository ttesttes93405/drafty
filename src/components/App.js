import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NoteEditorContainer from "./NoteEditorContainer";
import SideBox from "./SideBox";
import '../index.css';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;  

`;



function App() {

  const getAliveNoteIds = () => {
    return Object.keys(noteList);
  };

  const [noteList, setNoteList] = useState({
    0: { id: '0', title: '學習指南：React 介紹', content: null, peekContent: '', order: 0, isFavorite: false, },
    1: { id: '1', title: 'React Conf 2021 Recap', content: null, peekContent: '', order: 1, isFavorite: false, },
  });

  const [currentId, setCurrentId] = useState(getAliveNoteIds()[0]);

  const onSaveHandler = (id, exportContent) => {
    // console.log(`save [${id}] = ${JSON.stringify(exportContent, null, 2)}`);

    if (!noteList[id]) {

      console.log(`無 ${id} Note，不予儲存`);
      return;
    }

    const content = JSON.stringify(exportContent);
    const peekContent = exportContent.blocks ? exportContent.blocks[0].text : '';

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

  const onToggleFavoriteHandler = (id) => {
    const targetNote = noteList[id];
    if (!targetNote) {
      return;
    }

    const newNote = {
      ...targetNote,
      isFavorite: !(targetNote.isFavorite || false),
    }

    // console.log(newNote);

    const newNoteList = {
      ...noteList,
      [id]: newNote,
    };

    // console.log(newNoteList)

    setNoteList(newNoteList);

  }

  const addNoteHandler = () => {
    const newNote = {
      id: (Math.max(...Object.values(noteList).map(e => Number(e.id))) + 1).toString(),
      title: "New Note",
      content: null,
      peekContent: '',
    }

    const newNoteList = {
      ...noteList,
      [newNote.id]: newNote,
    };

    setNoteList(newNoteList)
    setCurrentId(newNote.id);

  }

  const removeNoteHandler = (id) => {

    const newNoteList = { ...noteList };
    delete newNoteList[id];

    setNoteList(newNoteList);

  }

  return (
    <Container>
      <SideBox
        currentId={currentId}
        setIdHandler={setCurrentId}
        notes={noteList}
        addNoteHandler={addNoteHandler}
        removeNoteHandler={removeNoteHandler}
        onToggleFavoriteHandler={onToggleFavoriteHandler}
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
