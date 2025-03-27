import styled from 'styled-components';

const EnhButtonWrapper = styled.button`
  display: block;
  border: 0;
  width: 105px;
  height: 30px;
  background-color: #fe5161;
  border-radius: 6px;
  color: #000000;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 2px;
  font-family: 'Play', sans-serif;
  cursor: pointer;
  margin-left: 7px;
  position: relative;

  &:not([disabled]):hover {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 0px 20px #fe5161);
  }

  &:disabled {
    color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.2);
  }

  .enh_button__get {
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
  }

  .enh_button__for {
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 11.6px;
    text-align: center;
  }
`;

const EnhButtonError = styled.div<{
  mt?: string;
}>`
  position: absolute;
  top: ${({ mt }) => mt ?? '-13px'};
  color: rgb(255, 0, 0);
  font-size: 10px;
  left: 13px;
  text-align: center;
  text-transform: initial;
  font-weight: 400;
`;

const EhchSidebarWrapper = styled.div`
  margin-top: 15px;
`;

export { EhchSidebarWrapper, EnhButtonError, EnhButtonWrapper };
