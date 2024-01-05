export interface CharecterResponseInterface {
  info: {
    count: number;
    next: string;
    prev: string;
  };
  results: CharacterInterface[];
}

export interface CharacterInterface {
  id: number;
  name: string;
  image: string;
  episode: string[];
  episodeNumber: number;
}
