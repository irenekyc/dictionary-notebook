import React from "react";
import { WordObject } from "../../typings/Word";
import * as Styled from "../../styles";

interface DefinitionListProps {
  definitions: WordObject["definitions"];
}

const DefinitionList: React.FunctionComponent<DefinitionListProps> = ({
  definitions,
  ...props
}: DefinitionListProps) => {
  return (
    <Styled.DefinitionListContainer {...props}>
      <Styled.DefintionHeader>Definitions</Styled.DefintionHeader>
      <Styled.UnorderList>
        {definitions.map((definition: string) => (
          <Styled.Definition key={definition}>{definition}</Styled.Definition>
        ))}
      </Styled.UnorderList>
    </Styled.DefinitionListContainer>
  );
};
export default DefinitionList;
