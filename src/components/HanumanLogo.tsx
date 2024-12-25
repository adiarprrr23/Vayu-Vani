import React from 'react';

interface HanumanLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const HanumanLogo: React.FC<HanumanLogoProps> = ({ 
  width = 200, 
  height = 200, 
  className = '' 
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gada (Mace) */}
      <path
        d="M160 70
           L180 50
           M165 65
           L185 45"
        stroke="#FF4D00"
        strokeWidth="2"
        fill="none"
      />

      {/* Main Body */}
      <path
        d="M90 100
           C80 90 75 80 80 70
           C85 60 95 55 105 60
           C115 65 120 75 115 85"
        stroke="#FF4D00"
        strokeWidth="3"
        fill="none"
      />

      {/* Head with Crown */}
      <path
        d="M105 60
           C115 55 125 55 130 65
           C135 75 130 85 120 90
           C110 95 100 90 95 85"
        stroke="#FF4D00"
        strokeWidth="3"
        fill="none"
      />
      
      {/* Crown Details */}
      <path
        d="M110 55
           L120 45
           L130 55
           M115 50
           L120 40
           L125 50"
        stroke="#FF4D00"
        strokeWidth="2"
        fill="none"
      />

      {/* Face Details */}
      <path
        d="M115 70
           C117 68 120 68 122 70
           M110 75
           C115 78 120 78 125 75"
        stroke="#FF4D00"
        strokeWidth="2"
        fill="none"
      />

      {/* Flying Dhoti */}
      <path
        d="M85 100
           Q75 120 65 130
           Q55 140 45 145
           M90 105
           Q80 125 70 135"
        stroke="#FF4D00"
        strokeWidth="3"
        fill="none"
      />

      {/* Tail */}
      <path
        d="M80 90
           Q60 100 50 120
           Q45 130 50 140
           Q55 150 65 145
           Q75 140 70 130"
        stroke="#FF4D00"
        strokeWidth="3"
        fill="none"
      />

      {/* Flying Scarf */}
      <path
        d="M100 80
           Q130 60 160 70
           Q170 75 175 85
           M95 85
           Q125 65 155 75"
        stroke="#FF4D00"
        strokeWidth="2"
        fill="none"
        strokeDasharray="4,4"
      />

      {/* Arms */}
      <path
        d="M95 75
           Q85 85 75 90
           M110 70
           Q130 75 150 65"
        stroke="#FF4D00"
        strokeWidth="3"
        fill="none"
      />

      {/* Legs in Flying Pose */}
      <path
        d="M90 95
           Q85 115 80 125
           M100 90
           Q105 110 110 120"
        stroke="#FF4D00"
        strokeWidth="3"
        fill="none"
      />

      {/* Ornaments */}
      <path
        d="M75 90
           C73 92 73 94 75 96
           M150 65
           C152 63 154 63 156 65"
        stroke="#FF4D00"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};

export default HanumanLogo;