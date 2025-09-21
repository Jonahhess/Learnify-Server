const { GoogleGenAI, Type } = require("@google/genai");
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateCourseOutlineFromTitle(title) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Act as an experienced course instructor, balancing accuracy, pedagogy, a bit of fun, and completeness. 
      You excel at preparing course outlines for a given title.
      Prepare a course outline based on the title: '${title}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
      },
    },
  });

  return response.text;
}

async function generateCoursewareFromTitle(courseTitle, title) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Act as an experienced course instructor, balancing accuracy, pedagogy, a bit of fun, and completeness. 
    You excel at preparing full lessons given only a title. 
    A lesson is a text with an accompanying quiz which is used to grade the students understanding of the text. 
    The quiz contains some important questions about the text, and each question has a question text, a correct answer, some incorrect answers, and two indices to mark the beginning and end of the answer within the text.
    Prepare a lesson based on the title: ${title}, for the course ${courseTitle}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING },
          quiz: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                questionText: { type: Type.STRING },
                correctAnswer: { type: Type.STRING },
                incorrectAnswers: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                answerStartIndex: { type: Type.INTEGER },
                answerEndIndex: { type: Type.INTEGER },
              },
            },
          },
        },
      },
    },
  });

  return response.text;
}

async function generateFullCourseByTitle(title) {
  const outline = await generateCourseOutlineFromTitle(title);
  const jsonOutline = JSON.parse(outline) || [];
  const promises = [];
  for (const entry of jsonOutline) {
    promises.push(generateCoursewareFromTitle(title, entry));
  }

  const coursewares = await Promise.all(promises);
  return { outline, coursewares };
}

module.exports = {
  generateCourseOutlineFromTitle,
  generateCoursewareFromTitle,
  generateFullCourseByTitle,
};
