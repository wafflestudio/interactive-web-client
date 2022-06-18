import { ModalDataType } from "../../../../dummies/modalType";
import { useDispatch } from "react-redux";
import { openDetailInfoModal } from "../../../../modules/modal";

interface SimpleInfoModalProps {
  targetModal: ModalDataType;
}

const SimpleInfoModal = ({ targetModal }: SimpleInfoModalProps) => {
  const dispatch = useDispatch();

  if (targetModal.target)
    return (
      <div
        style={{
          position: "absolute",
          left: targetModal.target.geometry.x - 120,
          top: targetModal.target.geometry.y,
          width: "100px",
          height: "100px",
          background: "gray",
        }}
      >
        <div>{targetModal.target.id}</div>
        <button
          onClick={() => {
            if (targetModal.target)
              dispatch(openDetailInfoModal(targetModal.target));
          }}
        >
          상세 정보 보기
        </button>
      </div>
    );
  else return <></>;
};

export default SimpleInfoModal;
