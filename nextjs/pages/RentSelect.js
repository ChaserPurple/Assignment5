import Layout from "@/components/layout";
import CheckTable from "@/components/checktable";
import {useState} from 'react';

const RentSelect = ({films}) => {
    const [checked, setChecked] = useState({})
    const handleRowClick = (row, id_param) => {
        const key = row[id_param]
        if(key in checked) {
            setChecked({...checked, [key]: !checked[key]})
        }
        else {
            setChecked({...checked, [key]: true})
        }
        console.log(checked)
    }

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
    const handleConfirm = () => {
        const params = new URLSearchParams()
        params.set('')
    }

    return (
        <Layout>
            <div class="row">
                <h1>Rent a film</h1>
                
            </div>
            <CheckTable columns={columns} data={films} id_key={'i.inventory_id'} checked={checked} callback={handleRowClick}/>
        </Layout>
    );
}

export async function getServerSideProps() {
    const response = await fetch('http://localhost:8000/getFilms?customer_id=1');
    const films = await response.json();
    console.log(response.json())

    return { props: { films } };
}

export default RentSelect;