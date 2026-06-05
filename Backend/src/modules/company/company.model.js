import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyEmail: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  companyPhone: {
    type: DataTypes.STRING,
  },
  website: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
    defaultValue: 'ACTIVE',
  }
}, {
  timestamps: true,
});

export default Company;
