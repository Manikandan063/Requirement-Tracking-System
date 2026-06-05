import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';

const Interview = sequelize.define('Interview', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  applicationId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
  },
  interviewDate: {
    type: DataTypes.DATEONLY,
  },
  interviewTime: {
    type: DataTypes.TIME,
  },
  interviewFormat: {
    type: DataTypes.STRING,
    defaultValue: 'ONLINE',
  },
  meetingLink: {
    type: DataTypes.STRING,
  },
  round1Status: {
    type: DataTypes.STRING,
    defaultValue: 'PENDING',
  },
  round1Name: {
    type: DataTypes.STRING,
  },
  round1Score: {
    type: DataTypes.STRING,
  },
  round2Status: {
    type: DataTypes.STRING,
    defaultValue: 'PENDING',
  },
  round2Name: {
    type: DataTypes.STRING,
  },
  round2Score: {
    type: DataTypes.STRING,
  },
  round3Status: {
    type: DataTypes.STRING,
    defaultValue: 'PENDING',
  },
  round3Name: {
    type: DataTypes.STRING,
  },
  round3Score: {
    type: DataTypes.STRING,
  },
  candidateConfirmation: {
    type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'DECLINED'),
    defaultValue: 'PENDING',
  },
  finalStatus: {
    type: DataTypes.STRING,
  },
  remarks: {
    type: DataTypes.TEXT,
  }
}, {
  timestamps: true,
});

export default Interview;
