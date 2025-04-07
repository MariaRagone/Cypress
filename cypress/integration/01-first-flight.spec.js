/* <reference types="cypress" />
/* eslint-env mocha, cypress */

const { before } = require('lodash');

describe('Create a New Item', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  it('should have a form', () => {
    cy.get('form').should('exist');
  });

  it('should have the words "Add Item"', () => {
    cy.contains('Add Item').should('exist');
  });

  it('should type in an input field', () => {
    cy.get('[data-test="new-item-input"]').type('T-shirt');
  });
});
