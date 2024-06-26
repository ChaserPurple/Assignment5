import Layout from "@/components/layout";
import Link from "next/link";
import {FormEvent, useState} from 'react'
import { useRouter} from "next/navigation";


export default function Register(){
    const router = useRouter()
    const [success, setSucces] = useState(true)

    async function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const request = {}
        formData.forEach((value, key) => {
            request[key] = value
        })
        console.log(request)
        const response = await fetch('http://localhost:8000/addCustomer', {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            method: 'POST',
            body: JSON.stringify(request),
        })
        const customer_id = await response.json()
        if(customer_id == -1)
            setSuccess(false)
        else
            router.push('/CustomerConfirmation')
    }

    return(
        <Layout>
            <main className="flex min-h-screen flex-col items-center justify-center">
                <div className = "row justify-between">
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
                    {/*Phone number*/}
                    <label style={{padding: 20 + 'px'}} htmlFor="phone">Phone Number:</label>
                    <input style={{margin: 20 + 'px'}} type="number" min="0" id="phone" name="phone"/><br/>
                    {/*Store code*/}
                    <label style={{padding: 20 + 'px'}} htmlFor="store_id">Store code (Listed at front of store):</label>
                    <input style={{margin: 20 + 'px'}} type="number" min="1" max="2" id="store_id" name="store_id"/><br/>
                    {/*Submit*/}
                    <button style={{padding: 20 + 'px'}} type="submit">Submit</button>
                </form>
            </main>
        </Layout>
    );
}