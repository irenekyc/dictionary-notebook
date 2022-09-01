import {
  DictionaryResponse,
  WordObject,
  DictionaryErrorResponse,
} from "../typings/Word";

const transformWordResponse = (
  resData: DictionaryResponse[] | DictionaryErrorResponse
): WordObject | DictionaryErrorResponse => {
  if ("title" in resData) {
    return resData;
  }
  let wordDefinitions: string[] = [];
  resData[0].meanings.forEach(({ definitions }) =>
    definitions.forEach(({ definition }) => wordDefinitions.push(definition))
  );
  const wordObject: WordObject = {
    word: resData[0].word,
    phonetic: resData[0].phonetic,
    definitions: wordDefinitions,
    notes: {
      numberOfNotes: 0,
      data: {},
    },
  };
  return wordObject;
};

export default transformWordResponse;
