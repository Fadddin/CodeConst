import mongoose, { Document, Schema, Model } from 'mongoose';


interface ITestCase {
    input: string;
    output: string;
}


export interface IQuestion extends Document {
    title: string;
    description: string;
    inputFormat: string;
    outputFormat: string;
    constraints?: string;
    testCases: ITestCase[];
    points: number;
}


const QuestionSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    inputFormat: { type: String, required: true },
    outputFormat: { type: String, required: true },
    constraints: { type: String },
    testCases: [{
        input: { type: String, required: true },
        output: { type: String, required: true }
    }],
    points: { type: Number, default: 100 }
});


const Question: Model<IQuestion> = mongoose.model<IQuestion>('Question', QuestionSchema);
export default Question;
