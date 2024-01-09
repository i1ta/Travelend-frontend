// 객체 변수

import React from "react";

export interface TripylerWithList {
  id: string;
  nickname: string;
}

export interface MyHashtag {
  id: number;
  name: string;
}

export interface Place {
  continentId: number;
  nationId: number;
  nationName: string;
  regionId: number;
  regionName: string;
}

export interface Step1Data {
  totalPeopleNum: number;
  estimatiedPrice?: number;
  tripylerWithList?: TripylerWithList[];
}

export interface Step2Data {
  title: string;
  content: string;
}

// Props

export interface TripylerStep1Props {
  isEdit?: boolean;
  data: Step1Data;
  placeData: Place;
  tripDate: string[];
  hashtagList: MyHashtag[];
  setData: React.Dispatch<React.SetStateAction<Step1Data>>;
  setPlaceData: React.Dispatch<React.SetStateAction<Place>>;
  setTripDate: React.Dispatch<React.SetStateAction<string[]>>;
  setHashtagList: React.Dispatch<React.SetStateAction<MyHashtag[]>>;
}

export interface TripylerStep2Props {
  isEdit?: boolean;
  setData: React.Dispatch<React.SetStateAction<Step2Data>>;
}

export interface TripylerStep3Props {
  isEdit?: boolean;
  setImage: React.Dispatch<React.SetStateAction<File>>;
}

export interface PlaceModalProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPlaceData: React.Dispatch<React.SetStateAction<Place>>;
}

export interface IDModalProps {
  data: Step1Data;
  setData: React.Dispatch<React.SetStateAction<Step1Data>>;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
