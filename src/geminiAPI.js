/* eslint-disable no-unused-vars */
import { GoogleGenerativeAI } from '@google/generative-ai';

 
const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
    throw new Error("Missing API key. Please ensure REACT_APP_API_KEY is set in your .env file.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function run(time, hobbies, goals, profession) {

    const prompt = `i have wasted ${time} time.  By knowing about me like hobbies :${hobbies} goals: ${goals} and profession:  ${profession}, now tell me where could have i used all this time to grow myself. The time is separted into hours, minutes,seconds. If any more values are to the right most the start from whatever is the largest but the smallest should be second. So if 4 values are separated by comma then it starts with days. Give me 5 points at max and just show breakdown of time doing those things. Give answer in bullets. Answer on basis of my data and in one liners .Give a line break of two lines after every bullet point. underline the bold points. DO NOT IGNORE MY HOBBIES GOALS AND PROFESSION SUGGEST ME SOMETHING THAT BEST FITS ME NO GENERAL ANSWERS. Include one or two of these quotes with paragraph changes.
You are in danger of living a life so comfortable and soft that you will die without ever realizing your true potential."
"It's a lot more than mind over matter. It takes relentless self-discipline to schedule suffering into your day, every day."
"Denial is the ultimate comfort zone."
"The most important conversations you’ll ever have are the ones you’ll have with yourself."
"Pain unlocks a secret doorway in the mind, one that leads to both peak performance and beautiful silence."
"Don't stop when you're tired. Stop when you're done."
"Everyone fails sometimes and life isn’t supposed to be fair, much less bend to your every whim."
"You must recognize what you are about to do, highlight what you do not like about it, and spend time visualizing each and every obstacle you can."
"The ticket to victory often comes down to bringing your very best when you feel your worst."
"Most wars are won or lost in our own heads."
"It may be satisfactory, but that's another word for mediocrity. and put the quote in bold and italics with line break above and below. don't repeat the break down . Dont suggest programming language every time try different things and dont start with here are 5 things... "`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text(); // Ensure to await response.text()
        return text;
    } catch (error) {
        console.error('Error generating content:', error);
        throw error;  
    }
}

// function run(time, hobbies, goals, profession) {
//     return `i have wasted ${time} time.  By knowing about me like ${hobbies} ${goals} ${profession}, now tell me where could have i used all this time to grow myself. The time is separted into hours, minutes,seconds. If any more values are to the right most the start from whatever is the largest but the smallest should be second. So if 4 values are separated by comma then it starts with days. Give me 5 points at max and just show breakdown of time doing those things.`;
// }
export { run };
