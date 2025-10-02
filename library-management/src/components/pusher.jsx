import Echo from "laravel-echo";
import Pusher from "pusher-js";
Pusher.logToConsole = true;
const echo = new Echo({
  broadcaster: "pusher",
  key: "5371b01b7d618f111637",
  cluster: "ap1",
  forceTLS: true,
});

export default echo;
