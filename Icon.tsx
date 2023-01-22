import Svg, { Path, Defs, Polyline, Circle, Line } from 'react-native-svg';
import { TIcons } from './App.types';

export default function Icon({ status }: TIcons) {
  const stroke = '#B3B3B3';

  switch (status) {
    case 'done':
      return (
        <Svg viewBox="0 0 24 24" width="24" height="24">
          <Defs></Defs>
          <Path
            d="M23.25.749,8.158,22.308a2.2,2.2,0,0,1-3.569.059L.75,17.249"
            fill="none"
            stroke={stroke}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5px"
          ></Path>
        </Svg>
      );

    case 'repeat':
      return (
        <Svg viewBox="0 0 24 24" width="24" height="24">
          <Defs></Defs>
          <Path
            d="M13.5,22a9.75,9.75,0,1,0-9.75-9.75V13"
            fill="none"
            stroke={stroke}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5px"
          ></Path>
          <Polyline
            points="0.75 9.997 3.75 12.997 6.75 9.997"
            fill="none"
            stroke={stroke}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5px"
          ></Polyline>
          <Polyline
            points="12.75 6.247 12.75 12.997 18 12.997"
            fill="none"
            stroke={stroke}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5px"
          ></Polyline>
        </Svg>
      );

    default:
      return (
        <Svg viewBox="0 0 24 24" width="24" height="24">
          <Defs></Defs>
          <Circle
            cx="12"
            cy="12"
            r="10.5"
            fill="none"
            stroke={stroke}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5px"
          ></Circle>
          <Line
            x1="12"
            y1="12"
            x2="12"
            y2="8.25"
            fill="none"
            stroke={stroke}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5px"
          ></Line>
          <Line
            x1="12"
            y1="12"
            x2="16.687"
            y2="16.688"
            fill="none"
            stroke={stroke}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5px"
          ></Line>
        </Svg>
      );
  }
}
