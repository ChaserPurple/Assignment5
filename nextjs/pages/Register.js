import Layout from "@/components/layout";
import Link from "next/link";
import { FormEvent } from 'react'


export default function Register(){
    async function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const request = {}
        // const request = {
        //     fname: formData.get("fname"),
        //     lname: formData.get("lname"),
        //     email: formData.get("email"),
        //     address: formData.get("address"),
        //     city: formData.get("city"),
        //     state: formData.get("state"),
        //     zip: formData.get("zip")
        // }
        formData.forEach((value, key) => {
            // console.log("key = " + key)
            // console.log("value = " + value)
            request[key] = value
        })
        console.log("==========================")
        console.log(request)
        const response = await fetch('http://localhost:8000/addCustomer', {
            method: 'POST',
            body: request,
        })
        const thingy = await response.data
    }

    return(
        <Layout>
            <div className = "row">
                <h1>Become a Customer</h1>
                <h3><Link href="/">Back</Link></h3>
            </div>
            <form onSubmit={onSubmit}>
                {/*First Name*/}
                <label style={{padding: 20 + 'px'}} htmlFor="fname">First name:</label>
                <input style={{margin: 20 + 'px'}} type="text" id="fname" name="fname"/><br/>
                {/*Last Name*/}
                <label style={{padding: 20 + 'px'}} htmlFor="lname">Last name:</label>
                <input style={{margin: 20 + 'px'}} type="text" id="lname" name="lname"/><br/>
                {/*Email*/}
                <label style={{padding: 20 + 'px'}} htmlFor="email">Email:</label>
                <input style={{margin: 20 + 'px'}} type="text" id="email" name="email"/><br/>
                {/*Address, line 1*/}
                <label style={{padding: 20 + 'px'}} htmlFor="address">Address:</label>
                <input style={{margin: 20 + 'px'}} type="text" id="address" name="address"/><br/>
                {/*City*/}
                <label style={{padding: 20 + 'px'}} htmlFor="city">City:</label>
                <input style={{margin: 20 + 'px'}} type="text" id="city" name="city"/><br/>
                {/*State*/}
                <label style={{padding: 20 + 'px'}} htmlFor="state">State:</label>
                <input style={{margin: 20 + 'px'}} type="text" id="state" name="state"/><br/>
                {/*ZIP code*/}
                <label style={{padding: 20 + 'px'}} htmlFor="zip_code">ZIP:</label>
                <input style={{margin: 20 + 'px'}} type="number" min="0" id="zip_code" name="zip_code"/><br/>
                {/*Submit*/}
                <button style={{padding: 20 + 'px'}} type="submit">Submit</button>
            </form>
        </Layout>
    );
}