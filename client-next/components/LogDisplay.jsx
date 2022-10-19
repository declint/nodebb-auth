import { useStore } from '../lib/store'
import shallow from 'zustand/shallow'
import {usePageDataStore} from '../lib/storepagedata'


function LogDisplay() {
    //const {newpagedata, userid} = usePageDataStore(state => state.pagedata)
    const newpagedata = usePageDataStore(state => state.pagedata)
    const userid = usePageDataStore(state => state.userid)
    console.log("Newdata:" + newpagedata)

    return (
    <div>
        <h1>Data output</h1>
        <div>Newdata:{newpagedata}</div>
        <div>UserID:{userid}</div>

        <button onClick={()=>{usePageDataStore.setState({userid: 2512})}}>Change UserID</button>
    </div>
    )
}
  
export default LogDisplay
