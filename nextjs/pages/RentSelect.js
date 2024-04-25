import BasicTable from "@/components/basictable";
import Layout from "@/components/layout";
import Link from "next/link";


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
    const getFilmSelection = () => {

    }

    return (
        <Layout>
            <div class="row">
                <h1>Rent a film</h1>
                <Link href='/RentForm' query={getFilmSelection()}>Confirm</Link>
            </div>
            <BasicTable columns={columns} data={films}/>
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