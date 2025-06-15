import { getAllTours } from "@/utils/actions"
import Link from "next/link"

const ToursPage = async () => {
  const { tours, count } = await getAllTours()

  return (
    <div>
      <h1>All Tours</h1>
      <p>Total tours: {count}</p>
      <div className="tours">
        {tours.map((tour) => (
          <Link href={`/tours/${tour.slug}`} key={tour.id} className="tour">
            <article>
              <div className="tour-img-container">
                <img src={tour.image || "/placeholder.svg"} alt={tour.name} />
              </div>
              <div className="tour-details">
                <h4 className="tour-name">{tour.name}</h4>
                <p className="tour-location">{tour.location}</p>
                {/* Update the tour rendering to properly handle the category object */}
                <p className="tour-category">
                  {typeof tour.category === "object" ? tour.category.name : tour.category}
                </p>
                <div className="tour-footer">
                  <p>
                    <span>
                      <i className="fa-solid fa-clock"></i>
                    </span>
                    {tour.duration}
                  </p>
                  <p>From ${tour.price}</p>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ToursPage
