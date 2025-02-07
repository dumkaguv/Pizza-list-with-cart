import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f0f0f0"
    foregroundColor="#ffffff"
    {...props}
  >
    <circle cx="115" cy="115" r="115" />
    <rect x="24" y="275" rx="10" ry="10" width="186" height="60" />
    <rect x="24" y="240" rx="8" ry="8" width="186" height="18" />
    <rect x="123" y="349" rx="6" ry="6" width="84" height="25" />
    <rect x="24" y="349" rx="6" ry="6" width="55" height="25" />
  </ContentLoader>
);

export default Skeleton;
