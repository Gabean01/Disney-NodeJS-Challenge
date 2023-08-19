module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("Roles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: true,
        paranoid: true
    });

    return Role;
};