import Layout from "@/components/layout";
import Link from "next/link";

export default function CustomerConfirmation() {
    return (
        <Layout>
            <main className="flex min-h-screen flex-col items-center">
                <h3>Success!</h3>
                <Link href="/">Back</Link>
            </main>
        </Layout>
    )
}