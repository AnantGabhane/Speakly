import UploadForm from "@/components/UploadForm";

const Page = () => {
    return (
        <main className="new-book">
            <div className="new-book-wrapper">
                <section className="flex flex-col gap-5">
                    <h1 className="page-title-xl">Add a New Book</h1>
                    <p className="subtitle">Upload a PDF to generate your interactive reading experience.</p>
                </section>

                <UploadForm />
            </div>
        </main>
    )
}

export default Page
