'use client';
import { useRouter } from 'next/router'
import Layout from "@/components/layout";
import BasicTable from "@/components/basictable";
import { useEffect, useState } from 'react';


export default function RentConfirmation(){
    const router = useRouter();

    const [rentData, setRentData] = useState([]);

    useEffect(() => {
        setRentData(router.query)
      }, [])

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