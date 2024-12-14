import Component from './component'
import {
  React,
  useState,
} from '@/component/management-panel/import-management.js'

function Colleagues() {
  const [type,setType]=useState(0)
  return (
    <>
    <Component type={type}/>
    </>
  )
}

export default Colleagues