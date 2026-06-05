import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';

const Verification = sequelize.define('Verification', {
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
  candidateEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobCategory: {
    type: DataTypes.ENUM('IT', 'NON_IT'),
  },
  verificationSources: {
    type: DataTypes.JSONB,
  },
  verificationStatus: {
    type: DataTypes.ENUM('PENDING', 'VERIFIED', 'REJECTED'),
    defaultValue: 'PENDING',
  },
  remarks: {
    type: DataTypes.TEXT,
  }
}, {
  timestamps: true,
});

export default Verification;
