import mongoose, { Document, Schema, Model } from 'mongoose';


export interface IContest extends Document {
    name: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    questions: mongoose.Types.ObjectId[];
}


const ContestSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
});


const Contest: Model<IContest> = mongoose.model<IContest>('Contest', ContestSchema);
export default Contest;
