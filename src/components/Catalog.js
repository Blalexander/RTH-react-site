import React, { useState, useEffect } from "react";
 
export default function Catalog() {
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
            console.log(initialData)
        }
        fetchInitialData()
    }, [])


    function AllItems() {
        let itemArray = []
        for(let i = 0; i < 40; i++) {
            itemArray.push(
                <EachItem key={"item" + i} value={i} />
            )
        }

        return (
            <div className="item-container">{itemArray}</div>
        )
    }

    function EachItem(a) {
        return (
            <div className={"each-item " + "item" + a.value}></div>
        )
    }

    return (
       <div className="body-content">
          <h1>Catalog</h1>
           <AllItems />
       </div>
    );
}