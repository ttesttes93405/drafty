import styled from "styled-components";
import SideNote from "./SideNote";


const Container = styled.div`
    width: 300px;
    border-right: 1px solid #000;
`;


function SideBox(props) {

  const { setIdHandler, list, } = props;


  return (
    <Container>
      <p>SideBox</p>
      {
        list.map((el, index) => (<SideNote key={el.title} {...el} onClick={() => setIdHandler(el.id)} />))
      }
    </Container>
  );
}

export default SideBox;