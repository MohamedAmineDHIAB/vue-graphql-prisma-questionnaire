const questions = [
    {
        title: "Anwendungsbereich",
        type: "radio",
        options: ["Innen", "Außen"],
        children: ["Untergrund"],
        depth: 1
    },
    {
        title: "Untergrund",
        type: "multiple choice",
        options: ["Holz", "Fassade", "Tapete", "Putz"],
        previous_answer: [],
        children: ["Kennen Sie sich mit Deckkraft aus?"],
        depth: 2
    },
    {
        title: "Kennen Sie sich mit Deckkraft aus?",
        type: "radio",
        options: ["Ja", "Nein"],
        previous_answer: [],
        children: ["Wie stark?", "Welcher Untergrund?"],
        depth: 3
    },
    {
        title: "Wie stark?",
        type: "range",
        options: ["90", "100"],
        previous_answer: ["Ja"],
        children: ["Farbton"],
        depth: 4
    },
    {
        title: "Welcher Untergrund?",
        type: "radio",
        options: ["heller", "dunkler"],
        previous_answer: ["Nein"],
        children: ["Farbton"],
        depth: 4
    },
    {
        title: "Farbton",
        type: "radio",
        options: ["rot", "blau", "grün", "gelb", "schwarz", "weiss"],
        previous_answer: [],
        children: [],
        depth: 5
    },
]

export default questions;
