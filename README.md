# Web test
In this test you're expected to complete a react app given a base setup.
In this folder you'll find 2 projects, one in Typescript and another in plain Javascript, feel free to pick the one to your preference.

The test objective is to measure your React knowledge and general development skills.
You'll be evaluated for:
 - Completeness
 - Code readability and structure
 - Responsiveness
 - State management
 - Components modularization

## Objectives:

- Search a word from a dictionary
  - api url: `https://api.dictionaryapi.dev/api/v2/entries/en/${word}` (more info on `https://dictionaryapi.dev/`)
  - The word should be fetched from the api as few times as possible.
- Display returned words
  - for each word, show it's phonetic and all definitions.
  - See `desktop.png` and `mobile.png` for reference
- Add/remove notes to a word
  - A note is a string with any information about that word. 
  - The information should persist through searching other words
