import BasicTable from "@/components/basictable";
import Layout from "@/components/layout";
import Link from "next/link";
import Checktable from "@/components/checktable";
import CheckTable from "@/components/checktable";

const RentSelect = ({films}) => {
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
    const handleConfirm = () => {
        const params = new URLSearchParams()
        params.set('')
    }

    return (
        <Layout>
            <div class="row">
                <h1>Rent a film</h1>
                <Button onPress={handleConfirm()} query={getFilmSelection()}>Confirm</Button>
            </div>
            <CheckTable columns={columns} data={films}/>
        </Layout>
    );
}

export async function getServerSideProps() {
    const response = await fetch('http://localhost:8000/getFilms');
    const films = await response.json();
    console.log(response.json())

    return { props: { films } };
}

export default RentSelect;