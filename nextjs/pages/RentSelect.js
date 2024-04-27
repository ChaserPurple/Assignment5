import Layout from "@/components/layout";
import React, {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";

const RentSelect = () => {
    const params = useSearchParams()
    const [films, setFilms] = useState([])
    const router = useRouter()

    useEffect( () => {
        async function fetchFilms(id){
            const response = await fetch('http://localhost:8000/getFilms?customer_id=' + id);
            const thingy = await response.json()
            console.log(thingy)
            return thingy
        }
        const rawr = fetchFilms(params.get("id"))
        console.log(rawr)
        setFilms(rawr)
    }, []);

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
    const handleConfirm = async () => {
        const headers = new Headers()
        headers.append('Access-Control-Allow-Origin', 'http://localhost:3000')
        await fetch('http://localhost:8000/rentFilms', {
            headers: headers,
            method: 'POST',
            body: {
                inventory_ids: [],
                customer_id: params.get("id"),
                date: new Date()
            }
        })
        router.push('/RentConfirmation')
    }

    return (
        <Layout>
            <main className="flex min-h-screen flex-col items-center">
                <div className="row justify-between full-width">
                    <h1>Select Films to Rent</h1>
                    <button onClick={handleConfirm}>Confirm</button>
                </div>
                {/*<CheckTable columns={columns} data={films}/>*/}
            </main>
        </Layout>
    );
}

// export async function getServerSideProps() {
//     const searchParams = useSearchParams()
//     console.log(searchParams.toString())
//     // const response = await fetch('http://localhost:8000/getFilms', {
//     //
//     // });
//     // const films = await response.json();
//     // console.log(response.json())
//
//     return { props: {  } };
// }

export default RentSelect;