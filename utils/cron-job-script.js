// Atlas has Triggers, which can run functions on a schedule (like cron).
// Steps
// 1. Log into Atlas → Triggers (left menu).
// 2. Click Add Trigger → choose Scheduled Trigger.
// 3. Set schedule using cron syntax:
// 0 0 * * * → means every day at 12:00 AM UTC.
// 4. Paste the aggregation pipeline into the trigger function.

exports = function () {
  const db = context.services.get("mongodb-atlas").db("yourDatabase");
  const reviewCards = db.collection("reviewCards");

  reviewCards.aggregate([
    // 1. Match only due cards
    {
      $match: {
        nextReviewDate: { $lte: new Date() },
      },
    },
    // 2. Lookup full question details
    {
      $lookup: {
        from: "questions",
        localField: "questionId",
        foreignField: "_id",
        as: "question",
      },
    },
    // 3. Flatten question array
    { $unwind: "$question" },
    // 4. Sort by user + nextReviewDate
    { $sort: { userId: 1, nextReviewDate: 1 } },
    // 5. Build embedded reviewCard objects
    {
      $project: {
        userId: 1,
        reviewCard: {
          _id: "$_id",
          questionId: "$questionId",
          courseId: "$courseId",
          nextReviewDate: 1,
          reviews: 1,
          successes: 1,
          // embed the full question
          question: {
            _id: "$question._id",
            questionText: "$question.questionText",
            correctAnswer: "$question.correctAnswer",
            incorrectAnswers: "$question.incorrectAnswers",
            coursewareId: "$question.coursewareId",
          },
        },
      },
    },
    // 6. Group per user
    {
      $group: {
        _id: "$userId",
        myReviewCards: { $push: "$reviewCard" },
      },
    },
    // 7. Limit to 100 cards per user
    {
      $project: {
        activeReviewCards: { $slice: ["$myReviewCards", 100] },
        lastCacheRefresh: new Date(),
      },
    },
    // 8. Merge back into users
    {
      $merge: {
        into: "users",
        on: "_id",
        whenMatched: "merge",
        whenNotMatched: "discard",
      },
    },
  ]);
};
