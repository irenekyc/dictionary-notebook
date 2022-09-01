import styled, { css } from "styled-components";

export const fontItalic = css`
  font-style: italic;
`;

export const MainContent = styled.div`
  flex: 1;
  h2 {
    margin: 0;
  }
`;

export const MainContentWrapper = styled.div`
  h2 {
    width: 100%;
    margin-bottom: 1rem;
  }
  @media (min-width: 1330px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const UnorderList = styled.ul`
  list-style-type: "- ";
  list-style-position: inside;
  padding: 0;
  text-transform: lowercase;
  margin-top: 0.5rem;
`;

export const Phonetic = styled.span`
  font-weight: 400;
  ${fontItalic};
  font-size: calc(10px + 2vmin);
`;

export const DefinitionListContainer = styled.div`
  padding-right: 2rem;
  @media (min-width: 1330px) {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

export const DefintionHeader = styled.h3`
  ${fontItalic};
  font-weight: 400;
  margin: 0;
`;

export const Definition = styled.li`
  font-size: 1.1rem;
`;

export const NotesSectionContainer = styled.div`
  border-top: 1px solid white;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 1330px) {
    padding: 0 1rem;
    border-top: none;
    justify-content: start;
    align-items: start;
    border-left: 1px solid white;
    flex-basic: 30%;
  }
`;

export const NotesSectionContentWrapper = styled.div`
  p {
    margin: 0;
    line-height: 1.5;
  }

  li {
    margin-bottom: 0.25rem;
    font-size: 1rem;
    span {
      margin-right: 0.5rem;
    }
  }
`;
