import styled from 'styled-components';

type ContentWrapperType = {
  height: string;
};

const PartedMarsMainWrapper = styled.div`
  position: relative;
`;

const PartedMarsViewWrapper = styled.div<ContentWrapperType>`
  // Placed to avoid issues with styles overrides here
  height: ${(props) => props.height} !important;
  position: absolute;
`;

export { PartedMarsMainWrapper, PartedMarsViewWrapper };
