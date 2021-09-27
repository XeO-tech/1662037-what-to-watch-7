import * as React from 'react';

export default function VideoPreview(videoLink: string): JSX.Element {
  return (
    <video muted autoPlay width={280} height={175}>
      <source src={videoLink}></source>
    </video>
  );
}
