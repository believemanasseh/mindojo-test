import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Button } from "antd";
import "./App.css";
import {
  useFetchGridsQuery,
  useFetchResultQuery,
} from "./redux/features/api/apiSlice";
import { setCurrentIndex } from "./redux/features/reducers/defaultSlice";
import Loader from "./components/Loader";
import Grid from "./components/Grid";

const dummyItems = [
  {
    key: 0,
    label: "Case 1",
    children: [],
  },
  {
    key: 1,
    label: "Case 2",
    children: [],
  },
  {
    key: 2,
    label: "Case 3",
    children: [],
  },
  {
    key: 3,
    label: "Case 4",
    children: [],
  },
  {
    key: 4,
    label: "Case 5",
    children: [],
  },
  {
    key: 5,
    label: "Case 6",
    children: [],
  },
];

export default function App() {
  const dispatch = useDispatch();
  const defaultState = useSelector((state) => state.default);
  const [items, setItems] = useState(dummyItems);
  const [showResult, setShowResult] = useState(false);

  const fetchGrid = useFetchGridsQuery(defaultState.currentIndex);
  const fetchResult = useFetchResultQuery(defaultState.currentIndex);

  useEffect(() => {
    const newItems = items.map((item) =>
      item.key === defaultState.currentIndex
        ? {
            ...item,
            children: fetchGrid.isLoading ? (
              <Loader />
            ) : (
              <Grid grid={fetchGrid.data.grid} />
            ),
          }
        : item
    );

    if (JSON.stringify(items) !== JSON.stringify(newItems)) setItems(newItems);
  }, [fetchGrid, items, defaultState.currentIndex]);

  const onChange = (key) => {
    setShowResult(false);
    dispatch(setCurrentIndex(parseInt(key)));
  };

  if (fetchGrid.isLoading || fetchResult.isLoading) return <Loader />;

  return (
    <>
      <StyledComponent>
        <div className="grids">
          <Tabs defaultActiveKey="0" items={items} onChange={onChange} />;
          <Button type="primary" onClick={() => setShowResult(true)}>
            Show Result
          </Button>
        </div>
        <div className="results">
          {showResult && (
            <div>
              <h4>
                Number of cells that can flow to both edges:{" "}
                {fetchResult.data.numOfCells}
              </h4>
              <h4>The coordinates are shown in the array below:</h4>
              <p>
                [
                {fetchResult.data.coordinates.map((coordinate, index) => {
                  let showComma = true;
                  if (index === fetchResult.data.coordinates.length - 1) {
                    showComma = false;
                  }
                  return (
                    <span key={index}>
                      ({coordinate[0]}, {coordinate[1]}){showComma && ","}{" "}
                    </span>
                  );
                })}
                ]
              </p>
            </div>
          )}
        </div>
      </StyledComponent>
    </>
  );
}

const StyledComponent = styled.div`
  height: 100vh;
  width: auto;
  display: flex;
  gap: 100px;

  button {
    margin-top: 30px;
  }
`;
