import Layout from "../components/layout";
import Link from 'next/link';

const goRent = () => {

}

export default function Home() {
  return (
      <Layout>
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
              <h1>Home</h1>
              <h3><Link href='/Register'>Become a Customer</Link></h3>
              <h3><Link href='/RentSelect'>Rent</Link></h3>
          </main>
      </Layout>
  );
}


