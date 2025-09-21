db.reviewCards.aggregate([
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
