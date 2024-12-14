import Component from './component'
import {
  React,
  useState,
} from '@/component/management-panel/import-management.js'

function representatives() {
    const [type,setType]=useState(1)
    return (
      <>
      <Component type={type}/>
      </>
    )
}

export default representatives