import { MOBILE_BREAKPOINT } from '@global/constants';
import { fontProperty } from '@global/styles/fonts.styles';
import {
  BLACK,
  COMMON_GRAY,
  LIGHT_GRAY,
  LIGHT_GREY,
  TOXIC_GREEN,
  WHITE
} from '@global/styles/variables';
import styled, { css } from 'styled-components';

const SidebarWrapper = styled.div<{ isHidden?: boolean }>`
  box-sizing: border-box;
  padding: 12px 8.5px;
  background: ${COMMON_GRAY};
  min-width: 70px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  transition: all 0.5s;
  opacity: 1;
  visibility: visible;
  z-index: 9999;

  * {
    box-sizing: border-box;
  }

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    min-width: 92px;
  }

  ${({ isHidden }) => {
    if (isHidden) {
      return css`
        left: -100px;
        opacity: 0;
        visibility: hidden;
      `;
    }
  }}
`;

const SidebarMobileControl = styled.div<{ isOpened?: boolean }>`
  position: fixed;
  left: 16px;
  top: 21px;
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 12px;
  z-index: 99;

  svg {
    transition: all 0.3s;
    cursor: pointer;
    
    &:hover {
      transform: rotate(-90deg);
    }
    ${({ isOpened }) => {
      if (isOpened) {
        return css`
          transform: rotate(-90deg);
        `;
      }
    }}
`;

const SidebarTitle = styled.p`
  ${fontProperty};
  font-size: 8px;
  line-height: 10px;
  text-align: center;
  text-transform: uppercase;
  position: relative;
  color: ${WHITE};

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    left: -5px;
  }

  svg {
    top: -1px;
    right: -10px;
    position: absolute;
    cursor: pointer;
  }
`;

const SidebarItemsList = styled.div`
  display: flex;
  flex-direction: column;
  height: inherit;

  @media screen and (max-height: 700px) {
    &::-webkit-scrollbar {
      display: none;
    }
    height: 90vh;
    overflow-y: scroll;
  }
`;

const SidebarItemsListInner = styled.div`
  background: rgba(33, 35, 43, 0.6);
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  flex-grow: 1;
`;

const SidebarItemWrapper = styled.div<{ isCurrentRoute?: boolean }>`
  border-radius: 2px;
  width: 55px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  padding: 5px 10px;
  gap: 3px;

  &:hover {
    background-color: ${LIGHT_GRAY};
  }

  ${({ isCurrentRoute }) => {
    if (isCurrentRoute) {
      return css`
        background-color: ${LIGHT_GRAY};
      `;
    }
  }}
`;

const SidebarItemName = styled.p<{ disabled?: boolean }>`
  ${fontProperty};
  font-family: 'Helvetica', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 10px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #ffffff;
  margin: 0;

  ${({ disabled }) => {
    if (disabled) {
      return css`
        color: ${LIGHT_GREY};
      `;
    }
  }}
`;

const SidebarItemCounter = styled.span<{ disabled?: boolean }>`
  position: absolute;
  min-width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${TOXIC_GREEN};
  display: flex;
  align-items: center;
  justify-content: center;

  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 11px;
  text-align: center;
  letter-spacing: 0.04em;

  color: ${BLACK};
  right: 7px;
  top: 25px;
  ${({ disabled }) => {
    if (disabled) {
      return css`
        background-color: ${LIGHT_GREY};
      `;
    }
  }};
`;

const SidebarBackOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9998;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('/UIParts/Noise.png');
  backdrop-filter: blur(25px);
  height: 100vh;
  width: 100vw;
  opacity: 0.95;
  transition: all 0.3ms;
`;

const SidebarAvatarWrapper = styled.div<{ url?: string }>`
  height: 45px;
  width: 45px;
  border-radius: 50%;
  box-sizing: border-box;
  justify-self: flex-end;
  background-image: ${({ url }) => `url(${url})`};
  background-size: contain;
  margin-top: auto;
  margin-bottom: 10px;
  cursor: pointer;
`;

export {
  SidebarAvatarWrapper,
  SidebarBackOverlay,
  SidebarItemCounter,
  SidebarItemName,
  SidebarItemsList,
  SidebarItemsListInner,
  SidebarItemWrapper,
  SidebarMobileControl,
  SidebarTitle,
  SidebarWrapper
};
