import React, { useState } from "react";
import "./App.css";
import SearchBox from "./components/search-box";
import {
  WordObject,
  WordMap,
  DictionaryErrorResponse,
  WordError,
} from "./typings/Word";
import transformWordResponse from "./helpers/transformWordResponse";
import NotesSection from "./components/notes-section";
import * as Styled from "./styles";
import DefinitionList from "./components/definition-list";

const baseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

function App() {
  const [wordMap, setWordMap] = useState<WordMap>({});
  const [currentWordObject, setCurrentWordObject] = useState<WordObject>();
  const [error, setError] = useState<WordError>();

  const fetchData = async (searchQuery: string) => {
    // check if user has searched this word before
    if (wordMap[searchQuery]) {
      setError(undefined);
      setCurrentWordObject(wordMap[searchQuery]);
    } else {
      fetch(`${baseUrl}${searchQuery.toLowerCase()}`)
        .then((response) => response.json())
        .then((data) => {
          const transformedWordObject:
            | WordObject
            | DictionaryErrorResponse = transformWordResponse(data);
          if ("title" in transformedWordObject) {
            setError({
              word: searchQuery,
              ...transformedWordObject,
            });
          } else {
            setError(undefined);
            setWordMap({
              ...wordMap,
              [searchQuery.toLowerCase()]: transformedWordObject,
            });
            setCurrentWordObject(transformedWordObject);
          }
        });
    }
  };

  const addNotes = (newNote: string) => {
    if (!currentWordObject) return;
    let newNotesObject = { ...currentWordObject.notes };
    const newKeyNote = newNotesObject.numberOfNotes + 1;
    newNotesObject = {
      numberOfNotes: newKeyNote,
      data: {
        ...newNotesObject.data,
        [newKeyNote]: newNote,
      },
    };
    const updatedWordObject: WordObject = {
      ...currentWordObject,
      notes: newNotesObject,
    };
    setCurrentWordObject(updatedWordObject);
    setWordMap({
      ...wordMap,
      [currentWordObject.word]: updatedWordObject,
    });
  };

  const removeNote = (noteKey: number) => {
    if (!currentWordObject) return;
    if (currentWordObject.notes.data[noteKey]) {
      let newNotesObject = { ...currentWordObject.notes };
      delete newNotesObject.data[noteKey];
      newNotesObject = {
        ...newNotesObject,
        numberOfNotes: newNotesObject.numberOfNotes - 1,
      };
      setCurrentWordObject({
        ...currentWordObject,
        notes: newNotesObject,
      });
    }
  };

  return (
    <div className="App">
      <SearchBox submitSearchQuery={(query) => fetchData(query)} />
      <Styled.MainContent>
        <Styled.MainContentWrapper>
          {error ? (
            <>
              <p>{error.title}</p>
            </>
          ) : (
            currentWordObject && (
              <>
                <h2>
                  {currentWordObject.word}{" "}
                  <Styled.Phonetic>
                    - {currentWordObject.phonetic}
                  </Styled.Phonetic>
                </h2>
                <DefinitionList definitions={currentWordObject.definitions} />
                <NotesSection
                  notes={currentWordObject?.notes.data}
                  addNewNote={(newNote) => addNotes(newNote)}
                  removeNote={(noteKey) => removeNote(noteKey)}
                />
              </>
            )
          )}
        </Styled.MainContentWrapper>
      </Styled.MainContent>
    </div>
  );
}

export default App;
