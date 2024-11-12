import { Schema, model } from "mongoose";

const projectSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "User", 
        required: true
    }
}, 
{
    timestamps: true,
    versionKey: false
});

export default model('Project', projectSchema);
