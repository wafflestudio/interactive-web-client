import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import SampleSvg from '../../components/dev/SampleSvg'
import {sampleObjectDummy} from '../../dummies/sampleObjectDummy'
import {RootState} from '../../modules'
import {getObjects} from '../../modules/objects'

import styles from './DragAndDrop.module.scss'

export default function DragAndDrop() {
  const dispatch = useDispatch()
  const data = useSelector((state: RootState) => {
    return state.objects
  })

  useEffect(() => {
    dispatch(getObjects(sampleObjectDummy))
  }, [])

  return (
    <div className={styles.container}>
      {data.map((item, index) => {
        return <SampleSvg key={index} item={item} />
      })}
    </div>
  )
}
