import React, { useState, useEffect } from "react";

const CreateEstimate = () => {
  const [formOptions, setFormOptions] = useState({
    'Pet Name': {'value': '', 'type': 'short-text', 'desc': 'Pet Name'},
    'Date of Passing': {'value': '', 'type': 'short-text', 'desc': 'Date of Passing'},
    'Type of Pet': {'value': '', 'type': 'short-text', 'desc': 'Type of Pet'},
    'Sex': {'value': '', 'type': 'short-text', 'desc': 'Sex'}, 
    'Color': {'value': '', 'type': 'short-text', 'desc': 'Color'},
    'Breed': {'value': '', 'type': 'short-text', 'desc': 'Breed'},
    'Age (years)': {'value': '', 'type': 'short-text', 'desc': 'Age (years)'},
    'Weight (pounds)': {'value': '', 'type': 'short-text', 'desc': 'Weight (pounds)'},
    'Owner Name': {'value': '', 'type': 'short-text', 'desc': 'Owner Name'},
    'Phone': {'value': '', 'type': 'short-text', 'desc': 'Phone'},
    'Email': {'value': '', 'type': 'short-text', 'desc': 'Email'},
    'Address': {'value': '', 'type': 'short-text', 'desc': 'Address'},
    'City': {'value': '', 'type': 'short-text', 'desc': 'City'},
    'Zip Code': {'value': '', 'type': 'short-text', 'desc': 'Zip Code'},
    'State': {'value': '', 'type': 'short-text', 'desc': 'State'},
    'Pick Up same Name/Address as Pet Owner?': {'value': '', 'type': 'yes-no', 'desc': 'Pick Up same Name/Address as Pet Owner?'},
    'Return Cremains to Pet Owner (Client) Name/Address': {'value': '', 'type': 'yes-no', 'desc': 'Return Cremains to Pet Owner (Client) Name/Address'},
    'Assigned to:': {'value': '', 'type': 'short-text', 'desc': 'Assigned to:'},
    'Pet Pickup Date': {'value': '', 'type': 'date', 'desc': 'Pet Pickup Date'},
    'Pickup Time': {'value': '', 'type': 'dropdown-time', 'desc': 'Pickup Time'},
    'Engraving Order Date': {'value': '', 'type': 'date', 'desc': 'Engraving Order Date'},
    'Engraving Name Plate Info': {'value': '', 'type': 'long-text', 'desc': 'Engraving Name Plate Info'},
    'Special Instructions': {'value': '', 'type': 'long-text', 'desc': 'Special Instructions'},
    'Cremation Service': {'value': '', 'type': 'dropdown-cremation', 'desc': 'Cremation Service'},
    'Paw Print Options': {'value': '', 'type': 'dropdown-paw-print', 'desc': 'Paw Print Options'},
    'Urn': {'value': '', 'type': 'dropdown-urn', 'desc': 'Urn'},
    'Jewelry/Keychain': {'value': '', 'type': 'dropdown-jewelry', 'desc': 'Jewelry/Keychain'},
    'Nose Print': {'value': '', 'type': 'dropdown-nose-print', 'desc': 'Nose Print'},
    'Photo': {'value': '', 'type': 'dropdown-photo', 'desc': 'Photo'},
    'Cut Hair': {'value': '', 'type': 'yes-no', 'desc': 'Cut Hair'},
    'Special Order Statues': {'value': '', 'type': 'dropdown-statues', 'desc': 'Special Order Statues'},
    'Special Order Link': {'value': '', 'type': 'short-text', 'desc': 'Special Order Link'},
    'Delivery Option': {'value': '', 'type': 'dropdown-delivery', 'desc': 'Delivery Option'},
    'Delivery Fee': {'value': '', 'type': 'short-text', 'desc': 'Delivery Fee'},
    'Coordination Fee': {'value': '', 'type': 'short-text', 'desc': 'Coordination Fee'},
    'Discount': {'value': '', 'type': 'short-text', 'desc': 'Discount'},
  })
  //dynamic field set for each additional item where you only have to select the product and the amount is immediately incremented
  const [inputValues, setInputValues] = useState({
    'Pet Name': '',
    'Date of Passing': '',
    'Type of Pet': ''
  })

  function CreateEstimateForm(a) {
    // console.log(a)
    // let listOfEstimates = []
    // let keyFixer = 0
    let estimateKeys = Object.keys(a)
    let listOfEstimates = estimateKeys.map(eachFormLine => {
      // keyFixer++
      return(<EstimateConstructor key={formOptions[eachFormLine].desc} value={formOptions[eachFormLine].value} desc={formOptions[eachFormLine].desc} />)
    })

    return (
      <div id="estimate-container">
        {listOfEstimates}
      </div>
    )
  }

  function EstimateConstructor(estimateItem) {
      // console.log(estimateItem)
      return (
          <label className="estimateFormLabel">{estimateItem.desc}
            <input className="estimateFormInput" type="text" name={estimateItem.desc}></input>
          </label>
      )
  }

  function handleSubmit(e) {
    e.preventDefault()
    let o = Object.keys(formOptions).length
    let i = 0
    let formEntries = {}
    for (let entries in e.target) {
      if(i < o) {
        let {name, value} = e.target[entries]
        let thisn = {name, value}
        formEntries[name] = value
        i++
      }
    }

    // console.log(formEntries) 


    // let bodyFiller = {name: 'blake', borough: 'yesmaam', cuisine: 'yeehaw'}
    const fetchInitialData = async () => {
      const result = await fetch('http://localhost:3000/api/estimates', {
        method: "POST",
        body: JSON.stringify(formEntries),
        // body: bodyFiller,
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res => {
        return res.json()
      })
    }
    fetchInitialData()
    // const fetchInitialData = async () => {
    //   const result = await fetch('http://localhost:3000/api/estimates', {
    //     method: "GET",
    //     // body: JSON.stringify(formEntries),
    //     // body: bodyFiller,
    //     headers: {
    //       'Content-Type': 'application/json',
    //     }
    //   }).then(res => {
    //     console.log(res.json())
    //     return res.json()
    //   })
    // }
    // fetchInitialData()

  }

  // function createInputJSON(data) {
  //   setInputValues()
  // }

  // useEffect(() => {
  //   setInputValues(formEntries)
  //   console.log("me", setInputValues)
  // }, [])

  return (
    <div className="body-content">
      <h1>Create Estimate</h1>
        <form onSubmit={handleSubmit}>
          <CreateEstimateForm {...formOptions} />
          <button type="submit">Submit</button>
        </form>
    </div>
  );
};

export default CreateEstimate;