const { v4 } = require('uuid');
const { StreamChat } = require('stream-chat');

const api_key = 'juudbb2ng7uh';
const api_secret =
  'zbyzqx223mj4az4hhdpkjs59n2hjtkkskn7nv7yev4b7jpv84k85bmz78bwa8cvx';
  
const serverClient = StreamChat.getInstance(api_key, api_secret);