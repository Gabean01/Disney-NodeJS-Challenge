'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Characters', 'movieId');
    },

    async down(queryInterface, Sequelize) {}
};