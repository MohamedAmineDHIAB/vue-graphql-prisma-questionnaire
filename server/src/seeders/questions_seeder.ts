// This file contains a function that will seed the database with our list of questions
import questions from "../data/questions_data.ts"


const questions_seeder = async (prisma: any) => {
    for (let i = 0; i < questions.length; i++) {
        // create the question and if it exists, update it
        await prisma.questions.upsert({
            where: { id: i + 1 },
            update: {
                title: questions[i].title,
                type: questions[i].type,
                options: questions[i].options,
                children: questions[i].children,
                previous_answer: questions[i].previous_answer,
                depth: questions[i].depth,
            },
            create: {
                id: i + 1,
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

