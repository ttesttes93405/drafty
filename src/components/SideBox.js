import styled from "styled-components";
import SideNote from "./SideNote";


const Container = styled.div`
    width: 300px;
    border-right: 1px solid #000;
`;

function SideBox(props) {

  const { currentId, setIdHandler, notes, } = props;


  return (
    <Container>
      <p>SideBox</p>
      {
        Object.entries(notes).map(([key, value]) => (<SideNote
          className={key === currentId ? 'selected' : ''}
          key={value.title}
          {...value}
          onClick={() => setIdHandler(key)}
        />))
      }
    </Container>
  );
}

export default SideBox;