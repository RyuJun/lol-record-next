import { keyframes } from '@emotion/react';

const slideUp = keyframes`
  from {
    bottom: -281px;
  }

  to {
    bottom: 0;
  }
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const zoomIn = keyframes`
  from {
     opacity: 0;
     transform: scale3d(0.3, 0.3, 0.3);
     background: transparent;
     box-shadow: none;
   }
   40% {
     transform: scale3d(1, 1, 1);
     background: transparent;
     box-shadow: none;
     opacity: 1;
   }
   100% {
     box-shadow: none;
     background: transparent;
   }
`;

const expand = keyframes`
   from {
     width: 0;
     height: 0;
     overflow: hidden;
     margin: 0;
     background: transparent;
     box-shadow: none;
   }
   60% {
     width: 0;
     background: transparent;
     box-shadow: none;
   }
   to {
     width: 114px;
     background: transparent;
     box-shadow: none;
     height: 0;
     overflow: hidden;
     margin: 0;
   }
`;

const lateFadeIn = keyframes`
   from {
     opacity: 0;
   }
   90% {
     opacity: 0;
   }
   100% {
     opacity: 1;
   }
`;

const bgMove = keyframes`
   from {
     background-position: -200px 0;
   }
   to {
     background-position: calc(200px + 100%) 0;
   }
`;

export const Animations = {
  slideUp,
  fadeIn,
  zoomIn,
  expand,
  lateFadeIn,
  bgMove,
};
