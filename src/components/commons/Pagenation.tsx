import styled from "styled-components";

interface Props {
    currentPage: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    pageNum: number[][];
    totalNum: number;
    pageSize: number;
}

export default function Pagenation ({currentPage, setPage, pageNum, totalNum, pageSize} : Props) {
    return(
        <>
            <PageNationWrapper>
              <DoubleArrowImg
                src="/icon/doubleLeft.png"
                onClick={(e) => setPage(1)}
              ></DoubleArrowImg>
              <ArrowImg
                src="/icon/pageLeftArrow.png"
                onClick={(e) =>
                  setPage((prev) => (prev - 1 < 1 ? 1 : prev - 1))
                }
              ></ArrowImg>
              {pageNum?.map(
                (i: number[]) =>
                  i?.includes(currentPage) &&
                  i?.map((el: number) => (
                    <PageTxt
                      onClick={(e) => setPage(el)}
                      selected={el === currentPage}
                    >
                      {el}
                    </PageTxt>
                  ))
              )}
              <ArrowImg
                src="/icon/pageRightArrow.png"
                onClick={(e) =>
                  setPage((prev) =>
                    prev + 1 > Math.ceil(totalNum / pageSize)
                      ? Math.ceil(totalNum / pageSize)
                      : prev + 1
                  )
                }
              ></ArrowImg>
              <DoubleArrowImg
                src="/icon/doubleRight.png"
                onClick={(e) => setPage(Math.ceil(totalNum / pageSize))}
              ></DoubleArrowImg>
            </PageNationWrapper>
        </>
    )
}


const PageNationWrapper = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: center;

  margin: 70px 0 200px 0;
`;

const PageTxt = styled.div<{ selected: boolean }>`
  font-size: 25px;
  margin: 0 10px;
  cursor: pointer;

  color: ${(props) => 
    props.selected ? '#000000' : 'rgba(0, 0, 0, 0.3)'
  }

`;

const ArrowImg = styled.img`
  height: 25px;
  width: 15px;
  margin: 0 20px;
  margin-top: 7px;
  cursor: pointer;
`;

const DoubleArrowImg = styled(ArrowImg)`
  margin: 0 10px;
  margin-top: 7px;
  width: 25px;
`;

const AdWrapper = styled.div`
  text-align: center;
  margin: 150px auto;
`;

const AdImg = styled.img`
  height: 410px;
  width: 1920px;
`;