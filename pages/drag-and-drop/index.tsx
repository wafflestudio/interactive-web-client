import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import DynamicCanvas from '../../components/dev/DynamicCanvas/DynamicCanvas'
import Indicator from '../../components/dev/Indicator/Indicator'
import SampleSvg from '../../components/dev/SampleSvg/SampleSvg'
import {sampleObjectDummy} from '../../dummies/sampleObjectDummy'
import {RootState} from '../../modules'
import {getObjects, updateObject} from '../../modules/objects'

import styles from './DragAndDrop.module.scss'

export default function DragAndDrop() {
  const dispatch = useDispatch()
  const objects = useSelector((state: RootState) => {
    return state.objects
  })

  useEffect(() => {
    dispatch(getObjects(sampleObjectDummy))
  }, [])

  return (
    <>
      <div className={styles.container}>
        {objects.map((item, index) => {
          return <SampleSvg key={index} item={item} />
        })}
      </div>
      <DynamicCanvas />
      <Indicator />
    </>
  )
}
