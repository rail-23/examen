import { Schema, model } from "mongoose";

const tareaSchema = new Schema({
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: "Project", 
        required: false 
    },
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    estado: {
        type: String,
        enum: ["pendiente", "en progreso", "completada"],
        default: "pendiente"
    },
    prioridad: {
        type: Number,
        min: 1,
        max: 5
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model("Tarea", tareaSchema);
