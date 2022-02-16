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

const defaultNote = {
  id: '0',
  title: "Let's Drafty!",
  content: "{\"blocks\":[{\"key\":\"1b35v\",\"text\":\"Hello !\",\"type\":\"header-one\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"desgh\",\"text\":\"Drafty 是個輕量化的文字編輯器\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"bhspe\",\"text\":\"試試在這裡寫些東西，或是新增筆記\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":5,\"length\":4,\"style\":\"BOLD\"},{\"offset\":12,\"length\":4,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"6vfji\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"doklg\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"fe72g\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
  peekContent: "Hello !",
  order: 0,
  isFavorite: false,
};

function App() {

  const [noteList, setNoteList] = useState({
    0: defaultNote,
  });

  useEffect(() => {

    const fetchIdsData = localStorage.getItem('__noteList__');

    if (fetchIdsData === null) {
      //完全新的狀況
      storageNote(defaultNote);
    }

    const idsData = localStorage.getItem('__noteList__');
    const ids = JSON.parse(idsData);
    if (ids) {
      const loadNoteList = {};

      ids.forEach(id => {
        const noteData = localStorage.getItem(`note:${id}`);
        const note = JSON.parse(noteData);
        loadNoteList[note.id] = note;
      });

      setNoteList(loadNoteList);
      setCurrentId(ids[0]);

    }

  }, []);

  const [currentId, setCurrentId] = useState('');

  const storageNote = (note) => {

    if (note.id === '') {
      return;
    }

    localStorage.setItem(`note:${note.id}`, JSON.stringify(note));

    const noteIdList = Object.keys(noteList);
    localStorage.setItem('__noteList__', JSON.stringify(noteIdList));
  }

  const removeStorageNote = (id) => {

    if (id === '') {
      return;
    }

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

    if (Object.keys(noteList).length === 0) {
      storageNote(defaultNote);
    }

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
