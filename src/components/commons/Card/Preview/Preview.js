import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRef } from "react";

export default function PreviewCard (props) {
    const previewList = [
    {
        id: "ilta0606",
        title: "Trip’yle를 통해 새로운 인연을 만들다",
        content: `처음 혼자 가는 해외여행이라 걱정됐었는데 Trip’yle를 통해 마음이 잘 맞는 동행자를 만났고 약 3박 4일 동안 정말 재미있게 여행할 수 있어습니다. 
        Trip’yle에서 만들어준 여행스타일 해시태그 기반으로 잘 맞는 여행 동행자를 구할 수 있어서 만족스러웠습니다. 친한 친구들과 여행가는 것만큼 재밌었습니다. 여행 이후에도 좋은 인연이 되어 자주 만나고 있어요. 
        새로운 인연을 만들어줘서 고마워요, Trip’yle!`
    },
    {
        id: "ilta0505",
        title: "극 J인 분의 여행후기 보고 일정 짰어요 ",
        content: `극 P인 성향이라 일본 여행 계획 짜는게 너무 귀찮았는데 여행 전날 J성향이신 것 같은 분의 상세한 일본 여행 후기를 보고 참고해서 잘 다녀왔습니다. 상세하게 여정을 기록해주신 분들 덕분에 여행 계획 짤 때 도움이 많이 됐던 것 같아요. 궁금한 부분은 여행 후기 댓글을 통해 해당 여행자와 소통할 수 있어서 아주 좋습니다!
        여행자들끼리 소통할 수 있는 공간을 마련해줘서 고마워요, Trip’yle!
        `
    },
    {
        id: "ilta0101",
        title: "여행갈 때마다 믿고 사용하는 Trip’yle",
        content: `여행 동행자를 찾을 때 개인정보 유출에 대한 걱정 없이 안전하게 사용할 수 있어서 좋고, 함께 여행하며 쌓은 소중한 추억들을 후기로 공유하는 것도 다른 여행자들과 소통하는 재미를 느낄 수 있어요. Trip'yle는 신뢰성과 편의성을 모두 갖춘 플랫폼으로, 믿고 이용할 수 있는 공간이어서 제가 여행갈 때마다 자주 이용합니다!!
        적게 일하시고 돈 많이 버세요~!`
    },
    {
        id: "ilta0404",
        title: "Trip’yle: 새로운 경험의 발판",
        content: `저는 매번 여행 갈 때마다 새로운 경험을 하는 것을 중요시 하는 사람이에요. 그래서 매번 여행 스타일도 달라져요. 매번 새로운 성향의 사람을 찾기가 힘들었는데 Trip’yle에서는 키워드 검색만 하면 여행 성향 해시태그까지 같이 검색이돼서 찾기가 정말 수월했어요.
        그래서 시간 절약도 하고 지금은 또 새로운 여행을 다른 트리플러와 함께 계획중이에요. 요즘 바쁜 현대사회에서 시간내기 참 어려운데 Trip’yle 덕분에 여행 쉽게 갑니다!
        `
    },
    {
        id: "ilta0202",
        title: "여행가고싶어질 때면? TripLog",
        content: `여행 후기 작성은 제 여행 경험을 소중히 기록하는 좋은 방법이었어요. Trip'yle의 마이페이지에는 쪽지기능도 이용 가능해서 언제든지 여행 계획을 조율할 수 있고 일상에 치여 여행이 가고싶어질때면 제 TripLog를 통해서 회상하곤 한답니다..
        또한, 취향이 안맞는데 자꾸 쪽지를 보내는 트리플러들은 차단하면 그만이라 정말 편한 것 같아요. 더욱 안심도 돼요 ㅎㅎ`
    },
    {
        id: "ilta0303",
        title: "J찾는 P들 여기 모여라 Trip’yle",
        content: `여행은 처음이라 걱정이 많았는데, Trip'yle 덕분에 멋진 동행자를 만났어요.. 이 분은 정말 자기소개에 해시태그처럼 철저한 J성격으로 거의 모든 여행 계획을 다 세워주셨어요.. 덕분에 즐거운 시간을 보냈습니다! 저도 너무 받기만 하는 것 같아서 하루는 제가 일찍 일어나서 브런치를 포장해왔답니다! 
        진짜 여행스타일 해시태그를 활용하여 딱 맞는 동행자를 찾는 것이 너무 편리했고, 개인정보 유출 걱정 없이 안전하게 이용할 수 있었습니다. `
    },

    ];

    const previewCardRef = useRef(null);
    const onRightSide = async (e) => {
        console.log(previewCardRef.current);
        if (previewCardRef.current) {
            previewCardRef.current.scrollLeft += 480;
        }
    };

    const onLeftSide = async (e) => {
        if (previewCardRef.current) {
            previewCardRef.current.scrollLeft -= 480;
        }
    }

    const [currentIdx, setCurrentIdx] = useState(0);
    return(
        <PreviewWrapper>
            <PreviewTitle>실제 이용 후기로 보는 Trip'yle</PreviewTitle>
            <PreviewContentWrapper>
                <ArrowIcon src="/icon/previewLeftArrow.png" onClick={(e) => {
                    setCurrentIdx((prev) => prev - 1 < 0 ? 0 : prev - 1);
                    onLeftSide(e);
                }}></ArrowIcon>
                <PreviewCardWrapper ref={previewCardRef}>
                    {previewList.map((element, idx) => 
                            (
                            <Preview 
                                key={idx}
                            >
                            <PreviewUser>
                                <PreviewUserImg src="/img/shinchan.jpg"></PreviewUserImg>
                                <PreviewUserId>{element.id}님</PreviewUserId>
                            </PreviewUser>
                            <PreviewContent>
                                <PreviewTitleTxt>{element.title}</PreviewTitleTxt>
                                <PreviewTxt>{element.content}
                                </PreviewTxt>
                            </PreviewContent>
                            </Preview>))
                    }
                    
                </PreviewCardWrapper>
                <ArrowIcon src="/icon/previewRightArrow.png" onClick={(e) =>{ 
                    setCurrentIdx((prev) => prev + 1 > 3 ? 3 : prev + 1);
                    onRightSide(e);
                }}></ArrowIcon>
            </PreviewContentWrapper>
        </PreviewWrapper>
    );
}

