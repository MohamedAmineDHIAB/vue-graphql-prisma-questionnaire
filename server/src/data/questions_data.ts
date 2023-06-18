const questions = [
    {
        title: "Anwendungsbereich",
        type: "radio",
        options: ["Innen", "Außen"],
        children: ["Untergrund"]
    },
    {
        title: "Untergrund",
        type: "multiple choice",
        options: ["Holz", "Fassade", "Tapete", "Putz"],
        previous_answer: ["Aussen", "Innen"],
        children: ["Kennen Sie sich mit Deckkraft aus?"]
    },
    {
        title: "Kennen Sie sich mit Deckkraft aus?",
        type: "radio",
        options: ["Ja", "Nein"],
        previous_answer: ["Holz", "Fassade", "Tapete", "Putz"],
        children: ["Wie stark?", "Welcher Untergrund?"]
    },
    {
        title: "Wie stark?",
        type: "radio",
        options: ["<95", "95", "98", ">99.5"],
        previous_answer: ["Ja"],
        children: ["Farbton"]
    },
    {
        title: "Welcher Untergrund?",
        type: "radio",
        options: ["heller", "dunkler"],
        previous_answer: ["Nein"],
        children: ["Farbton"]
    },
    {
        title: "Farbton",
        type: "radio",
        options: ["rot", "blau", "grün", "gelb", "schwarz", "weiss"],
        previous_answer: ["<95", "95", "98", ">99.5"]
    },
]

export default questions;
