import { AdverArr } from "@/interfaces/main";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function AdverBanner() {
  // 광고 배너
  const [adverIdx, setAdverIdx] = useState(0);
  const advertiseArr: AdverArr[] = [
    {
      idx: 0,
      img: "/img/adver1.png",
      title: ["오사카 2박 3일 하나투어 패키지", "30% 할인"],
    },
    {
      idx: 1,
      img: "/img/adver2.png",
      title: ["뉴욕 4박 5일 모두투어 패키지", "50% 할인"],
    },
    {
      idx: 2,
      img: "/img/adver3.png",
      title: ["가을 맞이 밴쿠버 5박 6일 하나투어 패키지", "30% 할인"],
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAdverIdx((prevIdx) => (prevIdx === 2 ? 0 : prevIdx + 1));
    }, 5000);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 클리어
  }, [adverIdx]);

  return (
    <AdWrapper style={{ cursor: "pointer" }}>
      {advertiseArr?.map((e: AdverArr) => {
        if (e.idx === adverIdx) {
          return (
            <AdBannerWrapper>
              <AdImgWrapper>
                <AdImg src={e.img} key={e.idx} />
              </AdImgWrapper>
              <AdTitleWrapper>
                {e.title.map((title: string, j: number) => (
                  <AdTitle
                    id={String(j)}
                    style={{ top: `calc(${j} * 100px + 300px)` }}
                  >
                    {title}
                  </AdTitle>
                ))}
              </AdTitleWrapper>
            </AdBannerWrapper>
          );
        }
      })}
    </AdWrapper>
  );
}

const AdWrapper = styled.div`
  max-width: 1960px;
  width: 100vw;
  margin: 150px auto;

  ${({ theme }) => theme.media.tablet} {
    display: none;
  }

  ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`;

const AdBannerWrapper = styled.div`
  position: relative;
  margin: 1.5rem auto;
`;

const AdImgWrapper = styled.div`
  object-fit: cover;
`;

const AdImg = styled.img`
  height: 610px;
  max-width: 1920px;
  width: 100vw;
  opacity: 0.7;
`;

const AdTitleWrapper = styled.div`
  ${({theme}) => theme.media.tablet}{
    display: none;
  }

  ${({theme}) => theme.media.mobile}{
    display: none;
  }
`;

const AdTitle = styled.div`
  position: absolute;
  left: 12.5rem;

  color: #fff;
  font-size: 3.0rem;
  font-weight: bold;
  white-space: nowrap;
`;
