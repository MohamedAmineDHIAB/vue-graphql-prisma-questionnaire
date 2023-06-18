const questions = [
    {
        question: "Anwendungsbereich",
        type: "radio",
        options: ["Innen", "Außen"],
        children: ["Untergrund"]
    },
    {
        question: "Untergrund",
        type: "multiple choice",
        options: ["Holz", "Fassade", "Tapete", "Putz"],
        previous_answer: ["Aussen", "Innen"],
        children: ["Kennen Sie sich mit Deckkraft aus?"]
    },
    {
        question: "Kennen Sie sich mit Deckkraft aus?",
        type: "radio",
        options: ["Ja", "Nein"],
        previous_answer: ["Holz", "Fassade", "Tapete", "Putz"],
        children: ["Wie stark?", "Welcher Untergrund?"]
    },
    {
        question: "Wie stark?",
        type: "radio",
        options: ["<95", "95", "98", ">99.5"],
        previous_answer: ["Ja"],
        children: ["Farbton"]
    },
    {
        question: "Welcher Untergrund?",
        type: "radio",
        options: ["heller", "dunkler"],
        previous_answer: ["Nein"],
        children: ["Farbton"]
    },
    {
        question: "Farbton",
        type: "radio",
        options: ["rot", "blau", "grün", "gelb", "schwarz", "weiss"],
        previous_answer: ["<95", "95", "98", ">99.5"]
    },
]

export default questions;
