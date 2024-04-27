import { useRouter } from 'next/router'
import Layout from "@/components/layout";
import Link from "next/link";
import React from "react";
import { useState } from 'react';

export default function RentForm(){
    const router = useRouter()
    const [unknownUser, setUser] = useState(false)

    async function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const request = {}
        formData.forEach((value, key) => {
            request[key] = value
        })
        console.log(request)
        const headers = new Headers()
        headers.append('Access-Control-Allow-Origin', 'http://localhost:3000')
        const response = await fetch('http://localhost:8000/getCustomer', {
            headers: headers,
            method: 'POST',
            body: JSON.stringify(request)
        })
        const id = await response.json()
        if(id['customer_id'] == -1)
            setUser(true)
        else
            await router.push("/RentSelect?id=" + id['customer_id'])
    }

    return(
        <Layout>
            <main className="flex min-h-screen flex-col items-center justify-center p-24">
                <div className = "row justify-between">
                    <h1>Become a Customer</h1>
                    <h3><Link style={{margin: 20 + 'px'}}  href="/">Back</Link></h3>
                </div>
                {unknownUser &&
                    <h3>That user does not exist.
                        <Link href="/Register">Become a User?</Link>
                    </h3>
                }
                <form onSubmit={onSubmit}>
                    {/*First Name*/}
                    <label style={{padding: 20 + 'px'}} htmlFor="fname">First Name:</label>
                    <input style={{margin: 20 + 'px'}} type="text" id="fname" name="fname"/><br/>
                    {/*Last Name*/}
                    <label style={{padding: 20 + 'px'}} htmlFor="lname">Last Name:</label>
                    <input style={{margin: 20 + 'px'}} type="text" id="lname" name="lname"/><br/>
                    {/*Phone Number*/}
                    <label style={{padding: 20 + 'px'}} htmlFor="phone">Phone Number:</label>
                    <input style={{margin: 20 + 'px'}} type="number" id="phone" name="phone"/><br/>
                    {/*Submit*/}
                    <button style={{padding: 20 + 'px', justifyContent: "center"}} type="submit">Submit</button>
                </form>
            </main>
        </Layout>
    );
}