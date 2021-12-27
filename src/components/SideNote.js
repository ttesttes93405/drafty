import styled from "styled-components";


const Container = styled.div`
    height: 60px;
    border-bottom: 1px solid #000;
    cursor: pointer;


    h1 {
      font-size: 1.5rem;
    }
`;


function SideNote(props) {

    const { title, content, onClick, } = props;

    return (
      <Container onClick={onClick}>
        <h1>{title}</h1>
        {/* <p>{content}</p> */}
      </Container>
    );
  }
  
  export default SideNote;