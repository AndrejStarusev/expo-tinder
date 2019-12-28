import firebase from 'firebase'
import '@firebase/firestore';
import { observable } from 'mobx';

export const Frustrations = [
    'Bad',
    'Very bad',
    'Rage',
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

    constructor() {
        this.init();
    }

    init() {
        firebase.initializeApp(firebaseConfig);
        this.db = firebase.firestore();
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
        try {
            this.loading = true;
            const collection = this.db.collection('problems');
            const spanshot = uid
                ? await collection.where('creatorUID', '==', uid).get()
                : await collection.get();
    
            const docs = spanshot && spanshot.docs;
    
            if (!docs) {
                return [];
            }
    
            return docs.map(d => ({ ...d.data(), id: d.id }));
        } finally {
            this.loading = false;
        }
    }

    /**
     * @param {string} uid
     * @returns {Problem}
     */
    getProblemById = async (id) => {
        this.loading = true;
        try {
            const collection = this.db.collection('problems');
            const spanshot = await collection.doc(id).get();
    
            return spanshot.data();
        } finally {
            this.loading = false;
        }
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

        this.loading = true;

        const collection = this.db.collection('answers');
        answer.fromUID = this.uid;

        try {
            await collection.doc().set(answer);
        } catch (err) {
            console.log('_____addAnswer error', err.message);
        } finally {
            this.loading = false;
        }
    }

    getAnswersByProblem = async (problemId) => {
        if (!problemId) {
            return;
        }

        this.loading = true;
        try {
            const collection = this.db.collection('answers');
            const spanshot = await collection.where('problemID', '==', problemId).get();
    
            const docs = spanshot && spanshot.docs;
    
            if (!docs) {
                return [];
            }
    
            return docs.map(d => ({ ...d.data(), id: d.id }));
        } finally {
            this.loading = false;
        }
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