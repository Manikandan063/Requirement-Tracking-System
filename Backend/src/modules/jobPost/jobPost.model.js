import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';

const JobPost = sequelize.define('JobPost', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  companyId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  hrId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  skills: {
    type: DataTypes.TEXT,
  },
  experience: {
    type: DataTypes.STRING,
  },
  salary: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },
  jobType: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.ENUM('IT', 'NON_IT'),
  },
  interviewDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  interviewTime: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('ACTIVE', 'CLOSED'),
    defaultValue: 'ACTIVE',
  },
  likesCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  sharesCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  comments: {
    type: DataTypes.JSON,
    defaultValue: [],
  }
}, {
  timestamps: true,
});

export default JobPost;
