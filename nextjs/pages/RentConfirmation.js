import Layout from "@/components/layout";
import Link from "next/link";

export default function RentConfirmation(){
    const getDate = () => {
        const date = new Date()
        date.setDate(date.getDate() + 5)
        return date.toDateString()
    }

    return (
        <Layout>
            <main className="flex min-h-screen flex-col items-center justify-center">
                <h1>Success!</h1>
                <h3>Due Date: {getDate()}</h3>
                <Link href="/">Okay</Link>
            </main>
        </Layout>
    )
}