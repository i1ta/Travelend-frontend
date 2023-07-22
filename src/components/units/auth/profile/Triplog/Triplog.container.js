import { useEffect, useState } from "react";

import * as S from "../MyCollections/MyCollections.styles";
import Modal from "../../../../commons/Modal/Modal";
import axios from "axios";
import FindCard from "@/components/commons/Triplog/FindCard";
import ReviewCard from "@/components/commons/Triplog/ReviewCard"

export default function Triplog() {

  const [selectedCategory, setSelectedCategory] = useState(0);
  return (<>
  <S.MyCollectionsWrapper>
  <S.CollectionTitleWrapper>
    <S.CollectionTitle>Triplog</S.CollectionTitle>
  </S.CollectionTitleWrapper>

  <S.CollectionWrapper>
    <S.CollectionContentTitleWrapper>
      <S.CollectionContentTitleLeftWrapper>
        <S.CollectionContentIcon src="/icon/purpleSearch.png"></S.CollectionContentIcon>
        <S.CollectionContentTitle selected={selectedCategory === 0} onClick={(e) => setSelectedCategory(0)}>My Trip'yler들</S.CollectionContentTitle>
        <S.CollectionContentLine></S.CollectionContentLine>
        <S.CollectionContentTitle selected={selectedCategory === 1} onClick={(e) => setSelectedCategory(1)}>My 여행 후기</S.CollectionContentTitle>
      </S.CollectionContentTitleLeftWrapper>
    </S.CollectionContentTitleWrapper>
    {selectedCategory === 0 ? (
      <S.CollectionContent>
        <FindCard/>
        <FindCard/>
        <FindCard/>
        <FindCard/>
        <FindCard/>
      </S.CollectionContent>
    ) : (
      <S.CollectionContent>
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        
      </S.CollectionContent>
    )}
  </S.CollectionWrapper>
</S.MyCollectionsWrapper>
</>);
}
