export interface RequestData {
    continentId: number;
    endDate: string | null;
    keyWord: string;
    nationId: number;
    regionId: number;
    startDate: string | null;
    totalPeopleNum: number;
}

export interface FilterQuery {
    continent: string;
    continentId: number;
    country: string;
    countryId: number;
    city: string;
    cityId: number;
    startDate: string | null;
    endDate: string | null;
    num: number;
    keyword: string;
}

export interface TripylerMainData {
    age: number;
    comments: number;
    content: string;
    endDate: string;
    gender: string;
    hashtag: string[];
    hits: number;
    imageUrl: string;
    likes: number;
    nationName: string;
    nickname: string;
    profileUrl: string;
    recruitPeopleNum: number;
    regDateTime: string;
    regionName: string;
    startDate: string;
    title: string;
    totalPeopleNum: number;
    tripylerId: number;
}

export interface ReviewMainData {
    age: number;
    comments: number;
    content: string;
    endDate: string;
    gender: string;
    hashtags: string[];
    hits: number;
    image: string;
    likes: number;
    nationName: string;
    regDateTime: string;
    regionName: string;
    reviewId: number;
    startDate: string;
    title: string;
    useProfileUrl: string;
    username: string;
}

export interface FilterDestination {
    continent: [];
    country: [];
    city: [];
}

export interface SelectedFilterDestination {
    continent: { 
        id: number; 
        name: string; 
    };
    country: { 
        id: number; 
        name: string; 
    };
    city: { 
        id: number; 
        name: string; 
    };
}

export interface ShowFilterDestination {
    country: string;
    city: string;
}

export interface Destination {
    id: number;
    name: string;
  }

// AdverBanner
export interface AdverArr {
    idx: number;
    img: string;
    title: string[];
}