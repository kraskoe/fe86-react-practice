import { createGlobalStyle } from 'styled-components';
import px2vw from '../utils/sizeAdjustment';

export const Global = createGlobalStyle`
  :root {
      font-size: ${px2vw(16)};

      @media (min-width: 768px) {
        font-size: ${px2vw(16)};
      }

      @media (min-width: 1024px) {
        font-size: ${px2vw(16)};
      }
    }
`;

export default Global;