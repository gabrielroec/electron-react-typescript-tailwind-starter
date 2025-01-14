import React, { useState } from "react";
import BoardArea from "../../components/BoardArea";
import ConfigBar from "../../components/ConfigBar";
import { BackgroundType } from "../../types/Background";

const MainPage: React.FC = () => {
  const [borderRadius, setBorderRadius] = useState(8);
  const [padding, setPadding] = useState(32);
  const [shadowX, setShadowX] = useState(0);
  const [shadowY, setShadowY] = useState(10);
  const [shadowBlur, setShadowBlur] = useState(20);
  const [shadowOpacity, setShadowOpacity] = useState(20);
  const [background, setBackground] = useState<BackgroundType>("none");

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-4 pt-[84px] gap-2">
      <BoardArea
        borderRadius={borderRadius}
        padding={padding}
        shadowX={shadowX}
        shadowY={shadowY}
        shadowBlur={shadowBlur}
        shadowOpacity={shadowOpacity}
        background={background}
      />
      <ConfigBar
        borderRadius={borderRadius}
        padding={padding}
        shadowX={shadowX}
        shadowY={shadowY}
        shadowBlur={shadowBlur}
        shadowOpacity={shadowOpacity}
        background={background}
        onBorderRadiusChange={setBorderRadius}
        onPaddingChange={setPadding}
        onShadowXChange={setShadowX}
        onShadowYChange={setShadowY}
        onShadowBlurChange={setShadowBlur}
        onShadowOpacityChange={setShadowOpacity}
        onBackgroundChange={setBackground}
      />
    </div>
  );
};

export default MainPage;
