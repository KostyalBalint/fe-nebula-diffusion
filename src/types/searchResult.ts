type HighlightResult = {
  fullyHighlighted: boolean;
  matchLevel: string;
  matchedWords: string[];
  value: string;
};

export type SearchResult = {
  _highlightResult: {
    custom_label: HighlightResult;
    description: HighlightResult;
    uid: HighlightResult;
  };
  custom_label: string;
  description: string;
  name: string;
  objectID: string;
  uid: string;
};
