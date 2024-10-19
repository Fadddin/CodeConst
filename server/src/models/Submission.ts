import mongoose, { Document, Schema, Model } from 'mongoose';


interface ISubmission extends Document {
    user: mongoose.Types.ObjectId;
    contest: mongoose.Types.ObjectId;
    question: mongoose.Types.ObjectId;
    code: string;
    language: string;  
    result: 'pass' | 'fail';
    score: number;
    submissionTime: Date;
}


const SubmissionSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contest: { type: mongoose.Schema.Types.ObjectId, ref: 'Contest', required: true },
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    code: { type: String, required: true },
    language: { type: String, required: true },  
    result: { type: String, enum: ['pass', 'fail'], default: 'fail' },
    score: { type: Number, default: 0 },
    submissionTime: { type: Date, default: Date.now }
});


const Submission: Model<ISubmission> = mongoose.model<ISubmission>('Submission', SubmissionSchema);
export default Submission;
