import styles from './Modal.module.scss'
import {useSelector} from 'react-redux'
import {RootState} from '../../../modules'
import {ModalType} from '../../../dummies/modalType'

const Modal = () => {
  const modal = useSelector((state: RootState) => {
    return state.modal
  })

  return (
    <div className={`${styles.container} ${modal.isOn ? `` : styles.off}`}>
      {modal.modals.map(
        (targetModal) =>
          ModalType.OBJECT_INFO && (
            <div
              className={styles.test}
              style={`position: relative; left: ${targetModal.target?.x}; right: ${targetModal.target?.y}`}
            >
              {' '}
              {targetModal.target?.id}{' '}
            </div>
          )
      )}
    </div>
  )
}

export default Modal
