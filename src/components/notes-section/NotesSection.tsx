import React, { useState, useEffect } from "react";
import { WordObject } from "../../typings/Word";
import * as Styled from "../../styles";

interface NotesSectionProps {
  notes: WordObject["notes"]["data"] | undefined;
  addNewNote: (noteKey: string) => void;
  removeNote: (noteKey: keyof WordObject["notes"]["data"]) => void;
}

const NotesSection: React.FunctionComponent<NotesSectionProps> = ({
  notes,
  addNewNote,
  removeNote,
  ...props
}: NotesSectionProps) => {
  const [newNote, setNewNote] = useState<string>("");
  const onClickAddNote = () => {
    addNewNote(newNote);
    setNewNote("");
  };

  useEffect(() => console.log(notes), [notes]);
  if (!notes) return null;

  return (
    <Styled.NotesSectionContainer {...props}>
      <Styled.NotesSectionContentWrapper>
        <p>Notes</p>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={(e) => e.keyCode === 13 && onClickAddNote()}
        />
        <button onClick={onClickAddNote}>Add note</button>
        <Styled.UnorderList>
          {notes &&
            Object.entries(notes).map(([noteKey, note]) => (
              <li key={noteKey}>
                <span>{note}</span>
                <button onClick={() => removeNote(parseInt(noteKey, 10))}>
                  Remove
                </button>
              </li>
            ))}
        </Styled.UnorderList>
      </Styled.NotesSectionContentWrapper>
    </Styled.NotesSectionContainer>
  );
};

export default NotesSection;
