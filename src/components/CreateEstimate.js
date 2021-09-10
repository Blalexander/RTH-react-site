import React, { useState, useEffect, createContext } from "react";
const OAuthClient = require('intuit-oauth');

const CreateEstimate = () => {
  const [formOptions, setFormOptions] = useState({
    'Pet Information': {
      'Pet Name': {'value': '', 'type': 'short-text', 'desc': 'Pet Name'},
      'Date of Passing': {'value': '', 'type': 'short-text', 'desc': 'Date of Passing'},
      'Type of Pet': {'value': '', 'type': 'short-text', 'desc': 'Type of Pet'},
      'Sex': {'value': '', 'type': 'short-text', 'desc': 'Sex'}, 
      'Color': {'value': '', 'type': 'short-text', 'desc': 'Color'},
      'Breed': {'value': '', 'type': 'short-text', 'desc': 'Breed'},
      'Age (years)': {'value': '', 'type': 'short-text', 'desc': 'Age (years)'},
      'Weight (pounds)': {'value': '', 'type': 'short-text', 'desc': 'Weight (pounds)'},
    },
    'Owner Information': {
      'Owner Name': {'value': '', 'type': 'short-text', 'desc': 'Owner Name'},
      'Phone': {'value': '', 'type': 'short-text', 'desc': 'Phone'},
      'Email': {'value': '', 'type': 'short-text', 'desc': 'Email'},
      'Address': {'value': '', 'type': 'short-text', 'desc': 'Address'},
      'City': {'value': '', 'type': 'short-text', 'desc': 'City'},
      'State': {'value': '', 'type': 'short-text', 'desc': 'State'},
      'Zip Code': {'value': '', 'type': 'short-text', 'desc': 'Zip Code'},
      'Pick Up same Name/Address as Pet Owner?': {'value': '', 'type': 'yes-no', 'desc': 'Pick Up same Name/Address as Pet Owner?'},
      'Return Cremains to Pet Owner (Client) Name/Address': {'value': '', 'type': 'yes-no', 'desc': 'Return Cremains to Pet Owner (Client) Name/Address'},
    },
    'Order Information': {
      'Assigned to:': {'value': '', 'type': 'short-text', 'desc': 'Assigned to:'},
      'Pet Pickup Date': {'value': '', 'type': 'date', 'desc': 'Pet Pickup Date'},
      'Pickup Time': {'value': '', 'type': 'short-text', 'desc': 'Pickup Time'},
      'Engraving Order Date': {'value': '', 'type': 'date', 'desc': 'Engraving Order Date'},
      'Engraving Name Plate Info': {'value': '', 'type': 'long-text', 'desc': 'Engraving Name Plate Info'},
      'Special Instructions': {'value': '', 'type': 'long-text', 'desc': 'Special Instructions'},
      'Cremation Service': {'value': '', 'type': 'dropdown', 'desc': 'Cremation Service'},
      'Paw Print Options': {'value': '', 'type': 'dropdown', 'desc': 'Paw Print Options'},
      'Urn': {'value': '', 'type': 'dropdown', 'desc': 'Urn'},
      'Jewelry/Keychain': {'value': '', 'type': 'dropdown', 'desc': 'Jewelry/Keychain'},
      'Nose Print': {'value': '', 'type': 'dropdown', 'desc': 'Nose Print'},
      'Photo': {'value': '', 'type': 'yes-no', 'desc': 'Photo'},
      'Cut Hair': {'value': '', 'type': 'yes-no', 'desc': 'Cut Hair'},
      'Special Order Statues': {'value': '', 'type': 'dropdown', 'desc': 'Special Order Statues'},
      'Special Order Link': {'value': '', 'type': 'short-text', 'desc': 'Special Order Link'},
      'Delivery Option': {'value': '', 'type': 'dropdown', 'desc': 'Delivery Option'},
      'Delivery Fee': {'value': '', 'type': 'short-text', 'desc': 'Delivery Fee'},
      'Coordination Fee': {'value': '', 'type': 'short-text', 'desc': 'Coordination Fee'},
      'Discount': {'value': '', 'type': 'short-text', 'desc': 'Discount'},
    }
  })

  let itemOptions = {
    urns: {
      "none": "$0",
      "Custom see notes": "$0",
      "CSWU - 300  Med Cedar": "$0",
      "CSWU - 400  Large Cedar": "$0",
      "CSWU - 500  XL Cedar": "$0",
      "WSWU - 200 Small Walnut": "$0",
      "WSWU - 300 Med Walnut": "$0",
      "WSWU - 400 Large Walnut": "$0",
      "WSWU - 500 XL Walnut": "$0",
      "CLWU - 300 Med Cedar Lock & Key": "$0",
      "CLWU - 400 Large Cedar Lock & Key": "$0",
      "CLWU - 500 XL Cedar Lock & Key": "$0",
    },
    pawprints: {
      "none": "$0",
      "C051 Wallet Paw": "$0",
      "C052 Garden Paw": "$0",
      "57SBPP (5x7 shadow box)": "$0",
      "810SBPP (8x10 shadow box)": "$0",
      "1114SBPP (11x14 Shadow box)": "$0",
      "None": "$0",
      "Clay Pocket paw": "$0",
      "8x10 Collage Shadow box": "$0",
      "Paw print in Ink/Paper": "$0",
    },
    noseprint: {
      "none": "$0",
      "Nose print on Paper": "$0",
      "Nose print on Clay": "$0"
    },
    statues: {
      "none": "none"
    },
    jewelry: {
      "none": "$0",
      "Cylinder $95": "$0",
      "Crystal Heart $150": "$0",
      "Infinity Paw $60": "$0",
      "Color Paw $60": "$0",
      "Photo Pendant $125": "$0",
      "Heart Pendant $125": "$0",
      "Paw Pendant $125": "$0",
      "Cross Pendant $95": "$0",
      "Circle with Paws Pendant $95": "$0",
      "Keychain": "$0",
      "Other": "$0",
      "Heart with Paws Pendant $95": "$0",
    },
    cremation: {
      "Private Cremation": "$0",
      "No Cremains Back": "$0",
      "Private Viewing": "$0",
      "Rush Cremation": "$0",
      "Remotely Viewing": "$0",
      "Recording Cremation": "$0",
    },
    delivery: {
      "Priority Mail NSR": "$0",
      "USPS Signature": "$0",
      "Pick up": "$0",
      "Hand Delivery": "$0",
      "Do not Return": "$0",
    }
  }
  //dynamic field set for each additional item where you only have to select the product and the amount is immediately incremented

  //pickup time and date calculated automatically?


  function CreateEstimateForm(a) {
    let petKeys = Object.keys(a['Pet Information'])
    petKeys.unshift('filler')
    let ownerKeys = Object.keys(a['Owner Information'])
    ownerKeys.unshift('filler')
    let orderKeys = Object.keys(a['Order Information'])
    orderKeys.unshift('filler')
    let estimateKeys = petKeys.concat(ownerKeys, orderKeys)
    console.log(estimateKeys)

    let listOfEstimates = estimateKeys.map((eachFormLine, lineNum) => {
      let whichSlot
      if(lineNum < petKeys.length) {
        whichSlot = 'Pet Information'
      }
      else if(lineNum >= petKeys.length && lineNum < (ownerKeys.length + petKeys.length)) {
        whichSlot = 'Owner Information'
      }
      else if(lineNum >= (petKeys.length + ownerKeys.length) && lineNum < (orderKeys.length + ownerKeys.length + petKeys.length)) {
        whichSlot = 'Order Information'
      }

      if(eachFormLine == 'filler') {
        return (
          <h3 key={whichSlot} className="estimate-section-divider">{whichSlot}</h3>
        )
      }

      return(<EstimateConstructor key={formOptions[whichSlot][eachFormLine].desc} value={formOptions[whichSlot][eachFormLine].value} desc={formOptions[whichSlot][eachFormLine].desc} type={formOptions[whichSlot][eachFormLine].type} keyType={whichSlot} />)
    })

    let petEnd = petKeys.length
    let ownerStart = petKeys.length 
    let ownerEnd = petKeys.length + ownerKeys.length 
    let orderStart = petKeys.length + ownerKeys.length 
    let orderEnd = listOfEstimates.length
    let petFormLines = listOfEstimates.slice(0, petEnd)
    let ownerFormLines = listOfEstimates.slice(ownerStart, ownerEnd)
    let orderFormLines = listOfEstimates.slice(orderStart, orderEnd)

    console.log(petFormLines, ownerFormLines, orderFormLines)


    return (
      <div id="estimate-container">
        <div className="pet-estimate-section estimate-section">
          {petFormLines}
        </div>
        <div className="owner-estimate-section estimate-section">
          {ownerFormLines}
        </div>
        <div className="order-estimate-section estimate-section">
          {orderFormLines}
        </div>
      </div>
    )

    // return (
    //   <div id="estimate-container">
    //     {listOfEstimates}
    //   </div>
    // )
  }

  function EstimateConstructor(estimateItem) {
      // console.log(estimateItem)
      // console.log(Object.keys(dropdownListOps))
      let whichDropDown = {}
      switch(estimateItem.desc) {
        case "Cremation Service": 
          whichDropDown = itemOptions["cremation"]
          break;
        case "Paw Print Options": 
          whichDropDown = itemOptions["pawprints"]
          break;
        case "Urn": 
          whichDropDown = itemOptions["urns"]
          break;
        case "Jewelry/Keychain": 
          whichDropDown = itemOptions["jewelry"]
          break;
        case "Nose Print": 
          whichDropDown = itemOptions["noseprint"]
          break;
        case "Special Order Statues": 
          whichDropDown = itemOptions["statues"]
          break;
        case "Delivery Option": 
          whichDropDown = itemOptions["delivery"]
          break;
      }
      let dropdownOps = Object.keys(whichDropDown).map(eachKey => {
        return (
          <option key={eachKey} value={eachKey} onClick={(e) => updateCart(e)}>{eachKey}</option>
        )
      })

      let classType = estimateItem.keyType.toLowerCase()
      classType = classType.replace(/\s/g , "-")
      switch(estimateItem.type) {
        case "short-text": 
          return (
            <label className={"estimateFormLabel " + classType}>{estimateItem.desc}
              <input className={"estimateFormInput short-text " + classType} type="text" name={estimateItem.desc}></input>
            </label>
          )
        case "long-text": 
          return (
            <label className={"estimateFormLabel long-text " + classType}>{estimateItem.desc}
              <textarea className="estimateFormInput long-text" type="text" name={estimateItem.desc}></textarea>
            </label>
          )
        case "yes-no": 
          return (
            <label className={"estimateFormLabel yes-no " + classType}>{estimateItem.desc}
              <label>Yes
                <input className="estimateFormInput" type="radio" name={estimateItem.desc} value="yes"></input>
              </label>
              <label>No
                <input className="estimateFormInput" type="radio" name={estimateItem.desc} value="no"></input>
              </label>
            </label>
          )
        case "dropdown": 
          return (
            <label className={"estimateFormLabel " + classType}>{estimateItem.desc}
              <select className="estimateFormInput">
                {dropdownOps}
                {/* <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option> */}
              </select>
            </label>
          )
        default: 
          return (
            <label className={"estimateFormLabel " + classType}>{estimateItem.desc}
              <input className="estimateFormInput short-text" type="text" name={estimateItem.desc}></input>
            </label>
          )
      }
      // return (
      //     <label className="estimateFormLabel">{estimateItem.desc}
      //       <input className="estimateFormInput" type="text" name={estimateItem.desc}></input>
      //     </label>
      // )
  }

  let cartItems = {};

  function handleSubmit(e) {
    //if form isn't valid => raiseError()

    //else =>
    e.preventDefault()
    let o = Object.keys(formOptions).length
    let i = 0
    let formEntries = {}
    for (let entries in e.target) { 
      if(i < o) {
        let {name, value} = e.target[entries]
        // console.log(name)
        if(!name) {
          // console.log("empty string here")
          if(cartItems[e.target[entries].previousSibling.data]) {
            formEntries[e.target[entries].previousSibling.data] = cartItems[e.target[entries].previousSibling.data]
          }
        }
        formEntries[name] = value
        i++
      }
    }
    formEntries["Created By"] = localStorage.username




    const checkDS = async () => {
      const result = await fetch('http://localhost:5000/eg050', {
        method: "GET",
        // body: JSON.stringify(formEntries),
        // body: bodyFiller,
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res => {
        // return res.json()
        console.log(res)
        // location.href = res.url
        window.open(res.url, 'popup','width=600,height=600')
      })
    }
    checkDS()


    // const checkQuickbooks = async () => {
    //   const result = await fetch('https://6d03-47-154-221-234.ngrok.io/authUri1', {
    //     method: "GET",
    //     // body: JSON.stringify(formEntries),
    //     // body: bodyFiller,
    //     headers: {
    //       'Content-Type': 'application/json',
    //     }
    //   }).then(res => {
    //     // return res.json()
    //     console.log(res)
    //   })
    // }
    // checkQuickbooks()



    // console.log(formEntries) 
    const postEstimateToServer = async () => {
      const result = await fetch('http://localhost:3000/api/estimates', {
        method: "POST",
        body: JSON.stringify(formEntries),
        // body: bodyFiller,
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res => {
        // return res.json()
        console.log(res)
      })
    }
    // postEstimateToServer()

    function sendEmail() {
      Email.send({
      Host: "smtp.elasticemail.com",
      Username : "blake.alexander.13@gmail.com",
      Password : "61C93F8CBF8B0E4B1236B96449605E338F66",
      To : 'blakealexanderdev@gmail.com',
      From : "blake.alexander.13@gmail.com",
      Subject : "testing email sending for app",
      Body : formEntries,
      }).then(
        // message => alert("mail sent successfully")
        message => console.log(message.status)
      );
    }
    // sendEmail()

    // downloadCSV(formEntries)

  }

  function downloadCSV (a) {
    let arr = a
  
    var keys = [];
    var values = [];
    function getKeys(data, k = '') {
      for (var i in data) {
        var rest = k.length ? '_' + i : i
        if (typeof data[i] == 'object') {
          if (!Array.isArray(data[i])) {
            getKeys(data[i], k + rest)
          }
        } else keys.push( k+ rest)
      }
    }   
    function getValues(data, k = '') {
      for (var i in data) {
        var rest = k.length ? '' + i : i
        if (typeof data[i] == 'object') {
          if (!Array.isArray(data[i])) {
            getValues(data[i], k + rest)
          }
        }
        else values.push(data[rest])
      }
    }

    getKeys(arr[0])
    var value="";
    arr.forEach(x=>{
       values=[];
       getValues(x);
       value+=values.join(";")+"\r\n";
    })
    
    let result = keys.join(";")+"\r\n"+value;
    let fileToSave = new Blob([result], {
       type: "csv",
       name: 'data.csv'
     });
        
    saveAs(fileToSave, 'data.csv');
  }

  function updateCart(c) {
    console.log(c.target, c.target.parentElement.parentElement.childNodes[0].data)
    let itemType = c.target.parentElement.parentElement.childNodes[0].data
    let cart = document.querySelector('.cart-items')
    let newItem = document.createElement('DIV')
    let deleteItem = document.createElement('DIV')
    let deleteItemHelper = document.createElement('P')
    deleteItemHelper.classList.add('hide-me')
    deleteItemHelper.innerHTML = itemType
    deleteItem.classList.add('delete-item')
    deleteItem.addEventListener('click', deleteCartItem)
    newItem.classList.add('item-in-cart')
    newItem.innerHTML = c.target.innerHTML
    cart.appendChild(newItem)
    newItem.appendChild(deleteItem)
    deleteItem.appendChild(deleteItemHelper)
    if(cartItems[itemType]) {
      cartItems[itemType].push(c.target.value)
    }
    else {
      cartItems[itemType] = [c.target.value]
    }
    console.log(cartItems)
  }

  function deleteCartItem(d) {
    console.log(d.target)
    d.target.parentElement.remove()
    let typeToDelete = d.target.children[0].innerHTML
    let deleteCheckValue = d.target.parentElement.firstChild.data
    console.log(typeToDelete, cartItems[typeToDelete], deleteCheckValue)
    let deleteIndex = cartItems[typeToDelete].indexOf(deleteCheckValue)
    cartItems[typeToDelete].splice(deleteIndex, 1)
    console.log(cartItems)
  }

  return (
    <div className="body-content">
      <h1>Create Estimate</h1>
        <form onSubmit={handleSubmit}>
          <CreateEstimateForm {...formOptions} />
          <button className="submit-form-but" type="submit">Submit</button>
          <div className="cart-items"></div>
        </form>
    </div>
  );
};

export default CreateEstimate;