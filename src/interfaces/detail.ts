export interface MorePostData {
  previousTripylerId: number;
  nextTripylerId: number;
  previousTitle: string;
  nextTitle: string;
}

export interface MorePostProps {
  data: MorePostData;
}

export interface ApplyListData {
  age: number;
  applicantId: number;
  gender: string;
  hashtag: string[];
  nickname: string;
  profileUrl: string;
  tripylerApplyId: number;
}

export interface TripylerDetailFormProps {
  data: TripylerDetailData;
  fetchData: () => void;
}

export interface TripylerDetailData {
  age: number;
  commentsCnt: number;
  content: string;
  endDate: string;
  estimatedPrice: number;
  gender: string;
  hashtagList: HashtagList[];
  hits: number;
  image: string;
  likes: number;
  myTripyler: boolean;
  nationName: string;
  nextTitle: string;
  nextTripylerId: number;
  nickname: string;
  previousTitle: string;
  previousTripylerId: number;
  profileUrl: string;
  recruitPeopleNum: number;
  regDateTime: string;
  regionName: string;
  startDate: string;
  title: string;
  tokenUserLiked: boolean;
  totalPeopleNum: number;
  tripylerId: number;
  tripylerImage: string;
  tripylerWithList: TripylerWithList[];
  userId: number;
}

export interface HashtagList {
  id: number;
  name: string;
}

export interface TripylerWithList {
  age: number;
  gender: string;
  nickname: string;
  profileUrl: string;
  userId: number;
}

export interface BannerProps {
  imageUrl: string;
}
