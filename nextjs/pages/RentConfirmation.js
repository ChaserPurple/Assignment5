import { useRouter } from 'next/router'
import Layout from "@/components/layout";
import BasicTable from "@/components/basictable";
import React from "react";
const router = useRouter();
const rentData = router.query;


export default function RentConfirmation(){
    console.log(userData)
    return (
        <Layout>
            <h1>Success!</h1>
            <div class="row">
                {/*TODO: Figure out what the keys actually are. I assume ids from farm*/}
                <h3>{rentData.fname}</h3>
                <h3>{rentData.lname}</h3>
            </div>
            <BasicTable columns={columns} data={rentData.films}/>
        </Layout>
    )
}