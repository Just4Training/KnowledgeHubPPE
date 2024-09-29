// const mongoose = require('mongoose');

// const problemSchema = new Problem({
//     _id: new mongoose.Types.ObjectId(),
//     problemName: String,
//     description: String,
//     leetcode: Number,
//     topic: String,
//     level: String
// }, { collection: 'test'});

// const ProblemModel = mongoose.model('Problem', problemSchema, 'test');

class Problem {
    id;
    problemName;
    description;
    leetcode;
    topic;
    level;

    constructor(problemName) {
        this.problemName = problemName;
    }

    createMongooseObj() {
        const problem = new ProblemModel({
            _id: this.id,
            problemName: this.problemName,
            description: this.description,
            topic: this.topic
        });

        return problem;
    }

}

module.exports = Problem;