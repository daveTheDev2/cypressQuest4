describe("File upload and download tests", () => {
  beforeEach(() => {
    cy.visit("https://filebin.net/");
  });

  it("Upload file and download it in Zip format", () => {
    cy.get("#fileField").attachFile("pexels_LA.jpg");
    cy.contains("It contains 1 uploaded file").should("be.visible");
    cy.get(`[data-bs-target="#modalArchive"]`).click();
    cy.contains("Zip")
      .invoke("attr", "href")
      .then((downloadLink) => {
        cy.log(downloadLink);
        cy.downloadFile(
          "https://filebin.net/archive/",
          downloadLink,
          "mydownloads/zipFiles",
          "downloadedFromCypress.zip"
        );
        cy.readFile("mydownloads/zipFiles/downloadedFromCypress.zip");
      });
  });

  it("Upload file and download it in Tar format", () => {
    cy.get("#fileField").attachFile("pexels_LA.jpg");
    cy.contains("It contains 1 uploaded file").should("be.visible");
    cy.get(`[data-bs-target="#modalArchive"]`).click();
    cy.contains("Tar")
      .invoke("attr", "href")
      .then((downloadLink) => {
        cy.log(downloadLink);
        cy.downloadFile(
          "https://filebin.net/archive/",
          downloadLink,
          "mydownloads/tarFiles",
          "downloadedFromCypress.tar"
        );
        cy.readFile("mydownloads/tarFiles/downloadedFromCypress.tar");
      });
  });
});
