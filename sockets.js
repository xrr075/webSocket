
class Sockets {
  constructor() {
    this.instance = null;
    this.sockets = new Set();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Sockets();
    }
    return this.instance;
  }

  add(socket) {
    this.sockets.add(socket);
  }

  del(socket)  {
    this.sockets.delete(socket);
  }

  getAll() {
    return this.sockets;
  }

}

module.exports = {
  Sockets,
}
