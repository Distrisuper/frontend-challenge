describe("Carga del sitio y acrivar modal al clickear Card", () => {
  it("Debería cargar la página y la lista de los Pókemon", () => {
    cy.visit("http://localhost:5173") 
    cy.get(".pokemon-grid").should("exist")
  })

  it("Debería mostrar los detalles del Pókemon clickeado", () => {
    cy.visit("http://localhost:5173")
    cy.get(".pokemon-card").first().click()
    cy.get(".modal-content").should("exist")
  })
})
