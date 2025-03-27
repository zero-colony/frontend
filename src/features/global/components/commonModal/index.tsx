import React, { useRef } from 'react';
import useOutsideClick from '@global/hooks/useOutsideClick';
import { CloseIcon } from '@images/icons/CloseIcon';
import styled, { css } from 'styled-components';
import useResizeObserver from 'use-resize-observer';

const CommonModalOuterWrapper = styled.div`
  * {
    box-sizing: border-box;
  }
`;

const CommonModalWrapper = styled.div<{ width?: string; isMobile?: boolean }>`
  box-sizing: border-box;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 12;
  min-width: 300px;

  ${({ width, isMobile }) => {
    if (width && !isMobile) {
      return css`
        width: ${width};
      `;
    }
  }}

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CommonBackgroundLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 13;
  opacity: 0.6;
  background: linear-gradient(
    125.3deg,
    #000000 0.82%,
    #363434 23.05%,
    #454141 48.89%,
    #363434 71.63%,
    #000000 100.05%
  );
`;

const CommonShadowLayer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(36, 37, 58, 0.5);
  backdrop-filter: blur(16px);
  z-index: 10;
`;

const CommonContentLayer = styled.div<{
  isMobile?: boolean;
  border?: string;
  isScrollable?: boolean;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 14;
  left: 0;
  top: 0;
  padding: 25px 20px;
  mix-blend-mode: normal;
  border: 2px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(
    rgba(255, 185, 139, 1),
    rgba(255, 108, 10, 1),
    rgba(117, 47, 0, 1),
    rgba(66, 24, 6, 1),
    rgba(255, 107, 33, 1)
  );

  ${({ isMobile, border, isScrollable }) => {
    const mobileStyles = isMobile
      ? css`
          left: 0;
          top: 0;
          height: 100vh;
          width: 100vw;
          border: none;
        `
      : css``;

    const scrollStyle = isScrollable
      ? css`
          overflow-x: hidden;
          overflow-y: scroll;
          &::-webkit-scrollbar {
            display: none !important;
          }

          -ms-overflow-style: none !important;
        `
      : css``;

    const borderStyles = border
      ? css`
          border: ${border};
          border-image-source: none;
          border-image-slice: unset;
        `
      : css``;

    return css`
      ${borderStyles};
      ${mobileStyles};
      ${scrollStyle};
    `;
  }};
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
`;

export const CommonModal: React.FC<{
  onClose?: () => void;
  width?: string;
  mobileBreakpoint?: number;
  border?: string;
  scrollBP?: number;
  mobileClose?: boolean;
  isCloseButton?: boolean;
}> = ({
  onClose,
  width = '300px',
  children,
  mobileBreakpoint = 900,
  border,
  scrollBP,
  mobileClose = true,
  isCloseButton = true,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { ref: wrapperRef, width: containerWidth } = useResizeObserver();
  const isMobile = (containerWidth ?? 0) < mobileBreakpoint;
  const isScrollable = Boolean(scrollBP && (containerWidth ?? 0) <= scrollBP);

  useOutsideClick(overlayRef, () => onClose?.());

  const CloseButton = () => (
    <CloseButtonWrapper onClick={onClose}>
      <CloseIcon />
    </CloseButtonWrapper>
  );

  return (
    <CommonModalOuterWrapper ref={wrapperRef}>
      <CommonShadowLayer />
      <CommonModalWrapper ref={overlayRef} width={width} isMobile={isMobile}>
        <CommonBackgroundLayer />
        <CommonContentLayer
          isMobile={isMobile}
          border={border}
          isScrollable={isScrollable}
        >
          {!isMobile && isCloseButton && <CloseButton />}
          {isMobile && mobileClose && isCloseButton && <CloseButton />}
          {children}
        </CommonContentLayer>
      </CommonModalWrapper>
    </CommonModalOuterWrapper>
  );
};

export default CommonModal;
