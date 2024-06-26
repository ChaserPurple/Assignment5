import Layout from "@/components/layout";
import React, {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";
import CheckTable from "@/components/checktable";

const RentSelect = () => {
    const params = useSearchParams()
    const [films, setFilms] = useState([{'inventory_id': 99999, 'f.title': 'fuck', 'f.release_year': 2008}])
    const router = useRouter()
    const [checked, setChecked] = useState({})
    const [nothingSelected, setSelected] = useState(true)

    const handleRowClick = (row, id_param) => {
        const key = row[id_param]
        if(key in checked) {
            setChecked({...checked, [key]: !checked[key]})
        }
        else {
            setChecked({...checked, [key]: true})
        }
    }

    useEffect( () => {
        async function fetchFilms(id){
            await fetch('http://localhost:8000/getFilms?customer_id=' + id).then(response => {
                response.json().then(data => {
                    setFilms(data)
                })
            })
        }
        fetchFilms(params.get("id"))
    }, []);

    const columns = [
        {
            Header: 'Select',
            accessor: '',
        },
        {
            Header: 'Title',
            accessor: 'f.title',
        },
        {
            Header: 'Year',
            accessor: 'f.release_year',
        }
    ]
    const handleConfirm = async () => {
        const filtered = Object.keys(checked).reduce(function (filtered, key) {
            if (checked[key]) filtered[key] = checked[key];
            return filtered;
        }, {});

        if(Object.keys(filtered).length == 0) {
            setSelected(false)
            return
        }


        const headers = new Headers()
        headers.append('Access-Control-Allow-Origin', '*')
        await fetch('http://localhost:8000/rentFilms', {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({
                inventory_ids: Object.keys(filtered),
                customer_id: params.get("id"),
                date: new Date()
            })
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
                {!nothingSelected && <h3>Please select at least one film</h3>}
                <CheckTable className="full-width" columns={columns} data={films} id_key={'i.inventory_id'} checked={checked} callback={handleRowClick}/>
            </main>
        </Layout>
    );
}

export default RentSelect;