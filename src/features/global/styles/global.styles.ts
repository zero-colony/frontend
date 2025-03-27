import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Play', sans-serif;
  }

  .common-icon-wrapper {
    margin: 0 5px
  }
  
  .pointer {
    cursor: pointer;
  }
  
  .flex-30 {
    flex: 0 30px;
  }
  
  .flex-160 {
    flex: 0 160px;
  }

  .esri-ui-top-left {
    /* move ctrls to bottom of nav */
    margin-top: 120px !important;
    
    @media (max-width: 800px) {
      margin-top: 180px !important;
    }
  }

  .popup__picture {
    width: 100%;
  }

  .popup {
    display: flex;
    position: relative;
  }

  .popup__column {
    flex: 1;
    height: 165px;
  }

  .popup__claim {
    width: 99%;
    height: 40px;
    background-color: #ef2037;
    border: 0;
    border-radius: 10px;
    color: white;
  }

  .popup__claim:disabled {
    background-color: #7C8087;
  }

  .popup__column div {
    font-size: 1.2rem;
  }

  .popup__column .popup__geo {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }

  .popup__column div.popup__insuf {
    color: #FF3943;
    font-size: 0.8rem;
    text-align: center;
  }
  
  // Leftover (?), never used
  .stopped {
    color: #FF7C25;
    width: 300px;
    height: 200px;
    position: absolute;
    left: calc(50vw - 150px);
    top: calc(50vh - 100px);
    background: linear-gradient(180deg, #282830 0%, #000000 100%);
    line-height: 200px;
    text-align: center;
    font-weight: bold;
  }


  @media (max-width: 680px) {
    .mars_nav__menu_item--desktop {
      display: none;
    }
  }
`;

export default GlobalStyle;
