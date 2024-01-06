export interface MorePostData {
  previousId: number;
  nextId: number;
  previousTitle: string;
  nextTitle: string;
}

export interface MorePostProps {
  data: MorePostData;
  isReview?: boolean;
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

export interface ApplyListItem {
  el: ApplyListData;
  checkApplyUser: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClickApplyBtn: (id: number) => void;
}

export interface TripylerFormProps {
  data: TripylerDetailData;
  fetchData: () => void;
}

export interface ReviewFormProps {
  data: ReviewDetailData;
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

export interface WithListProps {
  withList: TripylerWithList[];
}

export interface BannerProps {
  imageUrl: string;
}

export interface ReviewDetailData {
  age: number;
  commentsCnt: number;
  endDate: string;
  gender: string;
  hashtag1: string;
  hashtag2: string;
  hashtag3: string;
  hashtag4: string;
  hashtag5: string;
  hits: number;
  likes: number;
  myReview: true;
  nationName: string;
  nextReviewId: number;
  nextTitle: string;
  nickname: string;
  previousReviewId: number;
  previousTitle: string;
  profileUrl: string;
  recruitPeopleNum: number;
  regDateTime: string;
  regionName: string;
  reviewContent: string;
  reviewId: number;
  reviewImageList: string[];
  reviewOneLine: string;
  reviewTitle: string;
  startDate: string;
  tokenUserLiked: true;
  totalPeopleNum: number;
  tripylerId: number;
  tripylerImage: string;
  tripylerTitle: string;
  tripylerWithList: TripylerWithList[];
  userId: number;
}
