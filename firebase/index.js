import firebase from 'firebase'
import '@firebase/firestore';
import { observable } from 'mobx';

export const Frustrations = [
    'Easy',
    'Medium',
    'Hard',
];

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBCZOdmQzqoE-zvWX7Tdrh-thBTNeP2EiI',
  authDomain: '<YOUR-AUTH-DOMAIN>',
  databaseURL: 'https://hahaton-bb1bc.firebaseio.com',
  storageBucket: '<YOUR-STORAGE-BUCKET>',
  projectId: 'hahaton-bb1bc'
};

/**
 * @typedef Answer
 * @property {string} problemID
 * @property {string} fromUID
 * @property {boolean} isProblem
 * @property {string} solution
 */

/**
 * @typedef Problem
 * @property {string} title
 * @property {string} description
 * @property {string} disappointment
 * @property {string} creatorUID
 */

class App {
    uid = null;

    /** @type {firebase.firestore.Firestore} */
    db = null;

    problems = null;

    @observable
    loading = false;

    @observable
    answers;

    @observable
    problems;

    constructor() {
        this.init();
    }

    async init() {
        firebase.initializeApp(firebaseConfig);
        this.db = firebase.firestore();

        this.loading = true;
        await this.getAnswers();
        await this.getAllProblems();
        this.loading = false;
    }

    /**
     * @param {Partial<Problem>} problem
     */
    createProblem = async (problem) => {
        try {
            this.loading = true;
            const collection = this.db.collection('problems');
            await collection.doc().set({ ...problem, creatorUID: this.uid });
        } finally {
            this.loading = false;
        }
    }

    /**
     * @param {string} uid
     * @returns {Problem[]}
     */
    getProblems = async (uid) => {
        // try {
        //     this.loading = true;
        //     const collection = this.db.collection('problems');
        //     const spanshot = uid
        //         ? await collection.where('creatorUID', '==', uid).get()
        //         : await collection.get();
    
        //     const docs = spanshot && spanshot.docs;
    
        //     if (!docs) {
        //         return [];
        //     }
    
        //     return docs.map(d => ({ ...d.data(), id: d.id }));
        // } finally {
        //     this.loading = false;
        // }

        if (!this.problems) {
            return [];
        }

        if (uid) {
            return this.problems.filter(p => p.creatorUID === uid);
        }

        return this.problems;
    }

    getAllProblems = async () => {
        try {
            // this.loading = true;

            this.db.collection('problems').onSnapshot(async sn => {
                const res = sn.docs;
                this.problems = res.map(d => ({ ...d.data(), id: d.id }));
                console.log('problems updatred', this.problems && this.problems.length);
            });
        } finally {
            // this.loading = false;
        }
    }

    getAnswers = async () => {
        try {
            // this.loading = true;

            this.db.collection('answers').onSnapshot(async sn => {
                const res = sn.docs;
                this.answers = res.map(d => ({ ...d.data(), id: d.id }))
                console.log('answers updatred', this.answers && this.answers.length);
            });
        } finally {
            // this.loading = false;
        }
    }

    /**
     * @param {string} uid
     * @returns {Problem}
     */
    getProblemById = async (id) => {
        // this.loading = true;
        // try {
        //     const collection = this.db.collection('problems');
        //     const spanshot = await collection.doc(id).get();
    
        //     return spanshot.data();
        // } finally {
        //     this.loading = false;
        // }
    }

    login = async (email, pass) => {
        this.loading = true;

        try {
            const res = await firebase.auth().signInWithEmailAndPassword(email, pass);
            this.uid = res.user.uid;
    
            return res;
        } finally {
            this.loading = false;
        }
    }

    /**
     * @param {string} priblemId
     * @param {Answer} answer
     */
    addAnswer = async (answer) => {
        if (!answer || !answer.problemID) {
            return;
        }

        // this.loading = true;

        const collection = this.db.collection('answers');
        answer.fromUID = this.uid;

        try {
            await collection.doc().set(answer);
        } catch (err) {
            console.log('_____addAnswer error', err.message);
        } finally {
            // this.loading = false;
        }
    }

    getAnswersByProblem = (problemId) => {
        if (!this.answers) {
            return null;
        }

        return this.answers.filter(a => a.problemID === problemId);
    }
}

const Instance = new App();

async function test() {
    await Instance.login('andrejstarusev@gmail.com', '123456');
    await Instance.createProblem({
        title: 'One more',
        description: 'KEK',
    });

    const problems = await Instance.getProblems(Instance.uid);
}

// test();

export default Instance;