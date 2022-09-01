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
  const [wordMap, setWordMap] = useState<WordMap>({}); // manage current app data storage
  const [currentWordObject, setCurrentWordObject] = useState<WordObject>(); // manage current app display state
  const [error, setError] = useState<WordError>(); // for error handling

  const fetchData = async (searchQuery: string) => {
    // check if user has searched this word before
    if (wordMap[searchQuery]) {
      setError(undefined);
      setCurrentWordObject(wordMap[searchQuery]);
    } else {
      // if word does not exist in the data
      fetch(`${baseUrl}${searchQuery.toLowerCase()}`)
        .then((response) => response.json())
        .then((data) => {
          const transformedWordObject:
            | WordObject
            | DictionaryErrorResponse = transformWordResponse(data);
          //  if response has error response
          if ("title" in transformedWordObject) {
            setError({
              word: searchQuery,
              ...transformedWordObject,
            });
          } else {
            // if response comes with valid definitions and data
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

  // add notes to word object and update data
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

    // update state and word map
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

  // remove note from current word object and update word map
  const removeNote = (noteKey: number) => {
    if (!currentWordObject) return;
    // check noteKey exist in the current data structure
    if (currentWordObject.notes.data[noteKey]) {
      let newNotesObject = { ...currentWordObject.notes };
      delete newNotesObject.data[noteKey];
      newNotesObject = {
        ...newNotesObject,
        numberOfNotes: newNotesObject.numberOfNotes - 1,
      };

      // update state and word map
      setCurrentWordObject({
        ...currentWordObject,
        notes: newNotesObject,
      });
      setWordMap({
        ...wordMap,
        [currentWordObject.word]: {
          ...currentWordObject,
          notes: newNotesObject,
        },
      });
    }
  };

  return (
    <div className="App">
      <SearchBox submitSearchQuery={(query) => fetchData(query)} />
      <Styled.MainContent>
        <Styled.MainContentWrapper>
          {error ? (
            <p>{error.title}</p>
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
