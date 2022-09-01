import React, { useState } from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface SearchBoxProps {
  submitSearchQuery: (query: string) => void;
}

const SearchBox: React.FunctionComponent<SearchBoxProps> = ({
  submitSearchQuery,
  ...props
}: SearchBoxProps) => {
  const [query, setQuery] = useState<string>("");
  const onClickSearchButton = () => {
    submitSearchQuery(query);
  };
  return (
    <SearchContainer {...props}>
      <span>Search a word:</span>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.keyCode === 13 && onClickSearchButton()}
      />
      <button onClick={onClickSearchButton}>Search</button>
    </SearchContainer>
  );
};

export default SearchBox;
