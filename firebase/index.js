import firebase from 'firebase'
import '@firebase/firestore';

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
        const collection = this.db.collection('problems');
        await collection.doc().set({ ...problem, creatorUID: this.uid });
    }

    /**
     * @param {string} uid
     * @returns {Problem[]}
     */
    getProblems = async (uid) => {
        const collection = this.db.collection('problems');
        const spanshot = uid
            ? await collection.where('creatorUID', '==', uid).get()
            : await collection.get();

        const docs = spanshot && spanshot.docs;

        if (!docs) {
            return [];
        }

        return docs.map(d => d.data());
    }

    /**
     * @param {string} uid
     * @returns {Problem}
     */
    getProblemById = async (id) => {
        const collection = this.db.collection('problems');
        const spanshot = await collection.doc(id).get();

        return spanshot.data();
    }

    login = async (email, pass) => {
        const res = await firebase.auth().signInWithEmailAndPassword(email, pass);
        this.uid = res.user.uid;

        return res;
    }

    /**
     * @param {string} priblemId
     * @param {Answer} answer
     */
    addAnswer = async (answer) => {
        const collection = this.db.collection('answers');
        await collection.doc().set(answer);
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