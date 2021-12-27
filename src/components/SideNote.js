import styled from "styled-components";


const Container = styled.div`
    height: 60px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    background-color: #ffffff;


    &:hover {
      background-color: #f8f8f8;
    }

    &.selected {
      background-color: #d0d0d0;
    }

    h1 {
      font-size: 1.5rem;
      margin: 0;
    }

    p {
      font-size: 1.2rem;
      margin: 0;
    }
`;


function SideNote(props) {

  const { title, peekContent, onClick, className, } = props;

  return (
    <Container onClick={onClick} className={className}>
      <h1>{title}</h1>
      <p>{peekContent}</p>
    </Container>
  );
}

export default SideNote;