export default function stall(ms = 5000) {
  let startTime = new Date();
  let currentTime = new Date();
  while (currentTime - startTime < ms) {
    currentTime = new Date();
  }
}
