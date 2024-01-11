import { Global, css } from "@emotion/react";

const style = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border-collapse: collapse;
    text-decoration: none;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    line-height: 1;
  }

  li {
    list-style: none;
  }

  button {
    border: none;
    outline: none;
    cursor: pointer;
    background-color: transparent;
  }

  textarea {
    border: none;
    outline: none;
  }

  input {
    border: none;
    outline: none;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }

  html {
    font-size: 125%;
    -webkit-text-size-adjust: none;
  }

  @media screen and (min-device-width: 0px) and (max-device-width: 359.9px) {
    html {
      /* 5px */
      font-size: 62.5%;
    }
  }

  // @media screen and (min-device-width: 80px) {
  //   html {
  //     /* 5px */
  //     font-size: 31.25%;
  //   }
  // }

  // @media screen and (min-device-width: 120px) {
  //   html {
  //     font-size: 37.5%;
  //   }
  // }

  // @media screen and (min-device-width: 200px) {
  //   html {
  //     /* 7px */
  //     font-size: 43.75%;
  //   }
  // }

  // @media screen and (min-device-width: 280px) {
  //   html {
  //     /* 8px */
  //     font-size: 50%;
  //   }
  // }

  // @media screen and (min-device-width: 320px) {
  //   html {
  //     /* 10px */
  //     font-size: 62.5%;
  //   }
  // }

  @media screen and (min-device-width: 360px) {
    html {
      /* 11.25px */
      font-size: 70.3125%;
    }
  }

  @media screen and (min-device-width: 375px) {
    html {
      font-size: 73.2421%;
    }
  }

  @media screen and (min-device-width: 412px) {
    html {
      font-size: 80.4688%;
    }
  }

  @media screen and (min-device-width: 480px) {
    html {
      font-size: 80.8594%;
    }
  }

  @media screen and (min-device-width: 640px) {
    html {
      font-size: 87.5%;
    }
  }

  @media screen and (min-device-width: 768px) {
    html {
      font-size: 100%;
    }
  }

  @media screen and (min-device-width: 820px) {
    html {
      font-size: 112.5%;
    }
  }

  // @media screen and (min-device-width: 860px) {
  //   html {
  //     font-size: 112.5%;
  //   }
  // }

  // @media screen and (min-device-width: 1080px) {
  //   html {
  //     font-size: 112.5%;
  //   }
  // }

  @media screen and (min-device-width: 1023.9px) {
    html {
      // 18px
      font-size: 112.5%;
    }
  }
`;
const GlobalStyle = () => {
  return <Global styles={style} />;
};
export default GlobalStyle;
