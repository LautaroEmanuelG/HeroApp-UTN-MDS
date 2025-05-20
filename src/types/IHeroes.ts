// Interfaces para la API de Marvel
export interface IMarvelResponse {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: IMarvelData;
}

export interface IMarvelData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: IMarvelCharacter[];
}

export interface IMarvelCharacter {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: IMarvelImage;
  resourceURI: string;
  comics: IMarvelCollection;
  series: IMarvelCollection;
  stories: IMarvelStoryCollection;
  events: IMarvelCollection;
  urls: IMarvelURL[];
}

export interface IMarvelImage {
  path: string;
  extension: string;
}

export interface IMarvelCollection {
  available: number;
  collectionURI: string;
  items: IMarvelCollectionItem[];
  returned: number;
}

export interface IMarvelCollectionItem {
  resourceURI: string;
  name: string;
}

export interface IMarvelStoryCollection extends IMarvelCollection {
  items: IMarvelStoryItem[];
}

export interface IMarvelStoryItem extends IMarvelCollectionItem {
  type: string;
}

export interface IMarvelURL {
  type: string;
  url: string;
}
