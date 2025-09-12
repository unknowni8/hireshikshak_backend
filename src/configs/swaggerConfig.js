import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [{ url: "/api/v1" }],
  },
  apis: ["./src/routes_v1/**/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
