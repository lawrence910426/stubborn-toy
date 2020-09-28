module.exports = ((Sequelize, Model, DataTypes, sequelize, option = { force: false }) => {
    class user extends Model { }
    user.init({
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        facebook_id: { type: Sequelize.STRING, allowNull: false },
        name: { type: Sequelize.STRING, allowNull: false },
        admin: { type: DataTypes.BOOLEAN, allowNull: false },
        balance: { type: Sequelize.INTEGER, allowNull: false },
        withdraw: { type: DataTypes.BOOLEAN, allowNull: false },
        bank_id: { type: Sequelize.STRING, allowNull: false },
        bank_account: { type: Sequelize.STRING, allowNull: false }
    }, { sequelize });
    class transfer extends Model { }
    transfer.init({
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        user_id: { type: Sequelize.INTEGER, allowNull: false },
        reason: { type: Sequelize.STRING, allowNull: false },
        amount: { type: DataTypes.INTEGER, allowNull: false },
        datetime: { type: 'TIMESTAMP', def == aultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    }, { sequelize });
    class news extends Model { }
    news.init({
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        title: { type: DataTypes.STRING, allowNull: false },
        content: { type: Sequelize.TEXT, allowNull: false },
        normal_image_link: { type: DataTypes.STRING, allowNull: false },
        headline_image_link: { type: DataTypes.STRING, allowNull: true },
        category: { type: DataTypes.STRING, allowNull: false },
        datetime: { type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        is_headline: { type: DataTypes.BOOLEAN, defaultValue: false },
        is_hot: { type: DataTypes.BOOLEAN, defaultValue: false },
        is_interview: { type: DataTypes.BOOLEAN, defaultValue: false },
        is_shown: { type: DataTypes.BOOLEAN, defaultValue: false },
        is_advanced: { type: DataTypes.BOOLEAN, defaultValue: false },
        notify: { type: DataTypes.BOOLEAN, allowNull: false },
        email: { type: DataTypes.STRING, defaultValue: "" },
        views: { type: DataTypes.STRING, allowNull: false, defaultValue: 0 },
    }, { sequelize });

    user.hasMany(transfer, { foreignKey: "transfer_record" });
    transfer.belongsTo(user, { foreignKey: "transfer_record" });

    user.hasMany(news, { foreignKey: "user_to_news", as: "author" });
    news.belongsTo(user, { foreignKey: "user_to_news", as: "author" });

    return {
        user: user,
        transfer: transfer,
        news: news,
        sync: new Promise(async (resolve, reject) => {
            try {
                await user.sync(option)
                await news.sync(option)
                await transfer.sync(option)
                resolve()
            } catch (ex) { reject(ex) }
        })
    };
});
