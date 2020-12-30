const Koa = require('koa');
const { initSocketIoServer } = require('./websocket');
const { Sockets } = require('./sockets');

const app = new Koa();
app.use(require('koa-static')("./"));

const sockets = Sockets.getInstance();

app.use((ctx, body) => {
  const query = ctx.query;
  const str = JSON.stringify(query);
  // 假设 str 就是前端传给后端的数据， 需要群发给所有的 安卓设备
  console.log(sockets.getAll().size);
  if (sockets.getAll().size == 0) {
    console.log('已经连接的安卓设备数量为0，群发失败');
  } else {
    // const socket = [...sockets.getAll().values()][0];
    // socket.boardcast.emit('msg', "这是前端发送的，群发的" + str);
    for (const socket of sockets.getAll().values()) {
      socket.emit('msg', "这是前端发送的，群发的" + str);
    }
  }
  ctx.body = "success";
})

const server = initSocketIoServer(app);

server.listen(3000);