import { io, Socket } from 'socket.io-client';
import { baseURL } from './api/baseURL';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : baseURL;

export const socket = io(URL);