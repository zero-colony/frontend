import React from 'react';
import { YOUTUBE_FRAME_DIMENSIONS } from '@global/constants';

import { VideoWrapper } from './youtube.styles';

const YoutubeEmbed = ({
  embedId,
  height,
  width
}: {
  embedId: string;
  height?: string;
  width?: string;
}) => (
  <VideoWrapper>
    <iframe
      width={width ?? YOUTUBE_FRAME_DIMENSIONS.width}
      height={height ?? YOUTUBE_FRAME_DIMENSIONS.height}
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </VideoWrapper>
);

export default YoutubeEmbed;
