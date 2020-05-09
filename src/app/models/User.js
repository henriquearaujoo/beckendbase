import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        // Model attributes are defined here
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.VIRTUAL,
        },
        password_hash: {
          type: DataTypes.STRING,
        },
        provider: {
          type: DataTypes.BOOLEAN,
        },
      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'User', // We need to choose the model name
        timestamps: true,
        underscored: true,
        underscoredAll: true,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password_hash = hash;
      }
    });

    this.belongsTo(sequelize.models.File, {
      foreignKey: 'avatar_id',
      as: 'avatar',
    });
  }

  // static associate(models) {
  //   this.belongsTo(models.File, { foreignKey: 'avatar_id' });
  // }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
