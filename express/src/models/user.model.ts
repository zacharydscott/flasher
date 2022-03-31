import mongoose from 'mongoose';

const mongooseURI = `mongodb+srv://${process.env.TANGO_USR}:${process.env.TANGO_PASS}@cluster0.tv3i9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
export const conn = mongoose.createConnection(mongooseURI);

interface User {
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	passHash: string;
}

const userSchema = new mongoose.Schema<User>({
	username: {type: String, required: true},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, required: true},
	passHash: {type: String, required: true}
});

export const User = conn.model<User>('User',userSchema);

