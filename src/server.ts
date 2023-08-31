import express from "express";
import morgan from "morgan";
import cors from "cors";


class Server {
  public app: express.Application = express();
  private port: number = 3000;

  constructor() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors());

    this.app.get("/api", (req, res) => {
      res.status(200).json({message: "respuesta de ruta /api "})
    })

    this.listen();
  }



  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

new Server();