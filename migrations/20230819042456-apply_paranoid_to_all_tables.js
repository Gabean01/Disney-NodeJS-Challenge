'use strict';

/** @type {import('sequelize-cli').Migration} */
const tables = ['Movies', 'Characters', 'Users', 'Roles'];

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all(
            tables.map(table => {
                return queryInterface.addColumn(table, 'deletedAt', {
                    type: Sequelize.DATE,
                    allowNull: true
                });
            })
        );
    },

    async down(queryInterface, Sequelize) {
        return Promise.all(
            tables.map(table => {
                return queryInterface.removeColumn(table, 'deletedAt');
            })
        );
    }
};