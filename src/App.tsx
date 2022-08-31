import React from 'react';
import './App.css';
import styled from "styled-components";

function App() {
  return (
    <div className="App">
        <TestComponent />
    </div>
  );
}

export const TestComponent: React.FunctionComponent = () => {
    return (
        <SearchContainer>
            <span>Search a word:</span>
            <input type="text" />
            <button>Search</button>
        </SearchContainer>
    );
};

const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export default App;
