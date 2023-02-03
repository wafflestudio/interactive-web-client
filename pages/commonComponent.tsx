import { NextPage } from "next";
import LongText from "../components/common/LongText/LongText";
import SelectBox from "../components/common/SelectBox/SelectBox";

const CommonComponent: NextPage = () => {
  return (
    <div style={{ width: "500px", height: "auto", padding: "10px" }}>
      <LongText isEditable={true} />
      <SelectBox />
    </div>
  );
};

export default CommonComponent;
