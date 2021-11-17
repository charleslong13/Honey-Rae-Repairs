import React, { useEffect, useState } from "react"

export const CustomerList = () => {
    //declaring state variables, sets up a place to store state 
    //CustomerList would  be called a component because its end results is html
    const [customers, setCustomers] = useState([])
    const [totalCustomerMessage, updateMessage] = useState("")

    useEffect(
        () => {
            fetch("http://localhost:8088/customers")
                .then(res => res.json())
                .then((data) => {
                    setCustomers(data)
                })
        },
        [] //called the dependency array, if you put a variable in there is will "listen" for change with that variable 
    )           // if you leave it empty it runs the first time it loads and then not again 
                //the value returned at index one is a function 
//useEffects react to changes in state 
    useEffect(
        () => {
                if (customers.length === 1) {
                    updateMessage("You have 1 customer")
                }
                else {
                    updateMessage(`You have ${customers.length} customers`)
                }
        },
        [customers]
    )

    return (
        <>
            <div>{totalCustomerMessage}</div>
            {
                customers.slice(0, 5).map(
                    (customerObject) => {
                        return <p key={`customer--${customerObject.id}`}>{customerObject.name}</p>
                    }    //you can give this return a value an id or className (className is how you set a class in react)
                )
            }
        </>
    )
}
