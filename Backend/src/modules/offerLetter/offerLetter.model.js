import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';

const OfferLetter = sequelize.define('OfferLetter', {
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
  hrId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  offerLetterUrl: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'SENT'),
    defaultValue: 'PENDING',
  },
  sentDate: {
    type: DataTypes.DATE,
  }
}, {
  timestamps: true,
});

export default OfferLetter;
