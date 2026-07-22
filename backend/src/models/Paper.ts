import mongoose from 'mongoose';

const paperSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    schoolName: String,
    examName: String,
    subject: String,
    classNum: Number,
    latex: String,
    status: {
        type: String,
        enum: ['queued', 'processing', 'done', 'error', 'uploading'],
        default: 'queued'
    },
    pdfUrl: String,
    docxUrl: String,
    texUrl: String,
    lastError: String,
    retryCount: { type: Number, default: 0 },
    lastRetryAt: Date,
    chapters: [String],
    sections: mongoose.Schema.Types.Mixed,
    formatting: mongoose.Schema.Types.Mixed,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Paper = mongoose.model('Paper', paperSchema);
