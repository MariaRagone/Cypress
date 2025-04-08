/// <reference types="cypress" />

describe('Initial Page', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber');
  });

  it('should have the title of the application in the header', () => {
    cy.get('[data-test="application-title"]').should('contain', 'Echo Chamber');
  });

  it('should have the title of the application in the window', () => {
    cy.title().should('contain', 'Echo Chamber');
  });

  it('should have a "Sign In" button', () => {
    cy.get('[data-test="sign-in"]');
  });

  it('should have a "Sign Up" button', () => {
    cy.get('[data-test="sign-up"]');
  });
});

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber/sign-up');
    cy.get('[data-test="sign-up-submit"]').as('submit');
  });

  it('should require an email', () => {
    cy.get('@submit').click();
    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validationMessage')
      .should('contain', 'Please fill out this field');

    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validity')
      .its('valueMissing')
      .should('be.true');
  });

  it('should require that the email actually be an email address', () => {
    cy.get('[data-test="sign-up-email"]').as('email');
    cy.get('@email').type('notanemail');
    cy.get('@submit').click();
    cy.get('[data-test="sign-up-email"]:invalid');

    cy.get('@email')
      .invoke('prop', 'validationMessage')
      .should('contain', "Please include and '@' in the email address.");

    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validity')
      .its('typeMismatch')
      .should('be.true');
  });

  it('should require a password when the email is present', () => {});
});
