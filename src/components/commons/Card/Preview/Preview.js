import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useState } from "react";

export default function PreviewCard (props) {
    const previewList = [
    {
        title: "Trip’yle를 통해 새로운 인연을 만들다",
        content: `처음 혼자 가는 해외여행이라 걱정됐었는데 Trip’yle를 통해 마음이 잘 맞는 동행자를 만났고 약 3박 4일 동안 정말 재미있게 여행할 수 있어습니다. 
        Trip’yle에서 만들어준 여행스타일 해시태그 기반으로 잘 맞는 여행 동행자를 구할 수 있어서 만족스러웠습니다. 친한 친구들과 여행가는 것만큼 재밌었습니다. 여행 이후에도 좋은 인연이 되어 자주 만나고 있어요. 
        새로운 인연을 만들어줘서 고마워요, Trip’yle!`
    },
    {
        title: "“극 J인 분의 여행후기 보고 일정 짰어요 ”",
        content: `극 P인 성향이라 일본 여행 계획 짜는게 너무 귀찮았는데 여행 전날 J성향이신 것 같은 분의 상세한 일본 여행 후기를 보고 참고해서 잘 다녀왔습니다. 상세하게 여정을 기록해주신 분들 덕분에 여행 계획 짤 때 도움이 많이 됐던 것 같아요. 궁금한 부분은 여행 후기 댓글을 통해 해당 여행자와 소통할 수 있어서 아주 좋습니다!
        여행자들끼리 소통할 수 있는 공간을 마련해줘서 고마워요, Trip’yle!
        `
    },
    {
        title: "“여행갈 때마다 믿고 사용하는 Trip’yle”",
        content: `여행 동행자를 찾을 때 개인정보 유출에 대한 걱정 없이 안전하게 사용할 수 있어서 좋고, 함께 여행하며 쌓은 소중한 추억들을 후기로 공유하는 것도 다른 여행자들과 소통하는 재미를 느낄 수 있어요. Trip'yle는 신뢰성과 편의성을 모두 갖춘 플랫폼으로, 믿고 이용할 수 있는 공간이어서 제가 여행갈 때마다 자주 이용합니다!!
        적게 일하시고 돈 많이 버세요~!`
    },
    {
        title: "“극 J인 분의 여행후기 보고 일정 짰어요 ”",
        content: `극 P인 성향이라 일본 여행 계획 짜는게 너무 귀찮았는데 여행 전날 J성향이신 것 같은 분의 상세한 일본 여행 후기를 보고 참고해서 잘 다녀왔습니다. 상세하게 여정을 기록해주신 분들 덕분에 여행 계획 짤 때 도움이 많이 됐던 것 같아요. 궁금한 부분은 여행 후기 댓글을 통해 해당 여행자와 소통할 수 있어서 아주 좋습니다!
        여행자들끼리 소통할 수 있는 공간을 마련해줘서 고마워요, Trip’yle!
        `
    },
    {
        title: "Trip’yle를 통해 새로운 인연을 만들다",
        content: `처음 혼자 가는 해외여행이라 걱정됐었는데 Trip’yle를 통해 마음이 잘 맞는 동행자를 만났고 약 3박 4일 동안 정말 재미있게 여행할 수 있어습니다. 
        Trip’yle에서 만들어준 여행스타일 해시태그 기반으로 잘 맞는 여행 동행자를 구할 수 있어서 만족스러웠습니다. 친한 친구들과 여행가는 것만큼 재밌었습니다. 여행 이후에도 좋은 인연이 되어 자주 만나고 있어요. 
        새로운 인연을 만들어줘서 고마워요, Trip’yle!`
    },
    {
        title: "“여행갈 때마다 믿고 사용하는 Trip’yle”",
        content: `여행 동행자를 찾을 때 개인정보 유출에 대한 걱정 없이 안전하게 사용할 수 있어서 좋고, 함께 여행하며 쌓은 소중한 추억들을 후기로 공유하는 것도 다른 여행자들과 소통하는 재미를 느낄 수 있어요. Trip'yle는 신뢰성과 편의성을 모두 갖춘 플랫폼으로, 믿고 이용할 수 있는 공간이어서 제가 여행갈 때마다 자주 이용합니다!!
        적게 일하시고 돈 많이 버세요~!`
    },

    ];

    const [currentIdx, setCurrentIdx] = useState(0);
    return(
        <PreviewWrapper>
            <PreviewTitle>실제 이용 후기로 보는 Trip'yle</PreviewTitle>
            <PreviewContentWrapper>
                <ArrowIcon src="/icon/previewLeftArrow.png" onClick={(e) => setCurrentIdx((prev) => prev - 1 < 0 ? 0 : prev - 1)}></ArrowIcon>
                <PreviewCardWrapper>
                    {previewList.map((element, idx) => {
                        const isHidden = currentIdx > idx || currentIdx + 2 < idx;
                        if(!isHidden){
                        return (
                        <Preview 
                            key={idx}
                            hidden={isHidden}
                        >
                        <PreviewUser>
                            <PreviewUserImg src="/img/shinchan.jpg"></PreviewUserImg>
                            <PreviewUserId>ilta0101님</PreviewUserId>
                        </PreviewUser>
                        <PreviewContent>
                            <PreviewTitleTxt>{element.title}</PreviewTitleTxt>
                            <PreviewTxt>{element.content}
                            </PreviewTxt>
                        </PreviewContent>
                        </Preview>
                    )}})}
                    
                </PreviewCardWrapper>
                <ArrowIcon src="/icon/previewRightArrow.png" onClick={(e) =>{ 
                    setCurrentIdx((prev) => prev + 1 > 3 ? 3 : prev + 1)
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
    font-size: 30px;
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
`;

const ArrowIcon = styled.img`
    height: 50px;
    width: 35px;
    margin: 0 50px;
    cursor: pointer;
`;

const PreviewCardWrapper = styled.div`
    display: flex;
    flex-direction: row;

`;

const Preview = styled.div`
    height: 535px;
    width: 443px;

    display: flex;
    flex-direction: column;
    box-shadow: 0px 10px 30px 10px rgba(102, 102, 102, 0.12);
    margin: 0 24px;
    
    /*
    transition: transform 0.5s ease-in-out;

    transform: ${(props) => (props.active ? 'translateX(0)' : 'translateX(-100%)')};

    display: ${(props) => 
        props.hidden ? 'none' : 'block'
    }
    
    transform: ${(props) => 
        props.hidden ? 'translateX(-100%)' : 'translateX(0)'
    }
    */
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