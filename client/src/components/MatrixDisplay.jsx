/* eslint-disable react/prop-types */
import styled from "styled-components";

export default function MatrixDisplay({ data }) {
  return (
    <StyledMatrix>
      {data.map((row, rowIndex) => (
        <div key={rowIndex} className="matrix-row">
          {row.map((item, colIndex) => (
            <div key={colIndex} className="matrix-cell">
              {item}
            </div>
          ))}
        </div>
      ))}
    </StyledMatrix>
  );
}

const StyledMatrix = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .matrix-row {
    display: flex;
  }

  .matrix-cell {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 2px;
    text-align: center;
  }
`;
