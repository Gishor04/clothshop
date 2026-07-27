import React, { useState } from 'react';
import { Star, ThumbsUp, CheckCircle, MessageSquarePlus, X } from 'lucide-react';

export const ReviewsSection = ({ rating = 4.8, numReviews = 38 }) => {
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      name: 'Alexander M.',
      verified: true,
      rating: 5,
      date: 'July 18, 2026',
      title: 'Exceptional Quality & Fabric Feel!',
      comment:
        'The stitching and material surpassed my expectations. Wears comfortably all day without wrinkling. Extremely happy with this purchase!',
      helpful: 12,
    },
    {
      id: 2,
      name: 'Sophia K.',
      verified: true,
      rating: 5,
      date: 'July 12, 2026',
      title: 'Perfect Fit and Vibrant Color',
      comment:
        'Sizing matches the size guide exactly. Color looks even better in person. Delivery took less than 2 days.',
      helpful: 8,
    },
    {
      id: 3,
      name: 'Marcus T.',
      verified: true,
      rating: 4,
      date: 'June 29, 2026',
      title: 'Great casual wear staple',
      comment:
        'Super soft material and durable build. Would recommend sizing up if you prefer a loose relaxed fit.',
      helpful: 5,
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newRev = {
      id: Date.now(),
      name,
      verified: true,
      rating: newRating,
      date: 'Just Now',
      title: title || 'Verified Review',
      comment,
      helpful: 0,
    };

    setReviewsList([newRev, ...reviewsList]);
    setModalOpen(false);
    setName('');
    setTitle('');
    setComment('');
  };

  return (
    <div className="space-y-8 pt-8 border-t border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Customer Reviews</h2>
          <p className="text-xs text-slate-500 mt-1">Real feedback from verified StyleVerse customers</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold transition-all flex items-center gap-2"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Rating Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">
        <div className="text-center flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0">
          <div className="text-4xl font-black text-slate-900">{rating}</div>
          <div className="flex justify-center text-amber-400 my-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <p className="text-xs text-slate-500 font-bold">Based on {numReviews} verified reviews</p>
        </div>

        {/* Rating Bars */}
        <div className="md:col-span-2 space-y-2 text-xs font-semibold text-slate-600">
          {[
            { stars: 5, pct: 85 },
            { stars: 4, pct: 10 },
            { stars: 3, pct: 3 },
            { stars: 2, pct: 1 },
            { stars: 1, pct: 1 },
          ].map((item) => (
            <div key={item.stars} className="flex items-center gap-3">
              <span className="w-12 text-slate-500 font-bold">{item.stars} Stars</span>
              <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full"
                  style={{ width: `${item.pct}%` }}
                />
              </div>
              <span className="w-8 text-right text-slate-400 font-bold">{item.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviewsList.map((rev) => (
          <div key={rev.id} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    {rev.name}
                    {rev.verified && (
                      <span className="text-[10px] text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <CheckCircle className="w-3 h-3" /> Verified Buyer
                      </span>
                    )}
                  </h4>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>
              </div>

              <div className="flex text-amber-400">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
            </div>

            <h5 className="font-extrabold text-sm text-slate-900">{rev.title}</h5>
            <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400 font-semibold">
              <span>Was this review helpful?</span>
              <button className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 bg-slate-100 px-2.5 py-1 rounded-lg transition-colors">
                <ThumbsUp className="w-3 h-3" /> {rev.helpful}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write a Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 z-10">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-lg text-slate-900">Write a Product Review</h3>
              <button onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Your Rating</label>
                <div className="flex gap-2 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah M."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Review Title</label>
                <input
                  type="text"
                  placeholder="Summarize your experience..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Review Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="What did you like or dislike about this clothing item? How was the fit?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-200"
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
