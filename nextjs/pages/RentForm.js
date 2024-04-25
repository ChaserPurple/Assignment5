import { useRouter } from 'next/router'
import Layout from "@/components/layout";
import Link from "next/link";
import BasicTable from "@/components/basictable";
import React from "react";

const router = useRouter();
const selectedFilms = router.query;

export default function RentForm(){
    async function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        await fetch('http://localhost:8000/rentFilms', {
            method: 'POST',
            body: {"Customer": formData, "Films": selectedFilms},
        })
        await router.push("/RentConfirmation") //TODO: Actually push the data as well
    }

    const columns = [
        {
            Header: 'Title',
            accessor: 'title',
        },
        {
            Header: 'Year',
            accessor: 'release_year',
        }
    ]

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
                {/*Submit*/}
                <button type="submit">Submit</button>
            </form>
            <BasicTable columns={columns} data={selectedFilms}/>
        </Layout>
    );
}