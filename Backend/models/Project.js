const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Planning', 'In Progress', 'Completed'],
    default: 'Planning',
  },
  completion: {
    type: String,
    default: '0%',
  },
  team: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: '',
  },
  StartDate: {
    type: Date,
    required: false
  },
  EndDate: {
    type: Date,
    required: false,
  },
  budget: {
    type: String,
    default: '',
  },
  client: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
});

module.exports = mongoose.model('Project', ProjectSchema);