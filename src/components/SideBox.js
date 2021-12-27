import styled from "styled-components";
import SideNote from "./SideNote";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    border-right: 1px solid #bbb;
`;

const Header = styled.div`
    height: 70px;
    border-bottom: 1px solid #eee;
    flex-shrink: 0;
`;

const Space = styled.div`
    flex-grow: 1;
`;

const AddButton = styled.button`
  margin: 8px;
  height: 50px;
  border-style: none;
  background-color: #eee;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;


  &:hover {
  background-color: #ddd;
  }

  img {
    margin-left: -4px;
  }
  span {
    margin-left: 4px;
  }
`

const NoteList = styled.div`
    flex-grow: 1;
    overflow-y: auto;
`;

function SideBox(props) {

  const { currentId, setIdHandler, notes, addNoteHandler, } = props;


  return (
    <Container>
      <Header>DRAFTY</Header>
      <NoteList>
        {
          Object.entries(notes).map(([key, value]) => (<SideNote
            className={key === currentId ? 'selected' : ''}
            key={value.title}
            {...value}
            onClick={() => setIdHandler(key)}
          />))
        }
      </NoteList>
      <AddButton onClick={addNoteHandler}>
        <img src={`/icons/plus-circle.svg`} />
        <span>新增筆記</span>
      </AddButton>
    </Container>
  );
}

export default SideBox;