import React, { useState, useEffect } from "react";
 
const estimates = () => {
    const [initialData, setInitialData] = useState("")

    useEffect(() => {
        const fetchInitialData = async () => {
            const result = await fetch('http://localhost:3000/api/estimates', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
            }).then(res => {
            return res.json()
            })
            setInitialData(result);
            console.log(initialData)
        }
        fetchInitialData()
    }, [])

    function DisplayEstimates(rawEstData) {
        if(rawEstData == undefined) {
            return null;
        }

        console.log("initial estimate data: ", rawEstData)

        let i = 0
        let estimateArray = []
        for(let eachEst in rawEstData) {
            estimateArray.push(
                <EachEstimate key={rawEstData[eachEst]._id} value={rawEstData[eachEst].estimate} />
            )
        }

        return(estimateArray)
    }

    function EachEstimate(a) {  
        console.log(a)

        let rawFilter = ["Pet Name", "Owner Name", "Urn"]
        let newFilter = rawFilter.map(eachLine => {
            return(
                <div className="each-line">{a.value[eachLine]}</div>
            )
        })
        console.log(newFilter)
        return (
            <div className="each-estimate">
                {newFilter}
            </div>
        )
    }

    return (
       <div className="body-content">
          <h1>Estimates</h1>
          <div className="display-estimates-container">
              <DisplayEstimates {...initialData} />
          </div>
       </div>
    );
}
 
export default estimates;