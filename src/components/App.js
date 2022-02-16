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

  const [noteList, setNoteList] = useState({
    0: { id: '0', title: '學習指南：React 介紹', content: null, peekContent: '', order: 0, isFavorite: false, },
  });

  useEffect(() => {

    const idsData = localStorage.getItem('__noteList__');

    if (idsData !== null) {
      const ids = JSON.parse(idsData);
      if (ids) {
        const loadNoteList = {};

        ids.forEach(id => {
          const noteData = localStorage.getItem(`note:${id}`);
          const note = JSON.parse(noteData);
          loadNoteList[note.id] = note;
        });

        setNoteList(loadNoteList);

        console.log(loadNoteList);
      }
    }

  }, []);

  const [currentId, setCurrentId] = useState(Object.keys(noteList)[0]);

  const storageNote = (note) => {
    localStorage.setItem(`note:${note.id}`, JSON.stringify(note));

    const noteIdList = Object.keys(noteList);
    localStorage.setItem('__noteList__', JSON.stringify(noteIdList));
  }

  const removeStorageNote = (id) => {
    localStorage.removeItem(`note:${id}`);

    const noteIdList = Object.keys(noteList).filter(k => k !== id);
    localStorage.setItem('__noteList__', JSON.stringify(noteIdList));
  }


  const onSaveHandler = (id, exportContent) => {
    // console.log(`save [${id}] = ${JSON.stringify(exportContent, null, 2)}`);

    if (!noteList[id]) {

      console.log(`無 ${id} Note，不予儲存`);
      return;
    }

    const content = JSON.stringify(exportContent);
    const peekContent = exportContent.blocks ? exportContent.blocks[0].text : '';

    const newNote = {
      ...noteList[id],
      content,
      peekContent
    };

    const newNoteList = {
      ...noteList,
      [id]: newNote,
    };

    setNoteList(newNoteList);
    storageNote(newNote);

  };

  const onTitleUpdateHandler = (id, title) => {

    const newNote = {
      ...noteList[id],
      title,
    };

    const newNoteList = {
      ...noteList,
      [id]: newNote,
    }
    setNoteList(newNoteList);
    storageNote(newNote);
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
    storageNote(newNote);

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
    storageNote(newNote);
    setCurrentId(newNote.id);

  }

  const removeNoteHandler = (id) => {

    const newNoteList = { ...noteList };
    delete newNoteList[id];

    setNoteList(newNoteList);
    removeStorageNote(id);

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
