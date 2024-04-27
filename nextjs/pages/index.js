import Layout from "../components/layout";
import Link from 'next/link';

export default function Home() {
  return (
      <Layout>
          <main className="flex min-h-screen flex-col items-center justify-center">
              <h1>Home</h1>
              <p><Link href='/Register'>Become a Customer</Link></p>
              <p><Link href='/RentForm'>Rent</Link></p>
          </main>
      </Layout>
  );
}


