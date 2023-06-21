<template>
    <div v-if="loading">
        <h2>Loading...</h2>
    </div>
    <div v-else>
        <Question :error="error" :isError="isError" :question="question" @optionSelected="handleOptionSelected"
            :defaultAnswer="answer" />
        <!-- if there is an error render a button "restart the questionnaire" -->
        <button v-if="isError" @click="handleRestart">Restart the questionnaire</button>
        <button v-if="(!isError && depth > 1)" @click="handleBack">Back</button>
        <button v-if="!isError" @click="handleNext"
            :class="{ 'red-button': isRed, 'green-button': !question.children.length }">
            <span v-if="!question.children.length">Show Recommendations</span>
            <span v-else>Next</span>
        </button>
    </div>
</template>

<script lang="ts">
import Question from '../components/Question.vue';
import fetchQuestionAPI from '../apis/fetch_question';
import postAnswerAPI from '../apis/post_answer';
import fetchAnswerAPI from '../apis/fetch_answer';
import getDepthFromUrl from '../utils/get_depth';

export default {
    components: {
        Question,
    },
    data() {
        return {
            loading: true,
            error: {
                message: '',
            },
            isError: false,
            question: {
                title: '',
                type: '',
                options: [] as string[],
                children: [] as string[],
                id: 0,
            },
            answer: [] as string[],
            depth: 1,
            isRed: false,
        };
    },
    mounted() {
        this.depth = this.getDepthFromUrl();
        if (this.depth) {
            this.fetchData(this.depth);
        } else {
            console.error('Depth parameter not found in URL');
            this.error.message = 'bad URL';
            this.isError = true;
        }
    },
    methods: {
        async fetchData(depth: number = 1) {
            this.loading = true;
            this.isError = false;
            this.error = {
                message: '',
            };
            try {
                const questionData = await fetchQuestionAPI(depth);
                this.question = questionData.response ? questionData.response : this.question;
                const answerData = await fetchAnswerAPI(depth);
                this.answer = answerData.response ? answerData.response : this.answer;
            } catch (error: any) {
                this.error.message = error.message;
                this.isError = true;
                this.answer = [];
            }
            this.loading = false;
        }
        ,
        async handleNext() {
            if (this.question.children.length === 0) {
                this.$router.push('/recommendations');
                return;
            }
            try {
                const { response } = await postAnswerAPI(this.answer, this.depth, this.question.id);
                console.log('Answer submitted successfully:', response);
                this.depth += 1;
                this.$router.push(`/questionnaire#${this.depth}`);
                this.fetchData(this.depth);
            } catch (error: any) {
                this.isRed = true;
                console.error('Error submitting answer:', error.message);
            }
        },
        handleBack() {
            this.isRed = false;
            this.depth -= 1;
            this.$router.push(`/questionnaire#${this.depth}`);
            this.fetchData(this.depth);
        },
        handleRestart() {
            this.isRed = false;
            this.depth = 1;
            this.$router.push(`/questionnaire#${this.depth}`);
            this.fetchData(this.depth);
        },
        async handleOptionSelected(answer: string) {
            this.isRed = false;
            switch (this.question.type) {
                case 'checkbox':
                    // if answer exists in this.answer pop it, otherwise push it
                    if (this.answer.includes(answer)) {
                        this.answer = this.answer.filter((item) => item !== answer);
                    } else {
                        this.answer = [...this.answer, answer];
                    }
                    break;
                default:
                    this.answer = [answer];
            }
        },
        getDepthFromUrl,
    },
};
</script>
