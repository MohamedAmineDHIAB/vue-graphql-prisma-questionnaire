// This file contains a function that will seed the database with our list of questions
import questions from "../data/questions_data.ts"


const questions_seeder = async (prisma: any) => {
    for (let i = 0; i < questions.length; i++) {
        const question = await prisma.questions.create({
            data: {
                title: questions[i].title,
                type: questions[i].type,
                options: questions[i].options,
                children: questions[i].children,
                previous_answer: questions[i].previous_answer,
                depth: questions[i].depth,
            },
        });
    }
}

export default questions_seeder;

