export type DictionaryResponse = {
  word: string;
  phonetic: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example: string;
    }[];
  }[];
};

export type DictionaryErrorResponse = {
  title: string;
  message: string;
  resolution: string;
};

export type WordObject = {
  word: string;
  phonetic: string;
  definitions: string[];
  notes: {
    numberOfNotes: number;
    data: {
      [index: number]: string;
    };
  };
};

export type WordMap = {
  [word: string]: WordObject;
};

export type WordError = DictionaryErrorResponse & {
  word: string;
};
