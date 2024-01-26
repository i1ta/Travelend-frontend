import Axios from "@/apis";
// import { message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Platform () {
    const router = useRouter();
    const [fetchData, setFetchData] = useState([]);

    useEffect(() => {
        Axios.get('/crawl/eurang')
            .then((res) => {
                console.log(res);
                setFetchData(res.data.data);
            })
            .catch((err) => console.log(err));
    }, []);


    return (
        <Container>
            <PlatformHeader>
                타플랫폼
                <span style={{ 
                    fontSize: '1rem',
                    marginRight: '1rem'
                }}>의</span> 
                실시간 인기 동행 찾기 게시물 
                <span style={{ 
                    fontSize: '1rem',
                    margin: '0 1rem'
                }}>모아보기</span>
            </PlatformHeader>

            <PlatformContentWrapper>
                <ImgWrapper>
                    <Img src="/img/platformBanner.png" alt="bannerImg"
                    />
                </ImgWrapper>
                <ContentBox>
                    {
                        fetchData.length && 
                        fetchData
                            ?.filter((e) => e.id < 9)
                            ?.map((item) => {
                            const id = item.id;
                            const title = item.title;
                            const createdDate = item.createdDate;
                            const link = item.link;
                            console.log(title);
                            return (
                            <ContentWrapper key={id} onClick={() => router.push(link)}>
                                <ContentTitle>{title}</ContentTitle>
                                <ContentDate>{createdDate}</ContentDate>
                            </ContentWrapper>
                            )
                        })
                    }
                </ContentBox>
            </PlatformContentWrapper>
        </Container>
    )
};

const Container = styled.div`
    width: 100vw;
    margin: 0 auto;
`;

const PlatformHeader = styled.div`
    max-width: 1400px;
    width: 100vw;
    height: 64px;

    display: flex;
    flex-direction: row;

    font-style: normal;
    font-weight: bold;
    font-size: 1.5rem;
    color: #9AB3F5;
    margin: 30px auto;
    padding: 10px 0 10px 5px;
    background-color: #fff;
    align-items: flex-end;
    border-bottom: 2px solid #9AB3F5;
    white-space: nowrap;
`;

const PlatformContentWrapper = styled.div`
    max-width: 1400px;
    width: 100vw;
    margin: 0 auto;

    display: flex;
    gap: 1rem;
    justify-content: space-between;
`;

const ImgWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    width: 40%;
    object-fit: cover;
`;

const Img = styled.img`
// width: 33.5625rem;
width: 100%;
height: 22.625rem;
border-radius: 20px;
`;

const ContentBox = styled.div`
// width: 50.5rem;
width: 60%;
height: 22.625rem;
border-radius: 1.25rem;
background: #FFF;
box-shadow: 0px 2px 25px 0px rgba(102, 102, 102, 0.25);
padding: 1.75rem 1.5rem;
overflow: hidden;

display: flex;
flex-direction: column;
gap: 1.2rem;
`;

const ContentWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ContentTitle = styled.span`
color: #333;
text-align: center;
font-size: 1rem;
font-weight: 300;
`;

const ContentDate = styled.span`
color: #999;
text-align: center;
font-size: 0.75rem;
font-weight: 300;
`;