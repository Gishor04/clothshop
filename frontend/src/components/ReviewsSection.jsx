import React, { useState } from 'react';
import { Star, ThumbsUp, CheckCircle, MessageSquarePlus, X } from 'lucide-react';

export const ReviewsSection = ({ rating = 4.9, numReviews = 48 }) => {
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      name: 'Anushka P.',
      location: 'Colombo 07',
      verified: true,
      rating: 5,
      date: 'July 20, 2026',
      title: 'The leather smells incredible & stitching is perfection!',
      comment:
        'My Liyana Tote gets compliments everywhere I go in Colombo. Sizing holds my 14" laptop, planner, cosmetic case, and water bottle effortlessly. Delivered via COD next morning!',
      helpful: 24,
    },
    {
      id: 2,
      name: 'Rashmi S.',
      location: 'Kandy',
      verified: true,
      rating: 5,
      date: 'July 14, 2026',
      title: 'Feels like an expensive European luxury brand',
      comment:
        'Ordered the Fortress Laptop Bag with Cash on Delivery to Kandy. Quality far exceeds the price point. Heavy brass zippers and thick full-grain leather.',
      helpful: 19,
    },
    {
      id: 3,
      name: 'Dinesh R.',
      location: 'Galle Fort',
      verified: true,
      rating: 5,
      date: 'June 28, 2026',
      title: 'Perfect weekend companion down south',
      comment:
        'Use my Bentota Duffel for weekend staycations in Mirissa & Galle. Fits 3-4 days of clothes easily and complies with local flight carry-on rules.',
      helpful: 14,
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newRev = {
      id: Date.now(),
      name,
      location: location || 'Sri Lanka',
      verified: true,
      rating: newRating,
      date: 'Just Now',
      title: title || 'Verified Customer Review',
      comment,
      helpful: 0,
    };

    setReviewsList([newRev, ...reviewsList]);
    setModalOpen(false);
    setName('');
    setLocation('');
    setTitle('');
    setComment('');
  };

  return (
    <div className="space-y-8 pt-8 border-t border-stone-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-stone-900 tracking-tight">Customer Reviews &amp; Testimonials</h2>
          <p className="text-xs text-stone-500 mt-1">Authentic feedback from over 10,000 bag owners across Sri Lanka.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Rating Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-stone-50 p-6 rounded-3xl border border-stone-200/80">
        <div className="text-center flex flex-col justify-center border-b md:border-b-0 md:border-r border-stone-200 pb-4 md:pb-0">
          <div className="text-5xl font-black text-stone-900">{rating}</div>
          <div className="flex justify-center text-amber-500 my-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-amber-500" />
            ))}
          </div>
          <p className="text-xs text-stone-500 font-bold">Based on {numReviews} verified Sri Lanka reviews</p>
        </div>

        {/* Rating Bars */}
        <div className="md:col-span-2 space-y-2 text-xs font-semibold text-stone-600">
          {[
            { stars: 5, pct: 92 },
            { stars: 4, pct: 6 },
            { stars: 3, pct: 2 },
            { stars: 2, pct: 0 },
            { stars: 1, pct: 0 },
          ].map((item) => (
            <div key={item.stars} className="flex items-center gap-3">
              <span className="w-12 text-stone-500 font-bold">{item.stars} Stars</span>
              <div className="flex-1 bg-stone-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-600 h-full rounded-full"
                  style={{ width: `${item.pct}%` }}
                />
              </div>
              <span className="w-8 text-right text-stone-400 font-bold">{item.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviewsList.map((rev) => (
          <div key={rev.id} className="p-6 bg-white rounded-3xl border border-stone-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-900 text-white font-black text-sm flex items-center justify-center shadow-sm">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-stone-900 flex items-center gap-2">
                    {rev.name}
                    {rev.verified && (
                      <span className="text-[10px] text-emerald-800 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <CheckCircle className="w-3 h-3" /> Verified Buyer
                      </span>
                    )}
                  </h4>
                  <span className="text-[11px] text-stone-400">{rev.location} • {rev.date}</span>
                </div>
              </div>

              <div className="flex text-amber-500">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
            </div>

            <h5 className="font-black text-sm text-stone-900 pt-1">{rev.title}</h5>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">{rev.comment}</p>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-stone-400 font-semibold">
              <span>Was this review helpful?</span>
              <button className="flex items-center gap-1 text-stone-700 hover:text-amber-800 bg-stone-100 px-3 py-1 rounded-xl transition-colors font-bold">
                <ThumbsUp className="w-3 h-3" /> {rev.helpful}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write a Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 z-10 border border-stone-200">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-lg text-stone-900">Write a Review for Kottuba</h3>
              <button onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-stone-400 hover:text-stone-900" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-stone-700 mb-1 font-bold">Overall Rating</label>
                <div className="flex gap-2 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating ? 'fill-amber-500 text-amber-500' : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 mb-1 font-bold">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anushka P."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl bg-stone-50 focus:outline-none focus:border-amber-700"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 mb-1 font-bold">City / District</label>
                  <input
                    type="text"
                    placeholder="e.g. Colombo 03"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl bg-stone-50 focus:outline-none focus:border-amber-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 mb-1 font-bold">Headline</label>
                <input
                  type="text"
                  placeholder="Summarize your bag experience..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-stone-50 focus:outline-none focus:border-amber-700"
                />
              </div>

              <div>
                <label className="block text-stone-700 mb-1 font-bold">Review Details</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about the leather texture, stitching, capacity, or delivery..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-stone-50 focus:outline-none focus:border-amber-700"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-900 hover:bg-amber-800 text-white font-bold text-xs rounded-2xl shadow-lg shadow-amber-950/20 transition-all"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
