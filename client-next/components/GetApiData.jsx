import React, {useEffect, useState} from 'react'
import shallow from 'zustand/shallow'
import {usePageDataStore} from '../lib/storepagedata'
import axios from 'axios'
var JSONPretty = require('react-json-pretty');

function GetApiData() {
    const pagedata = usePageDataStore(state => state.pagedata)
    const userid = usePageDataStore(state => state.userid)
    console.log("Newdata:" + pagedata)

    useEffect(() => {
        const fetchpagedata = async () => 
        {
            let res = await axios.post("/api/gettwindemodata");
            const { data } = await res;
            console.log("🚀 ~ file: GetApiData.jsx ~ line 18 ~ useEffect ~ data", data)
        
            if (data.status == 1)
            {
                usePageDataStore.setState({userid: data.nodebb_user.displayname})
                usePageDataStore.setState({pagedata: data.data})
                console.log("Känd...")
            }
        }

        const pagedata = fetchpagedata()
        console.log("🚀 ~ file: GetApiData.jsx ~ line 24 ~ useEffect ~ pagedata", pagedata)
      },[]);

    return (
    <div>
        <div>UserID:{userid}</div>
        <hr></hr>
        <JSONPretty id="json-pretty" data={pagedata}></JSONPretty>
    </div>
    )
}
  
export default GetApiData
