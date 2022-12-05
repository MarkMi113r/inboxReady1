import { StringifyOptions } from "querystring";

//usually, I put all interfaces in their own library...cause I'm used to 
//running same interfaces for front-end as backend...here for simplicity, they are not seperated to own library
//reall only needed a couple interfaces here
export interface iHitSource {
  agent: string;
  bytes: number;
  clientip: string;
  extension: string;
  geo: iHitGeo;

  host: string;
  index: string;
  ip: string;
  machine: { os: string; ram: number };
  memory?: undefined;
  message: string;
  phpmemory?: undefined;
  referer: string;
  request: string;
  response: number;
  tags: [];
  timestamp: Date;
  url: string;
  utc_time: Date;
}

export interface iHit {
  _id: string;
  _index: string;
  _score: number;
  _source: iHitSource;
  _type: string;
}

interface iHitGeo {
  coordinates: { lat: number; lon: number };
  dest: string;
  src: String;
  srcdest: string;
}
