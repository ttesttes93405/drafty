import styled from "styled-components";


const Container = styled.div`
    height: 80px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    background-color: #ffffff;
    padding: 8px;
    box-sizing: border-box;


    &:hover {
      background-color: #f8f8f8;
    }

    &.selected {
      background-color: #d0d0d0;
    }

    h1 {
      font-size: 1.35rem;
      margin: 0;
      height: 37px;
      line-height: 37px;
      font-weight: 500;
      overflow: hidden;
      text-overflow : ellipsis;
      white-space : nowrap;
    }

    p {
      font-size: 0.9rem;
      margin: 0;
      height: 27px;
      /* line-height: 27px; */
      color: #444;
      overflow: hidden;
      text-overflow : ellipsis;
      white-space : nowrap;
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