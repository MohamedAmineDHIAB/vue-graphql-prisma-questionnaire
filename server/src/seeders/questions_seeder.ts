// This file contains a function that will seed the database with our list of questions
import questions from "../data/questions_data.js"


const questions_seeder = async (prisma: any) => {
    for (let i = 0; i < questions.length; i++) {
        const question = await prisma.questions.create({
            data: {
                question: questions[i].question,
                type: questions[i].type,
                options: questions[i].options,
                children: questions[i].children,
                previous_answers: questions[i].previous_answer
            },
        });
    }
}

export default questions_seeder;

