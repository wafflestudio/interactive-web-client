import { GeometryType } from "../dummies/dummyInterface";

interface ConfigType {
  renderType: "drag" | "fadein" | "fadeout";
  geometry: GeometryType;
}

const renderGraphics = (config: ConfigType, endCallBack: Function) => {};

const useAnimation = () => {
  const trigger = (config: ConfigType, endCallBack: Function) => {
    renderGraphics(config, endCallBack);
  };
  return { trigger };
};

export default useAnimation;
