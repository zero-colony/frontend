import React from 'react';
import styled, { css } from 'styled-components';

type ImageIconWrapperType = {
  src: string;
  dimension: string;
};

const ImageIconWrapperStyle = styled.img<ImageIconWrapperType>`
  background-image: ${({ src }) => src};
  background-size: contain;
  ${({ dimension }) => {
    return css`
      width: ${dimension};
      height: ${dimension};
    `;
  }}
`;

export const ImageIconWrapper = ({ src, dimension }: ImageIconWrapperType) => {
  return <ImageIconWrapperStyle src={src} dimension={dimension} />;
};
