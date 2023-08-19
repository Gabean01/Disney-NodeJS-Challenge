'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Movies', 'characterId', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Characters',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Movies', 'characterId');
    }
};