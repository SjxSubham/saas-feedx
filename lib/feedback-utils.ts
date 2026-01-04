// Utility functions for feedback data processing

export interface FeedbackTrendData {
  date: string;
  count: number;
  averageRating?: number;
}

/**
 * Generate trend data from feedbacks for charting
 * @param feedbacks - Array of feedback objects with createdAt and rating
 * @param days - Number of days to generate data for (default: 7)
 * @returns Array of FeedbackTrendData for each day
 */
export function generateTrendData(
  feedbacks: Array<{
    createdAt: Date | null;
    rating: number | null;
  }>,
  days: number = 7
): FeedbackTrendData[] {
  const now = new Date();
  const data: FeedbackTrendData[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split("T")[0];

    const dayFeedbacks = feedbacks.filter((f) => {
      if (!f.createdAt) return false;
      const feedbackDate = new Date(f.createdAt).toISOString().split("T")[0];
      return feedbackDate === dateString;
    });

    const ratedFeedbacks = dayFeedbacks.filter((f) => f.rating !== null);
    const avgRating =
      ratedFeedbacks.length > 0
        ? ratedFeedbacks.reduce((sum, f) => sum + (f.rating || 0), 0) /
          ratedFeedbacks.length
        : undefined;

    data.push({
      date: dateString,
      count: dayFeedbacks.length,
      averageRating: avgRating,
    });
  }

  return data;
}

/**
 * Calculate feedback statistics
 * @param feedbacks - Array of feedback objects
 * @returns Object with various statistics
 */
export function calculateFeedbackStats(
  feedbacks: Array<{
    rating: number | null;
    isRead?: boolean | null;
    isPinned?: boolean | null;
    isArchived?: boolean | null;
  }>
) {
  const total = feedbacks.length;
  const unread = feedbacks.filter((f) => !f.isRead).length;
  const pinned = feedbacks.filter((f) => f.isPinned).length;
  const archived = feedbacks.filter((f) => f.isArchived).length;

  const ratedFeedbacks = feedbacks.filter((f) => f.rating !== null);
  const averageRating =
    ratedFeedbacks.length > 0
      ? (
          ratedFeedbacks.reduce((sum, f) => sum + (f.rating || 0), 0) /
          ratedFeedbacks.length
        ).toFixed(1)
      : "N/A";

  const positive = feedbacks.filter((f) => f.rating !== null && f.rating >= 4).length;
  const negative = feedbacks.filter((f) => f.rating !== null && f.rating <= 2).length;
  const neutral = feedbacks.filter((f) => f.rating !== null && f.rating === 3).length;

  return {
    total,
    unread,
    pinned,
    archived,
    averageRating,
    positive,
    negative,
    neutral,
    ratedCount: ratedFeedbacks.length,
  };
}

/**
 * Get rating distribution
 * @param feedbacks - Array of feedback objects with rating
 * @returns Array of objects with rating and count
 */
export function getRatingDistribution(
  feedbacks: Array<{ rating: number | null }>
) {
  return [1, 2, 3, 4, 5].map((rating) => ({
    rating,
    count: feedbacks.filter((f) => f.rating === rating).length,
  }));
}
