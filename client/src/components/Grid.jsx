import styled from "styled-components";

export default function Grid(props) {
  return (
    <StyledComponent>
      <table>
        <thead>
          <tr>
            {props.grid.map((list, index) => (
              <th key={index}></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.grid.map((list, index) => (
            <tr key={index}>
              {list.map((item, index) => (
                <td key={index}>{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </StyledComponent>
  );
}

const StyledComponent = styled.div`
  display: flex;
  justify-content: center;

  td {
    padding: 10px;
  }
`;
