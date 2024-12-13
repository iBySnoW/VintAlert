import { or } from "firebase/firestore"

let userId: string;

describe('Authentication API', () => {
  const baseUrl = 'http://localhost:3000'
  
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('should register a new user successfully', () => {
    const newUser = {
      email: 'test@example.com',
      password: 'password123',
    }

    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/register`,
      body: newUser
    }).then((response) => {
      expect(response.status).to.eq(201)
      userId = response.body.user.uid
    })
  })

  it('should login user successfully', () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password123'
    }

    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      body: credentials
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('access_token')
    })
  })

  it('should fail with invalid credentials', () => {
    const invalidCredentials = {
      email: 'test@example.com',
      password: 'wrongpassword'
    }

    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      body: invalidCredentials,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401)
    })
  })

  after(() => {
    if (userId) {
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/users/${userId}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    }
  })
})