const cluster = require ("cluster"); // This module allows to create child processes (workers).
const numCPUs = require("os").cpus().length; // Get the number of CPU cores on current machine.
const server = require("./server"); // Exports start function from our server.


if(cluster.isMaster) {  // Check if current process is the master process.
    console.log(`✨ Master ${process.pid} is running ✨`);

    // Create child processes (workers). Equal to the number of CPU cores.
    for(let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {  // Listen for 'exit' event, emitted when a worker stops.
        console.log(`Worker ${process.pid} stoped!`);
    });
} else { // If current process is not a master process, it must be a worker, start the server.
    server.start();
}