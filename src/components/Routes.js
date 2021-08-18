import React, { useState, useEffect } from "react";
import { ContextExclusionPlugin } from "webpack";

 
export default function Routes() {
    const [initialData, setInitialData] = useState("")

    useEffect(() => {
        const fetchInitialData = async () => {
            const result = await fetch('http://localhost:3000/api/users', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
            }).then(res => {
            return res.json()
            })
            setInitialData(result);
            // console.log(initialData)
        }
        fetchInitialData()
    }, [])

    function Drivers(a) {
        if(a.userTypes == undefined) {
            return null
        }
        console.log(a)
        let driverList = a.userTypes[0].name
        let driverArray = []
        for(let i = 0; i < driverList.length; i++) {
            driverArray.push(
                <EachDriver key={"driver" + i} value={driverList[i]} />
            )
        }

        return (
            <div className="drivers-container">{driverArray}</div>
        )
    }

    function EachDriver(a) {
        // let calendarItem 
        // for(let driverName in initialData.scheduleInfo) {
        //     if(initialData.scheduleInfo[driverName] == a.value) {
        //         console.log("did it! ", a.value)
        //     }
        // }

        return (
            <div className={"each-driver " + "driver " + a.value} onClick={(v) => {showDriver(v)}}>
                <div className="driver-availability"></div>
                <div className="driver-name">{a.value}</div>
                <div className="driver-times">9am-5pm</div>
                <div className="driver-status">Available</div>
                <div className="driver-calendar"></div>
                <div className="driver-activity"></div>
            </div>
        )
    }

    function showDriver(b) {
        // console.log(b)
        let driverToShow = b.target.classList[2]
        // console.log(driverToShow)
        document.querySelector(`.${driverToShow}`).classList.toggle('show-details')
    }

    return (
       <div className="body-content">
          <h1>Routes</h1>
            <Drivers {...initialData} />
       </div>
    );
}