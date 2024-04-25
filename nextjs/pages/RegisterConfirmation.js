'use client';
import Layout from "@/components/layout";
import {useRouter, useSearchParams} from "next/navigation";


export default function RegisterConfirmation(){
    return(
        <Layout>
            <h1>Success!</h1>
            <div className="row">
                <h3>{navData.fname}</h3>
                <h3>{navData.lname}</h3>
            </div>
            <div className="row">
                <h3>{navData.fname}</h3>
                <h3>{navData.lname}</h3>
            </div>
        </Layout>
    );
}