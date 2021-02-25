// Generales
const app = require("../app");

// REST
const request = require("supertest");
const { StatusCodes } = require("http-status-codes");

// Socket
const { createServer } = require("http");
const Client = require("socket.io-client");
const socket = require("../socket");

describe("Prueba de comunicación", () => {
  describe("Comunicación Socket", () => {
    let io, clientSocket, port;

    beforeAll((done) => {
      // console.debug("beforeAll");
      const httpServer = createServer(app).listen();
      port = httpServer.address().port;
      io = socket.listen(httpServer);
      done();
    });

    afterAll((done) => {
      // console.debug("afterAll");
      io.close();
      clientSocket.close();
      done();
    });

    beforeEach((done) => {
      // console.debug("beforeEach");
      clientSocket = new Client(`http://localhost:${port}`);
      clientSocket.on("connect", () => {
        // console.log("connect", clientSocket.id);
        done();
      });
    });

    afterEach((done) => {
      // console.debug("afterEach");
      if (clientSocket.connected) {
        // console.log("disconnect", clientSocket.id);
        clientSocket.disconnect();
      }
      done();
    });

    test("Prueba básica de comunicación", (done) => {
      clientSocket.emit("serverEvent", "Hola server, ¿como estas?");
      clientSocket.on("clientEvent", (data) => {
        // console.log("clientEvent", data);
        expect(data).toBe("bien, ¿y tu?");
        done();
      });
    });

    test("Prueba básica de comunicación", (done) => {
      clientSocket.emit("serverEvent", "Hola server, ¿como estas?");
      clientSocket.on("clientEvent", (data) => {
        // console.log("clientEvent", data);
        expect(data).toBe("bien, ¿y tu?");
        done();
      });
    });
  });

  describe("Comunicación REST", () => {
    test("Prueba básica de comunicación", async () => {
      const res = await request(app).get("/users");
      expect(res.statusCode).toEqual(StatusCodes.OK);
      expect(res.text).toEqual("respond with a resource");
    });
  });
});
