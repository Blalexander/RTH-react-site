import React, { useState, useEffect } from "react";

 
export default function Schedules() {
    const [initialData, setInitialData] = useState("")
    // const [displaySchedChange, setDisplaySchedChange] = useState('hide')
    let displaySchedChange = "hide"
    // let employeeName = ''
    // let employeeDate = ''
    let d = new Date();
    let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let monthNames = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    let dayNum = d.getDay()
    let monthNum = d.getUTCMonth()
    let dayName = dayNames[d.getDay()]
    let monthName = monthNames[d.getUTCMonth()]
    let dayOfMonth = d.getDate()

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

    // console.log(dayName, dayNum, monthName, monthNum)

    function Calendar() {
        let n = 0
        let revisedDayNames = Array.from(dayNames)
        revisedDayNames.unshift("blank")
        // console.log(revisedDayNames)
        let week = revisedDayNames.map(day => {
            n++
            let c = dayNames.indexOf(day)
            let d = dayNames.indexOf(dayName)
            let e = c - d
            if(day == "blank") {
                return (
                    <EachDayD key={"blank" + n} value="blank" type="dates" />
                )
            }
            else {
                return (
                    <EachDayD key={monthNum + '/' + (dayOfMonth + e) + '/' + day} value={day} type="dates" />
                )
            }
        })
        
        return (
            <div className="calendar-container-top">
                <div className="month-name">{monthName}</div>
                <div className="week">{week}</div>
            </div>
        )
    }

    function EachDayD(b) {
        // console.log(b, type)
        let c = dayNames.indexOf(b.value)
        let d = dayNames.indexOf(dayName)
        let e = c - d
        return(
            <div className="day day_date">{b.value} {monthNum}/{dayOfMonth + e}</div>
        )
    }

    let empHoursObj = {}
    
    function Employee(a) {
        console.log(a.schedules)
        if(a.schedules.userTypes == undefined) {
            return null
        }
        let driverNames = a.schedules.userTypes[0].name
        let salesNames = a.schedules.userTypes[1].name
        let sched = a.schedules.scheduleInfo
        // let empHoursObj = {}

        sched.forEach(eachEmpHours => {
            // console.log(eachEmpHours)
            empHoursObj[eachEmpHours.name] = eachEmpHours.details
        })
        console.log(empHoursObj)



        let allWeeks = []
        salesNames.forEach((eachName) => {
            let revisedDayNames = Array.from(dayNames)
            revisedDayNames.unshift(eachName)
            // console.log(revisedDayNames, dayNames)

            let week = revisedDayNames.map(day => {
                if(day == eachName) {
                    return (
                        <EachDayE key={eachName + '/' + day} value="name" empName={eachName} empType={"sales"} />
                    )
                }
                else {
                    return (
                        <EachDayE key={eachName + '/' + day} value={day} empName={eachName} empType={"sales"} />
                    )
                }
            })
            allWeeks.push(week)
        })

        driverNames.forEach((eachName) => {
            let revisedDayNames = Array.from(dayNames)
            revisedDayNames.unshift(eachName)
            let week = revisedDayNames.map(day => {
                if(day == eachName) {
                    return (
                        <EachDayE key={eachName + '/' + day} value="name" empName={eachName} empType={"driver"} />
                    )
                }
                else {
                    return (
                        <EachDayE key={eachName + '/' + day} value={day} empName={eachName} empType={"driver"} />
                    )
                }
            })
            allWeeks.push(week)
        })

        // console.log(allWeeks)
        
        
        return (
            <div className="calendar-container-bottom">
                <div className="week">{allWeeks}</div>
            </div>
        )
    }

    function EachDayE(b) {
        // console.log(b, type)
        let c = dayNames.indexOf(b.value)
        let d = dayNames.indexOf(dayName)
        let e = c - d
        let dateToTest = monthNum + '/' + (dayOfMonth + e)
        let times 

        // if(empHoursObj[b.empName] && empHoursObj[b.empName][dateToTest]) {
        if(empHoursObj[b.empName]) {
            let nameHours = empHoursObj[b.empName]
            // console.log(nameHours, nameHours[dateToTest])

            times = nameHours[dateToTest]
        }
        else {
            times = null
        }


        if(b.value == "name") {
            return(
                <div className={"schedule-employee-name"}>{b.empName}</div>
            )
        }
        else {
            return(
                <div onClick={(v) =>{logData(v)}} className={b.empName + ' ' + monthNum + '/' + (dayOfMonth + e) + " day day_employee " + b.empType}>{times}</div>
            )
        }
    } 

    window.addEventListener('resize', moveUpdateTimes);

    function logData(e) {
        console.log(e.target.classList, e.target.offsetTop)
        displaySchedChange = "show"
        if(document.querySelector('.currently-selected') != null) {
            document.querySelector('.currently-selected').classList.remove('currently-selected')
            e.target.classList.add('currently-selected')
        }
        else {
            e.target.classList.add('currently-selected')
        }

        let updateTimes = document.querySelector('.update-times')
        updateTimes.style.top = e.target.offsetTop + "px"
        updateTimes.style.left = e.target.offsetLeft + "px"
        updateTimes.style.opacity = 1
        updateTimes.style.pointerEvents = "auto"
    }

    function moveUpdateTimes() {
        if(document.querySelector('.currently-selected')) {
            let updateTimes = document.querySelector('.update-times')
            let targetContainer = document.querySelector('.currently-selected')
            updateTimes.style.top = targetContainer.offsetTop + "px"
            updateTimes.style.left = targetContainer.offsetLeft + "px"
            updateTimes.style.opacity = 1
            updateTimes.style.pointerEvents = "auto"
        }
    }

    function ChangeSchedule(e) {
        // if(displaySchedChange == 'hide') {
        //     return null
        // }
        console.log(displaySchedChange)

        return (
            <form className="update-times" onSubmit={handleDayChange}>
                <label htmlFor="start">Start Time</label>
                <input type="text" name="start" id="eStart"></input>
                <p id="start-to-end">to</p>
                <label htmlFor="end">End Time</label>
                <input type="text" name="end" id="eEnd"></input>
                <button type="submit">Confirm</button>
            </form>
        )
    }

    function handleDayChange(e) {
        e.preventDefault()
        let shortcut = document.querySelector('.currently-selected')
        let employeeName = shortcut.classList[0]
        let employeeDate = shortcut.classList[1]
        let empTimeStart = document.getElementById('eStart').value
        let empTimeEnd = document.getElementById('eEnd').value
        let empTimes = empTimeStart + "-" + empTimeEnd
        let bodyFiller = {name: employeeName, date: employeeDate, times: empTimes}
        shortcut.innerHTML = empTimes
        console.log(bodyFiller)
        const updateSchedules = async () => {
            const result = await fetch('http://localhost:3000/api/schedules', {
            method: "PUT",
            body: JSON.stringify(bodyFiller),
            // body: bodyFiller,
            headers: {
                'Content-Type': 'application/json',
            }
            }).then(res => {
            return res.json()
            })
            // setInitialData(result);
        }
        updateSchedules()
    }

    return (
       <div className="body-content">
          <h1>Schedules</h1>
           <Calendar />
           <Employee schedules={initialData} />
           <ChangeSchedule />
       </div>
    );
}
 
// export default schedules;