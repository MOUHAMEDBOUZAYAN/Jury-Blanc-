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
  StartDate :{
     type:date,
     required:true
  },
  EndtDate :{
    type:date,
    required:true,
 },

  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
});

module.exports = mongoose.model('Project', ProjectSchema);