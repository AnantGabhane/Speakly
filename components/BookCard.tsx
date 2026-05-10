import Link from "next/link";
import Image from "next/image";

type BookCardProps = {
  title: string;
  author: string;
  coverURL: string;
  slug: string;
};

const BookCard = ({ title, author, coverURL, slug }: BookCardProps) => {
    return (
        <Link href={`/books/${slug}`}>
            <article className="book-card">
                <figure className="book-card-figure">
                    <div className="book-card-cover-wrapper">
                        <Image
                            src={coverURL}
                            alt={title}
                            width={133}
                            height={200}
                            className="book-card-cover"
                            style={{ width: "auto" }}
                            unoptimized={coverURL.startsWith("http")}
                        />
                    </div>

                    <figcaption className="book-card-meta">
                        <h3 className="book-card-title">{title}</h3>
                        <p className="book-card-author">{author}</p>
                    </figcaption>
                </figure>
            </article>
        </Link>
    )
}
export default BookCard
