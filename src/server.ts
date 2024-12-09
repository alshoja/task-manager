import { App } from "./app";
export class Server {
  private port: number;
  private appInstance: App;

  constructor() {
    this.port = parseInt(process.env.PORT || "3000", 10);
    this.appInstance = new App();
  }

  public start(): void {
    this.appInstance.getApp().listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

const server = new Server();
server.start();
