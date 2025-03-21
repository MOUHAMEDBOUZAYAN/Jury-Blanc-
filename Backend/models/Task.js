const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  name: String,
  contact: String,
  materials: String,
});

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  resources: {
    type: String,
  },
  suppliers: [SupplierSchema],
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
});

module.exports = mongoose.model('Task', TaskSchema);