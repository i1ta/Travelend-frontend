import { styled, keyframes } from "styled-components";
import { useState, useEffect } from "react";

export default function TopBtn() {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY > 0) {
        setIsHidden(false);
      } else {
        setIsHidden(true);
      }
    });
  }, []);

  const topScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Btn className={isHidden ? "hidden" : ""} onClick={topScroll}>
        TOP
      </Btn>
    </>
  );
}

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to{
        opacity: 0;
    }
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to{
        opacity: 1;
    }
`;

const Btn = styled.div`
  background-color: #000;
  color: #fff;
  padding: 20px;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;

  position: fixed;
  bottom: 30px;
  right: 30px;

  animation-duration: 0.2s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  &.hidden {
    animation-duration: 0.2s;
    animation-timing-function: ease-out;
    animation-name: ${fadeOut};
    animation-fill-mode: forwards;
  }
`;