const PreviewWrapper = styled.div`
    height: 930px;
    padding: 48px;

    display: flex;
    flex-direction: column;
`;

const PreviewTitle = styled.div`
    font-size: 35px;
    font-weight: bold;
    color: #C8B6FF;
    text-align: center;
`;

const PreviewContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const ArrowIcon = styled.img`
    height: 50px;
    width: 35px;
    margin: 0 50px;
    cursor: pointer;
`;

const PreviewCardWrapper = styled.div`

    height: 600px;
    width: 1470px;

    align-items: center;

    overflow-x: scroll;
    
    display: grid;
    grid-auto-flow: column;
    
    overscroll-behavior-inline: contain;
    scroll-behavior: smooth;
    scroll-snap-type: inline mandatory;
    scroll-padding-inline: 1rem;

    &::-webkit-scrollbar {
        display: none;
    }
    
`;

const Preview = styled.div`
    height: 535px;
    width: 443px;

    display: flex;
    flex-direction: column;
    box-shadow: 0px 5px 15px 5px rgba(102, 102, 102, 0.12);
    margin: 0 24px;

    scroll-snap-align: start;
    transition: all 0.5s;
    `;

    
const PreviewUser = styled.div`
    display: flex;
    flex-direction: row;

    align-items: center;
    padding: 40px 40px 30px 40px;
`;

const PreviewUserImg = styled.img`
    width: 95px;
    height: 95px;
    border-radius: 100px;
    object-fit: cover;
    margin-right: 30px;
`;  

const PreviewUserId = styled.div`
    justify-content: center;
    align-items: center;
    
    font-size: 25px;
    color: #C8B6FF;
    font-weight: bold;
`;  

const PreviewContent = styled.div`
    padding: 0 40px;
`;

const PreviewTitleTxt = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: #C8B6FF;
    margin: 30px 0;
`;

const PreviewTxt = styled.div`
    font-size: 16px;
    color: #A7A7A7;
`;