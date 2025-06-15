import Link from "next/link"

const ToursPage = async () => {
  // Placeholder data until getAllTours is implemented
  interface Tour {
    id: string;
    name: string;
    slug: string;
    image?: string;
    location: string;
  }

  const tours: Tour[] = []
  const count = 0

  return (
    <div>
      <h1>All Tours</h1>
      <p>Total tours: {count}</p>
      <div className="tours">
        {tours.length === 0 ? (
          <p>No tours available.</p>
        ) : (
          tours.map((tour) => (
            <Link href={`/tours/${tour.slug}`} key={tour.id} className="tour">
              <article>
                <div className="tour-img-container">
                  <img src={tour.image || "/placeholder.svg"} alt={tour.name} />
                </div>
                <div className="tour-details">
                  <h4 className="tour-name">{tour.name}</h4>
                  <p className="tour-location">{tour.location}</p>
                </div>
              </article>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default ToursPage
