import React from 'react';
import BasicTable from "@/components/basictable";


const CanadianCustomers = ({ canadianCustomers }) => {
    const columns = [
        {
            Header: 'First Name',
            accessor: 'first_name',
        },
        {
            Header: 'Last Name',
            accessor: 'last_name',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'City',
            accessor: 'city',
        }
    ]
    return <BasicTable columns={columns} data={canadianCustomers}/>;
};

export async function getServerSideProps() {
    const response = await fetch('http://localhost:8000/getCanadianCustomers');
    const canadianCustomers = await response.json();

    return { props: { canadianCustomers } };
}


export default CanadianCustomers;




