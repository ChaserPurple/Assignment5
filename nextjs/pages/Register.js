import Layout from "@/components/layout";
import Link from "next/link";
import { FormEvent } from 'react'


export default function Register(){
    async function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        console.log("==========================")
        console.log(event.currentTarget)
        await fetch('http://localhost:8000/addCustomer', {
            method: 'POST',
            body: event.currentTarget,
        })
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
                <label style={{padding: 20 + 'px'}} htmlFor="zip">ZIP:</label>
                <input style={{margin: 20 + 'px'}} type="text" id="zip" name="zip"/><br/>
                {/*Submit*/}
                <button style={{padding: 20 + 'px'}} type="submit">Submit</button>
            </form>
        </Layout>
    );
}