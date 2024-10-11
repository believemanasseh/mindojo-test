import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Tabs, Button } from "antd";
import MatrixDisplay from "./components/MatrixDisplay";
import {
  useGetGridsQuery,
  useGetResultQuery,
} from "../hooks/features/api/apiSlice";
import { setCurrentIndex } from "../hooks/features/app/appSlice";
import "./App.css";

const dummyItems = [
  {
    key: "1",
    label: "Case 1",
    children: [],
  },
  {
    key: "2",
    label: "Case 2",
    children: [],
  },
  {
    key: "3",
    label: "Case 3",
    children: [],
  },
  {
    key: "4",
    label: "Case 4",
    children: [],
  },
  {
    key: "5",
    label: "Case 5",
    children: [],
  },
];

function App() {
  const dispatch = useDispatch();
  const defaultState = useSelector((state) => state.defaultState);
  const [items, setItems] = useState(dummyItems);
  const [showResult, setShowResult] = useState(false);
  const fetchGrids = useGetGridsQuery(defaultState.currentIndex);
  const fetchResult = useGetResultQuery(defaultState.currentIndex);

  useEffect(() => {
    if (!fetchGrids.isError && fetchGrids.data) {
      const grid = fetchGrids.data.grid;

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.key === `${defaultState.currentIndex + 1}`
            ? { ...item, children: grid }
            : item
        )
      );
    }
  }, [fetchGrids, defaultState]);

  const onChange = (key) => {
    dispatch(setCurrentIndex(parseInt(key) - 1));
    setShowResult(false);
  };

  return (
    <StyledComponent>
      <div>
        <Tabs defaultActiveKey="1" onChange={onChange}>
          {items.map((item) => (
            <Tabs.TabPane tab={item.label} key={item.key}>
              <MatrixDisplay
                data={item.children}
                currentIndex={defaultState.currentIndex}
              />
            </Tabs.TabPane>
          ))}
        </Tabs>

        <Button
          type="primary"
          className="btn"
          onClick={() => setShowResult(true)}
        >
          Show Results
        </Button>
      </div>
      <div className="result">
        {showResult ? (
          <div>
            <div>
              The number of cells that can reach both NW and SE edges:{" "}
              {fetchResult.data.numOfCells}
            </div>
            The cell coordinates are given below:
            {fetchResult.data.coordinates.map((coord, index) => (
              <div key={index}>
                {coord[0]}, {coord[1]}
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </StyledComponent>
  );
}

const StyledComponent = styled.div`
  height: 100vh;
  width: auto;
  display: flex;
  flex-flow: row nowrap;
  gap: 100px;
  justify-content: center;

  .btn {
    margin-top: 40px;
  }

  .result {
    margin-top: 10px;
  }
`;

export default App;
