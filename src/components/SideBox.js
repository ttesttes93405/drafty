import styled from "styled-components";


const Container = styled.div`
    width: 300px;
    border-right: 1px solid #000;
`;


function SideBox() {
    return (
      <Container>
        <p>SideBox</p>
      </Container>
    );
  }
  
  export default SideBox;