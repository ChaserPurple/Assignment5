import Layout from "@/components/layout";
import Link from "next/link";
import { FormEvent } from 'react'


export default function Register(){
    async function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        await fetch('http://localhost:8000/addCustomer', {
            method: 'POST',
            body: formData,
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
                <label htmlFor="fname">First name:</label>
                <input type="text" id="fname" name="fname"/><br/>
                {/*Last Name*/}
                <label htmlFor="lname">Last name:</label>
                <input type="text" id="lname" name="lname"/><br/>
                {/*Email*/}
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email"/><br/>
                {/*Address, line 1*/}
                <label htmlFor="address">Address:</label>
                <input type="text" id="address" name="address"/><br/>
                {/*City*/}
                <label htmlFor="city">City:</label>
                <input type="text" id="city" name="city"/><br/>
                {/*State*/}
                <label htmlFor="state">State:</label>
                <input type="text" id="state" name="state"/><br/>
                {/*ZIP code*/}
                <label htmlFor="zip">ZIP:</label>
                <input type="text" id="zip" name="zip"/><br/>
                {/*Submit*/}
                <button type="submit">Submit</button>
            </form>
        </Layout>
    );
}