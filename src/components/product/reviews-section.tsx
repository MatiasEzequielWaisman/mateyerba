import { RatingStars } from "@/components/product/rating-stars";
import type { Review } from "@/lib/types";

export function ReviewsSection({ rating, reviewCount, reviews }: { rating: number; reviewCount: number; reviews: Review[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-[240px_1fr]">
      <div className="flex flex-col items-start gap-2 md:sticky md:top-24 md:self-start">
        <span className="font-display text-4xl font-semibold text-forest-950">{rating.toFixed(1)}</span>
        <RatingStars rating={rating} size="md" />
        <p className="text-sm text-stone-500">{reviewCount} opiniones verificadas</p>
      </div>

      <div className="flex flex-col divide-y divide-stone-200">
        {reviews.length === 0 ? (
          <p className="py-6 text-sm text-stone-500">Todavía no hay opiniones para este producto. ¡Sé el primero en dejar la tuya!</p>
        ) : (
          reviews.map((review) => (
            <article key={review.id} className="py-6 first:pt-0">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-forest-950">{review.author}</p>
                  <RatingStars rating={review.rating} className="mt-1" />
                </div>
                <time className="text-xs text-stone-400" dateTime={review.date}>
                  {new Date(review.date).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" })}
                </time>
              </div>
              <h3 className="mb-1 text-sm font-semibold text-forest-900">{review.title}</h3>
              <p className="text-sm text-stone-600">{review.body}</p>
              {review.verified && <p className="mt-2 text-xs font-medium text-olive-700">Compra verificada</p>}
            </article>
          ))
        )}
      </div>
    </div>
  );
}
