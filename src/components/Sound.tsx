import React, { useImperativeHandle } from "react";

export interface SoundProps {
  audio: any;
}

export interface SoundRef {
  play: () => void;
}

export const Sound = React.forwardRef<SoundRef, SoundProps>((props, ref) => {
  const audioPtRef = React.useRef<HTMLAudioElement>();

  useImperativeHandle(ref, () => {
    return {
      play: () => {
        audioPtRef.current.currentTime = 0;
        audioPtRef.current.play();
      },
    };
  });

  return <audio ref={audioPtRef} src={props.audio} />;
});
