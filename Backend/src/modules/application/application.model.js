import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  jobSeekerId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  jobPostId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  companyId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  hrId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  education: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  skills: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  experience: {
    type: DataTypes.STRING,
  },
  resumeUrl: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM(
      'APPLIED',
      'INTERVIEW_SCHEDULED',
      'INTERVIEW_CONFIRMED',
      'ROUND_1_SELECTED',
      'ROUND_2_SELECTED',
      'ROUND_3_SELECTED',
      'SENT_TO_ADMIN',
      'ADMIN_VERIFIED',
      'OFFER_LETTER_SENT',
      'REJECTED'
    ),
    defaultValue: 'APPLIED',
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['jobSeekerId', 'jobPostId']
    }
  ]
});

export default Application;
