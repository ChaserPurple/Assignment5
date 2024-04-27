'use client';
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
        headers.append('Access-Control-Allow-Origin', '*')
        const response = await fetch('http://localhost:8000/getCustomer', {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({"Customer": formData}),
            mode: "no-cors"
        })
        const id = await response.json()
        console.log(id)
        if(id == -1)
            setUser(true)
        else
            await router.push("/RentSelect?id=" + id)
    }

    return(
        <Layout>
            <div className = "row">
                <h1 style={{padding: 20 + 'px'}}>Become a Customer</h1>
                <h3><Link style={{margin: 20 + 'px'}}  href="/">Back</Link></h3>
            </div>
            {unknownUser &&
                <h3 style={{padding: 20 + 'px'}}>That user does not exist.
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
                <button style={{padding: 20 + 'px'}} type="submit">Submit</button>
            </form>
        </Layout>
    );
}