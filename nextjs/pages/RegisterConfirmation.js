import Layout from "@/components/layout";
import { useRouter } from 'next/router'
import {useSearchParams} from "next/navigation";

const router = useRouter()
const search = useSearchParams()


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