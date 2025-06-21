document.addEventListener('DOMContentLoaded', () => {
    // Data for the Quiz Questions with Explanations
    const quizQuestions = [
    // --- Category: Core Concepts & APIs ---
    {
        question: "What is the primary purpose of a RESTful API?",
        answers: ["To render HTML pages on the server.", "To provide a standardized way for clients and servers to communicate over HTTP.", "To execute complex database queries directly from the client.", "To manage server infrastructure."],
        correctAnswerIndex: 1,
        explanation: "REST (Representational State Transfer) is an architectural style that defines a set of constraints for creating web services. It uses standard HTTP methods (GET, POST, PUT, DELETE) to allow different systems to communicate with each other."
    },
    {
        question: "Which HTTP method is idempotent, meaning it can be called multiple times with the same result?",
        answers: ["POST", "PATCH", "GET", "All of the above"],
        correctAnswerIndex: 2,
        explanation: "GET, PUT, and DELETE are idempotent. Calling them once has the same effect as calling them multiple times. POST is not idempotent because each call typically creates a new resource."
    },
    {
        question: "What is the key difference between synchronous and asynchronous operations in a backend system?",
        answers: [
            "Synchronous operations are always faster than asynchronous ones.",
            "Synchronous operations block execution until they complete, while asynchronous operations allow the program to continue running.",
            "Asynchronous operations are simpler to write and debug.",
            "Synchronous is for databases, while asynchronous is for file I/O."
        ],
        correctAnswerIndex: 1,
        explanation: "In a synchronous (or blocking) model, when a task is executed, the main thread waits for it to finish before moving on. In an asynchronous (non-blocking) model, the task is started, and the main thread immediately continues with other work. The program is notified later when the task is complete, typically via a callback, promise, or event. This is crucial for I/O-bound tasks (like network requests or database queries) as it allows a server to handle many concurrent connections efficiently."
    },
    {
        question: "What is the main difference between Authentication and Authorization?",
        answers: ["They are the same thing.", "Authentication verifies identity; Authorization determines access rights.", "Authorization verifies identity; Authentication determines access rights.", "Authentication is for users; Authorization is for services."],
        correctAnswerIndex: 1,
        explanation: "Authentication is the process of verifying who you are (e.g., with a username and password). Authorization is the process of verifying what you are allowed to do (e.g., an admin can delete users, but a regular user cannot)."
    },
    {
        question: "What is a JWT (JSON Web Token)?",
        answers: ["A type of database.", "A way to encrypt entire servers.", "A compact, URL-safe means of representing claims to be transferred between two parties.", "A JavaScript framework for building UIs."],
        correctAnswerIndex: 2,
        explanation: "JWTs are commonly used for authentication and authorization. After a user logs in, the server creates a JWT and sends it to the client. The client then includes this token in the header of subsequent requests to prove its identity and access protected routes."
    },
    {
        question: "What is CORS (Cross-Origin Resource Sharing)?",
        answers: ["A security feature that encrypts data in transit.", "A browser security mechanism that restricts HTTP requests from one origin to another.", "A method for optimizing database queries.", "A type of load balancer."],
        correctAnswerIndex: 1,
        explanation: "By default, web browsers enforce a 'same-origin policy'. CORS is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin."
    },

    // --- Category: Databases (SQL & NoSQL) ---
    {
        question: "What is the main difference between SQL and NoSQL databases?",
        answers: ["SQL is for Windows, NoSQL is for Linux.", "SQL databases are relational (structured data), while NoSQL databases are non-relational (unstructured or semi-structured).", "SQL databases are slower than NoSQL databases.", "SQL is a programming language, while NoSQL is a type of server."],
        correctAnswerIndex: 1,
        explanation: "SQL databases use schemas and tables with rigid structures (e.g., MySQL, PostgreSQL). NoSQL databases are more flexible and can store data in various formats like documents (MongoDB), key-value pairs (Redis), or graphs (Neo4j)."
    },
    {
        question: "What does an 'INNER JOIN' do in SQL?",
        answers: ["Returns all records from the left table, and the matched records from the right table.", "Returns records that have matching values in both tables.", "Returns all records from both tables.", "Returns all records from the right table, and the matched records from the left table."],
        correctAnswerIndex: 1,
        explanation: "An INNER JOIN selects records that have matching values in both tables. It is the most common type of join."
    },
    {
        question: "What is a database 'index' used for?",
        answers: ["To encrypt data in a table.", "To summarize the data in a table.", "To speed up the retrieval of rows from a table.", "To back up a table."],
        correctAnswerIndex: 2,
        explanation: "An index is a data structure that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage space. It's like the index in the back of a book."
    },
    {
        question: "What do the ACID properties of a transaction guarantee?",
        answers: ["Speed and flexibility.", "Reliability and data integrity.", "Scalability and low cost.", "Security and encryption."],
        correctAnswerIndex: 1,
        explanation: "ACID (Atomicity, Consistency, Isolation, Durability) is a set of properties that guarantee database transactions are processed reliably. They ensure that even in the event of errors or power failures, the data remains in a consistent state."
    },
    {
        question: "What is the 'N+1' query problem?",
        answers: ["A security vulnerability in SQL.", "A situation where the code executes N additional queries to fetch the same data that could have been fetched in one query.", "A problem where the database has one more table than it needs.", "A type of join that is N times slower than an INNER JOIN."],
        correctAnswerIndex: 1,
        explanation: "The N+1 problem occurs when an ORM (Object-Relational Mapper) makes one query to retrieve a list of items, and then N subsequent queries to retrieve related data for each item. This can be solved by 'eager loading' the related data in the initial query."
    },
    {
        question: "According to the CAP Theorem, a distributed system can only provide two of which three guarantees?",
        answers: ["Speed, Security, Scalability", "Atomicity, Isolation, Durability", "Consistency, Availability, Partition Tolerance", "Read, Write, Update"],
        correctAnswerIndex: 2,
        explanation: "The CAP Theorem states that it is impossible for a distributed data store to simultaneously provide more than two out of the following three guarantees: Consistency (every read receives the most recent write), Availability (every request receives a response), and Partition Tolerance (the system continues to operate despite network partitions)."
    },
    
    // --- Category: Architecture & System Design ---
    {
        question: "What is a major advantage of a Microservices architecture over a Monolith?",
        answers: ["Simpler to deploy and test.", "Services can be developed, deployed, and scaled independently.", "Less operational overhead.", "Requires fewer developers."],
        correctAnswerIndex: 1,
        explanation: "In a monolith, the entire application is a single unit. In microservices, the application is broken down into smaller, independent services. This allows teams to work on different services autonomously and scale only the parts of the application that need it."
    },
    {
        question: "What is the role of a Load Balancer?",
        answers: ["To encrypt traffic between client and server.", "To distribute incoming network traffic across multiple backend servers.", "To cache frequently accessed data.", "To act as a firewall for the application."],
        correctAnswerIndex: 1,
        explanation: "A load balancer acts as a 'traffic cop' sitting in front of your servers. It spreads requests across them to ensure no single server gets overwhelmed, which improves availability and responsiveness."
    },
    {
        question: "What is the difference between horizontal and vertical scaling?",
        answers: ["Horizontal scaling adds more servers; vertical scaling increases the resources (CPU, RAM) of an existing server.", "Vertical scaling adds more servers; horizontal scaling increases the resources of an existing server.", "Horizontal scaling is for databases; vertical scaling is for application servers.", "There is no difference."],
        correctAnswerIndex: 0,
        explanation: "Vertical scaling (scaling up) means making a server more powerful. Horizontal scaling (scaling out) means adding more servers to your pool of resources."
    },
    {
        question: "What is a Message Queue (e.g., RabbitMQ, Kafka)?",
        answers: ["A type of NoSQL database.", "A component that allows asynchronous communication between different parts of a system.", "A tool for real-time video streaming.", "A server-side programming language."],
        correctAnswerIndex: 1,
        explanation: "Message queues enable services to communicate without being directly connected. A 'producer' service sends a message to the queue, and a 'consumer' service picks it up later. This decouples services and improves resilience."
    },
    {
        question: "What is an API Gateway?",
        answers: ["A server that only serves static files.", "A single entry point for all clients, which then routes requests to the appropriate microservice.", "Another name for a database server.", "A tool for testing APIs."],
        correctAnswerIndex: 1,
        explanation: "In a microservices architecture, an API Gateway simplifies the client by providing a single point of entry. It can handle tasks like authentication, rate limiting, and request routing, so the individual microservices don't have to."
    },

    // --- Category: Caching ---
    {
        question: "What is the primary benefit of caching?",
        answers: ["To make the application more secure.", "To reduce latency and decrease the load on backend resources.", "To store user session data.", "To make the database schema more flexible."],
        correctAnswerIndex: 1,
        explanation: "Caching involves storing copies of frequently accessed data in a temporary, fast-access storage layer (a cache). By serving requests from the cache instead of the original data source (like a database), applications can respond much faster."
    },
    {
        question: "What is a common caching strategy where the application code is responsible for reading and writing to the cache?",
        answers: ["Write-Through", "Write-Back", "Read-Through", "Cache-Aside"],
        correctAnswerIndex: 3,
        explanation: "In the Cache-Aside (or Lazy Loading) pattern, the application first checks the cache. If it's a 'cache miss' (data not found), the application reads the data from the database, stores it in the cache, and then returns it."
    },
    {
        question: "What is Redis commonly used for?",
        answers: ["As a primary relational database.", "As an in-memory data store, used for caching, message broking, and as a database.", "As a web server like Apache.", "As a container orchestration tool."],
        correctAnswerIndex: 1,
        explanation: "Redis is an extremely fast in-memory key-value store. Its speed makes it ideal for caching, but it's also powerful enough for use as a message queue, for managing real-time leaderboards, and more."
    },

    // --- Category: Security ---
    {
        question: "How can you prevent SQL Injection attacks?",
        answers: ["By using a strong firewall.", "By using prepared statements and parameterized queries.", "By encrypting the entire database.", "By hiding the API endpoints."],
        correctAnswerIndex: 1,
        explanation: "SQL Injection occurs when malicious SQL code is inserted into a query. Prepared statements treat user input as data, not as executable code, which is the most effective way to prevent this type of attack."
    },
    {
        question: "What is 'salting' in the context of password hashing?",
        answers: ["Encrypting the password.", "Adding a unique, random string to each password before it is hashed.", "A method to make passwords shorter.", "A deprecated hashing algorithm."],
        correctAnswerIndex: 1,
        explanation: "If two users have the same password, they would have the same hash. A salt is a random value added to each password before hashing. This ensures that even identical passwords result in unique hashes, making attacks like rainbow table lookups ineffective."
    },
    {
        question: "What is a Cross-Site Scripting (XSS) attack?",
        answers: ["An attack where a user is tricked into performing an action they didn't intend to.", "An attack where malicious scripts are injected into otherwise benign and trusted websites.", "An attack that tries to guess a user's password.", "An attack that shuts down a server by overwhelming it with traffic."],
        correctAnswerIndex: 1,
        explanation: "In an XSS attack, an attacker injects malicious client-side scripts (usually JavaScript) into a web page viewed by other users. This can be used to steal session tokens, deface websites, or redirect users to malicious sites."
    },
    
    // --- Category: Concurrency & Performance ---
    {
        question: "What is the difference between a process and a thread?",
        answers: ["A process is a program in execution; a thread is a lightweight unit of execution within a process.", "A thread is a program in execution; a process is a unit of execution within a thread.", "They are the same concept.", "Processes run on the CPU; threads run on the GPU."],
        correctAnswerIndex: 0,
        explanation: "A process has its own isolated memory space. Threads within the same process share memory space, which makes communication between them faster but also creates risks like race conditions."
    },
    {
        question: "What is a 'race condition'?",
        answers: ["When two servers compete to respond to a request first.", "A bug that occurs when the output of a system depends on the sequence or timing of uncontrollable events.", "A performance optimization technique.", "A type of security attack."],
        correctAnswerIndex: 1,
        explanation: "A race condition happens when multiple threads or processes access and manipulate shared data concurrently, and the final result depends on the timing of their execution. It can be prevented using synchronization mechanisms like locks or mutexes."
    },
    {
        question: "What is non-blocking I/O?",
        answers: ["A way to prevent any input/output operations.", "An I/O operation that does not block the execution of the main application thread while it waits for the operation to complete.", "An I/O operation that can only be performed by the admin user.", "An outdated method of handling file access."],
        correctAnswerIndex: 1,
        explanation: "In blocking I/O, the application thread is stuck waiting for an operation (like reading a file or a network request) to finish. In non-blocking I/O, the application can continue to do other work and is notified later when the I/O operation is complete. This is key to systems like Node.js."
    },

    // --- Category: DevOps & Deployment ---
    {
        question: "What is CI/CD?",
        answers: ["A software design pattern.", "A method of automatically building, testing, and deploying code changes.", "A type of database.", "A security protocol."],
        correctAnswerIndex: 1,
        explanation: "CI/CD stands for Continuous Integration and Continuous Delivery/Deployment. It's a practice that automates the software release process, from building the code and running tests (CI) to deploying it to production (CD), enabling faster and more reliable releases."
    },
    {
        question: "What problem does Docker (or containerization) solve?",
        answers: ["It makes code run faster.", "It eliminates the 'it works on my machine' problem by packaging an application with all its dependencies into a standardized unit.", "It automatically writes unit tests for your code.", "It is a replacement for the Git version control system."],
        correctAnswerIndex: 1,
        explanation: "Containers package an application's code along with all the libraries and other dependencies it needs to run. This creates a consistent environment, ensuring the application runs the same way everywhere, from a developer's laptop to a production server."
    },
    {
        question: "What is the primary role of Kubernetes?",
        answers: ["To build container images.", "To provide a platform for automating the deployment, scaling, and management of containerized applications.", "To monitor server hardware.", "To serve as a relational database."],
        correctAnswerIndex: 1,
        explanation: "Kubernetes is a container orchestration platform. While Docker creates the containers, Kubernetes manages them at scale, handling tasks like automatic scaling, service discovery, load balancing, and self-healing (restarting failed containers)."
    },

    // --- Category: Testing ---
    {
        question: "What is the difference between a unit test and an integration test?",
        answers: ["Unit tests are written in JavaScript; integration tests are written in Python.", "A unit test checks a small, isolated piece of code (like a function); an integration test checks how multiple components work together.", "Unit tests are automated; integration tests are manual.", "There is no difference; the terms are interchangeable."],
        correctAnswerIndex: 1,
        explanation: "Unit tests focus on individual 'units' of code in isolation. Integration tests verify that different parts of the system (e.g., your application code and a database) interact correctly."
    },
    // --- Add 70 more questions to reach 100 ---
    {
        question: "Which of these is NOT a principle of the SOLID design philosophy?",
        answers: ["Single Responsibility", "Open/Closed", "Liskov Substitution", "Rapid Development"],
        correctAnswerIndex: 3,
        explanation: "The SOLID principles are: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion. They are guidelines for writing maintainable and scalable object-oriented code."
    },
    {
        question: "What is gRPC?",
        answers: ["A database management tool.", "A modern, high-performance, open-source RPC framework.", "A graphical user interface for Git.", "A REST client for testing APIs."],
        correctAnswerIndex: 1,
        explanation: "gRPC (gRPC Remote Procedure Call) is a framework developed by Google. It uses HTTP/2 for transport and Protocol Buffers as the interface description language, offering better performance and features compared to traditional REST+JSON."
    },
    {
        question: "In a database, what is 'sharding'?",
        answers: ["Encrypting a database table.", "Creating a backup of the database.", "Horizontally partitioning data into smaller, more manageable pieces.", "A type of SQL query."],
        correctAnswerIndex: 2,
        explanation: "Sharding is a database scaling technique where a large database is split into smaller, faster, more easily managed parts called shards. Each shard is a separate database, and together they make up the single logical database."
    },
    {
        question: "What is the purpose of a .env file?",
        answers: ["To document the project's API endpoints.", "To store environment-specific variables like API keys and database credentials outside of the source code.", "To define the project's dependencies.", "To list all the developers who worked on the project."],
        correctAnswerIndex: 1,
        explanation: "A .env file is used to store configuration variables that are specific to the environment (development, staging, production). It's a best practice to keep sensitive information out of version control, and .env files are typically ignored by Git."
    },
    {
        question: "What is a 'Singleton' design pattern?",
        answers: ["A pattern that ensures a class has only one instance and provides a global point of access to it.", "A pattern for creating objects from a set of subclasses.", "A pattern that allows an object to alter its behavior when its internal state changes.", "A pattern for connecting multiple database shards."],
        correctAnswerIndex: 0,
        explanation: "The Singleton pattern is used when exactly one object is needed to coordinate actions across the system. For example, a single logging object or a single database connection pool."
    },
    {
        question: "What is 'technical debt'?",
        answers: ["The cost of the hardware needed to run the application.", "A concept that reflects the implied cost of rework caused by choosing an easy (limited) solution now instead of using a better approach.", "The total number of bugs in the codebase.", "The time spent on developer meetings."],
        correctAnswerIndex: 1,
        explanation: "Technical debt is a metaphor. Rushing a feature with a sub-optimal design is like taking on debt: it gives you a short-term benefit (faster delivery), but you'll have to 'pay it back' later with interest (refactoring, bugs, slower development)."
    },
    {
        question: "What is a 'linter' used for?",
        answers: ["To compile code into machine language.", "To run automated tests.", "To statically analyze code to find programming errors, bugs, stylistic errors, and suspicious constructs.", "To deploy code to a server."],
        correctAnswerIndex: 2,
        explanation: "Linters (like ESLint for JavaScript or Pylint for Python) help enforce coding standards and catch common errors before the code is even run, improving code quality and consistency across a team."
    },
    {
        question: "In object-oriented programming, what is polymorphism?",
        answers: ["The ability of an object to take on many forms.", "The process of hiding implementation details from the user.", "The mechanism of basing an object or class upon another object or class.", "The bundling of data with the methods that operate on that data."],
        correctAnswerIndex: 0,
        explanation: "Polymorphism means 'many forms'. It allows objects of different classes to be treated as objects of a common superclass. For example, a `shape.draw()` method could draw a circle, square, or triangle depending on the object's actual type."
    },
    {
        question: "What is the purpose of an ORM (Object-Relational Mapper)?",
        answers: ["To manage server memory.", "To provide a way to query and manipulate database data using an object-oriented paradigm.", "To optimize network traffic.", "To secure API endpoints."],
        correctAnswerIndex: 1,
        explanation: "ORMs (like Sequelize, TypeORM, or SQLAlchemy) allow developers to interact with their database using the objects and methods of their preferred programming language, instead of writing raw SQL queries."
    },
    {
        question: "What is 'Infrastructure as Code' (IaC)?",
        answers: ["Writing application code directly on the server.", "The process of managing and provisioning computer data centers through machine-readable definition files.", "A design pattern for microservices.", "A method for testing hardware."],
        correctAnswerIndex: 1,
        explanation: "IaC tools like Terraform or AWS CloudFormation allow you to define your infrastructure (servers, databases, load balancers) in configuration files. This makes infrastructure setup repeatable, version-controlled, and automated."
    },
    {
        question: "Which of the following best describes WebSocket?",
        answers: ["A protocol that provides full-duplex communication channels over a single TCP connection.", "A type of HTTP request.", "A client-side JavaScript library.", "A database technology."],
        correctAnswerIndex: 0,
        explanation: "Unlike the request-response model of HTTP, WebSockets allow for a persistent, two-way communication channel between a client and a server. This is ideal for real-time applications like chat apps, live notifications, or multiplayer games."
    },
    {
        question: "What is the 'Twelve-Factor App' methodology?",
        answers: ["A set of 12 rules for securing web applications.", "A methodology for building robust, scalable, and maintainable software-as-a-service apps.", "A 12-step process for debugging code.", "A guide to object-oriented design."],
        correctAnswerIndex: 1,
        explanation: "The Twelve-Factor App is a collection of best practices for building modern applications. Factors include things like storing config in the environment, treating logs as event streams, and keeping development, staging, and production as similar as possible."
    },
    {
        question: "What does the 'event loop' do in an environment like Node.js?",
        answers: ["It handles user interface events like clicks.", "It allows Node.js to perform non-blocking I/O operations by offloading operations and handling callbacks.", "It is a loop that constantly checks for security threats.", "It is the main loop in a video game engine."],
        correctAnswerIndex: 1,
        explanation: "The event loop is the secret to Node.js's high concurrency. It allows a single thread to handle many connections. When an async operation (like a database query) starts, the event loop doesn't wait; it moves on to other tasks and picks up the result of the operation when it's ready."
    },
    {
        question: "What is a 'reverse proxy' (e.g., Nginx)?",
        answers: ["A proxy that retrieves resources on behalf of a client from one or more servers.", "A proxy that retrieves resources for a server from a client.", "A tool to monitor traffic from a proxy.", "A type of VPN."],
        correctAnswerIndex: 0,
        explanation: "A reverse proxy sits in front of web servers and forwards client requests to them. It can provide load balancing, SSL termination, caching, and security, hiding the existence and characteristics of the origin servers."
    },
    {
        question: "What is the purpose of 'rate limiting' an API?",
        answers: ["To make the API faster.", "To control the amount of incoming traffic to a service to prevent abuse or overload.", "To charge users based on their usage.", "To test the API's performance."],
        correctAnswerIndex: 1,
        explanation: "Rate limiting is a crucial technique for protecting your backend services. It prevents single users (or bots) from overwhelming your system with too many requests in a short period, ensuring fair usage and high availability for all users."
    },
    {
        question: "What is a `Dockerfile`?",
        answers: ["A log file generated by Docker.", "A script composed of instructions for building a Docker image.", "A configuration file for Kubernetes.", "A security certificate for a container."],
        correctAnswerIndex: 1,
        explanation: "A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. `docker build` uses this file to automate the process of creating a container image."
    },
    {
        question: "In database terms, what is 'replication'?",
        answers: ["Splitting a database into multiple parts.", "The process of copying and maintaining database objects in multiple databases that make up a distributed database system.", "Deleting duplicate rows from a table.", "Running multiple queries at the same time."],
        correctAnswerIndex: 1,
        explanation: "Replication is used to improve availability and read performance. A primary database handles writes, and its data is copied (replicated) to one or more replica databases. Read requests can then be distributed among the replicas."
    },
    {
        question: "What is GraphQL?",
        answers: ["A new type of SQL database.", "A graph visualization tool.", "A query language for APIs and a runtime for fulfilling those queries with your existing data.", "A JavaScript charting library."],
        correctAnswerIndex: 2,
        explanation: "Unlike REST, which has fixed endpoints, GraphQL allows clients to request exactly the data they need and nothing more. This can reduce the number of API calls and the amount of data transferred over the network."
    },
    {
        question: "What is the 'Principle of Least Privilege' in security?",
        answers: ["Giving users the most permissions possible.", "The idea that any user, program, or process should have only the minimum privileges necessary to perform its function.", "A principle of database design.", "A method for fast code deployment."],
        correctAnswerIndex: 1,
        explanation: "This security best practice minimizes the 'attack surface' of an application. If a component is compromised, the principle of least privilege limits the damage the attacker can do."
    },
    {
        question: "What is 'TDD' (Test-Driven Development)?",
        answers: ["A process where you write the test *before* you write the application code that passes the test.", "A process where you test your code only after it's deployed.", "A type of security testing.", "A tool for measuring code performance."],
        correctAnswerIndex: 0,
        explanation: "TDD follows a short, repetitive cycle: write a failing test, write the minimum code to make the test pass, and then refactor the code. This often leads to better code design and more comprehensive test coverage."
    },
    {
        question: "What is a 'stateless' application?",
        answers: ["An application that cannot be deployed to a server.", "An application that does not save client data generated in one session for use in the next session with that client.", "An application with no user interface.", "An application that uses a NoSQL database."],
        correctAnswerIndex: 1,
        explanation: "In a stateless architecture, each request from a client to the server must contain all the information needed to understand and complete the request. This design simplifies scaling because any server can handle any request."
    },
    {
        question: "What is a 'CDN' (Content Delivery Network)?",
        answers: ["A type of database.", "A geographically distributed group of servers that work together to provide fast delivery of Internet content.", "A tool for continuous integration.", "A backend programming language."],
        correctAnswerIndex: 1,
        explanation: "A CDN caches static content (like images, CSS, and JavaScript files) in servers located close to end-users. When a user requests the content, it's served from the nearest server, which significantly reduces load times."
    },
    {
        question: "Which HTTP status code range indicates a client-side error?",
        answers: ["1xx", "2xx", "4xx", "5xx"],
        correctAnswerIndex: 2,
        explanation: "4xx status codes (e.g., 400 Bad Request, 401 Unauthorized, 404 Not Found) indicate that there was an error with the client's request. 5xx codes (e.g., 500 Internal Server Error) indicate a server-side problem."
    },
    {
        question: "What is 'middleware' in the context of a web framework like Express.js?",
        answers: ["Software that connects the frontend to the backend.", "Functions that have access to the request object, the response object, and the next function in the application’s request-response cycle.", "A type of database.", "Hardware that sits between the client and server."],
        correctAnswerIndex: 1,
        explanation: "Middleware functions are like a chain of processing steps. They can execute code, make changes to the request and response objects, end the cycle, or call the next middleware in the stack. They are used for logging, authentication, parsing data, and more."
    },
    {
        question: "What is a 'race to the bottom' in terms of database indexing?",
        answers: ["A competition to have the smallest database.", "A scenario where adding too many indexes slows down write performance more than it speeds up read performance.", "A database with no indexes.", "A security flaw in database indexing."],
        correctAnswerIndex: 1,
        explanation: "While indexes speed up reads, they slow down writes (INSERT, UPDATE, DELETE) because the index itself must also be updated. Adding indexes for every possible query can degrade overall performance, especially in write-heavy applications."
    },
    {
        question: "What is 'serverless' computing (e.g., AWS Lambda)?",
        answers: ["Running a backend without any servers.", "A cloud computing model where the cloud provider dynamically manages the allocation of machine resources.", "A frontend development paradigm.", "A way to run applications entirely in the browser."],
        correctAnswerIndex: 1,
        explanation: "Serverless doesn't mean there are no servers; it means developers don't have to manage them. You write functions, and the cloud provider runs them on demand, automatically scaling them and charging only for the time they are running."
    },
    {
        question: "What is the purpose of 'code coverage' metrics?",
        answers: ["To measure the speed of the code.", "To describe the degree to which the source code of a program is executed when a particular test suite runs.", "To count the number of lines of code.", "To analyze the complexity of the code."],
        correctAnswerIndex: 1,
        explanation: "Code coverage (e.g., 85%) tells you what percentage of your code is exercised by your tests. While 100% coverage doesn't guarantee a bug-free application, low coverage is a clear sign that parts of your application are untested."
    },
    {
        question: "What is 'dependency injection'?",
        answers: ["A way to install project dependencies like libraries.", "A design pattern in which an object receives other objects that it depends on, rather than creating them itself.", "A security vulnerability.", "A method for injecting SQL code into a query."],
        correctAnswerIndex: 1,
        explanation: "Dependency Injection promotes loose coupling between components. Instead of a component creating its own dependencies (e.g., a logger or a database connection), they are 'injected' from an external source. This makes code more modular, testable, and maintainable."
    },
    {
        question: "What is a 'Blue-Green' deployment strategy?",
        answers: ["A strategy of deploying code at night.", "A release strategy that involves two identical production environments, 'Blue' and 'Green'.", "A strategy for A/B testing user interfaces.", "A method for deploying to two different cloud providers."],
        correctAnswerIndex: 1,
        explanation: "In a Blue-Green deployment, one environment ('Blue') is live, and the new version is deployed to the identical 'Green' environment. Traffic is then switched from Blue to Green. This allows for instant, zero-downtime rollbacks by simply switching traffic back to Blue if an issue occurs."
    },
    {
        question: "What is the primary key in a SQL table?",
        answers: ["A key used for encryption.", "The first column in the table.", "A constraint that uniquely identifies each record in a table.", "A key that links to another table."],
        correctAnswerIndex: 2,
        explanation: "A primary key must contain unique values and cannot contain NULL values. It is the main way to identify any given row within a table, ensuring data integrity."
    },
    {
        question: "What does the HTTP 'PATCH' method typically do?",
        answers: ["Creates a new resource.", "Deletes a resource.", "Applies partial modifications to a resource.", "Replaces an entire resource with new data."],
        correctAnswerIndex: 2,
        explanation: "While PUT is used to completely replace a resource, PATCH is used for making partial updates. For example, you would use PATCH to update only a user's email address without sending their entire user profile."
    },
    {
        question: "What is a 'memory leak' in an application?",
        answers: ["A security flaw where memory can be read by an attacker.", "A type of memory that is very fast.", "A failure in a program to release memory that is no longer needed.", "A hardware defect in a RAM stick."],
        correctAnswerIndex: 2,
        explanation: "A memory leak occurs when a program allocates memory but loses the ability to access it, yet the memory is not returned to the pool of free memory. Over time, this can consume all available memory and crash the application or the entire system."
    },
    {
        question: "In the context of APIs, what is 'pagination'?",
        answers: ["Numbering the pages of API documentation.", "The process of dividing a large set of data into smaller, discrete pages.", "A way to version an API.", "A method for displaying data in a table."],
        correctAnswerIndex: 1,
        explanation: "If a query could return thousands of results, sending them all at once would be slow and inefficient. Pagination allows the client to request data one 'page' at a time (e.g., 'give me results 1-20', then 'give me results 21-40')."
    },
    {
        question: "What is Base64 encoding used for?",
        answers: ["To encrypt data so it cannot be read.", "To represent binary data in an ASCII string format.", "To compress data to make it smaller.", "To hash passwords securely."],
        correctAnswerIndex: 1,
        explanation: "Base64 is an encoding scheme, not an encryption scheme. It's used to safely transmit binary data (like images or files) over media that are designed to handle only text. The encoded data is readable but not human-readable."
    },
    {
        question: "What is 'long polling'?",
        answers: ["A very slow HTTP request.", "A technique where the server holds a client's request open until new data is available to send back.", "A way to query large database tables.", "A deprecated form of API design."],
        correctAnswerIndex: 1,
        explanation: "Long polling is a way to simulate a 'push' from the server. Instead of the client repeatedly asking 'is there new data yet?', it makes one request, and the server waits to respond until it has an update. It's a predecessor to technologies like WebSockets."
    },
    {
        question: "What is the purpose of the 'finally' block in a try-catch-finally statement?",
        answers: ["It executes only if an exception is caught.", "It executes only if no exception is caught.", "It always executes after the try and catch blocks, regardless of whether an exception was thrown.", "It is an alternative to the 'catch' block."],
        correctAnswerIndex: 2,
        explanation: "The 'finally' block is used for cleanup code that must always be executed, such as closing a file or releasing a database connection, ensuring that resources are not left open even if an error occurs."
    },
    {
        question: "What does it mean for a system to be 'fault-tolerant'?",
        answers: ["The system has no bugs.", "The system can continue operating, possibly at a reduced level, in the event of a failure of one or more of its components.", "The system is immune to security attacks.", "The system can predict when a failure will occur."],
        correctAnswerIndex: 1,
        explanation: "Fault tolerance is a key aspect of high availability. It is achieved through redundancy, such as having backup servers, load balancers, and replicated databases, so that the failure of one component doesn't bring down the entire system."
    },
    {
        question: "What is 'database normalization'?",
        answers: ["Making a database run at a normal speed.", "The process of organizing columns and tables in a relational database to minimize data redundancy.", "A technique for backing up a database.", "Encrypting a database."],
        correctAnswerIndex: 1,
        explanation: "Normalization involves dividing larger tables into smaller, well-structured tables and defining relationships between them. The goal is to reduce redundant data and improve data integrity."
    },
    {
        question: "What is a 'Canary' deployment?",
        answers: ["A deployment that uses a yellow user interface.", "A technique to reduce the risk of introducing a new software version in production by slowly rolling out the change to a small subset of users.", "Deploying code to a test environment named 'Canary'.", "A deployment that is loud and easy to notice."],
        correctAnswerIndex: 1,
        explanation: "Like a 'canary in a coal mine', this strategy exposes a new version to a small percentage of production traffic. You can monitor its performance and error rates, and if it's stable, you gradually roll it out to the rest of the users."
    },
    {
        question: "What is the 'Observer' design pattern?",
        answers: ["A pattern for monitoring server performance.", "A behavioral pattern where an object (the subject) maintains a list of its dependents (observers) and notifies them automatically of any state changes.", "A pattern for creating secure objects.", "A pattern for observing user behavior on a website."],
        correctAnswerIndex: 1,
        explanation: "The Observer pattern is key to event-driven programming. When the subject's state changes, it doesn't need to know who is interested; it just broadcasts a notification, and all subscribed observers react accordingly. This promotes loose coupling."
    },
    {
        question: "What distinguishes a 'PUT' request from a 'POST' request in REST?",
        answers: ["PUT is for updating, POST is for creating.", "PUT is idempotent; POST is not.", "PUT requires a full resource representation; POST can create a resource with partial data.", "All of the above are typical distinctions."],
        correctAnswerIndex: 3,
        explanation: "While both can be used for creating/updating, the key difference is idempotency. PUT is idempotent: sending the same PUT request multiple times will always have the same result. POST is not; sending the same POST request multiple times will typically create multiple new resources."
    },
    {
        question: "What is a 'foreign key' in a SQL database?",
        answers: ["A key from a different country's database.", "A key used to link two tables together.", "A key that is not the primary key.", "An encrypted key."],
        correctAnswerIndex: 1,
        explanation: "A foreign key is a field (or collection of fields) in one table that uniquely identifies a row of another table. It is used to establish and enforce a link between the data in two tables."
    },
    {
        question: "What is a 'mutex' (mutual exclusion)?",
        answers: ["A type of database query.", "A programming primitive that provides exclusive access to a shared resource.", "A security vulnerability.", "A way to run code in parallel."],
        correctAnswerIndex: 1,
        explanation: "A mutex is a locking mechanism used to prevent race conditions. When a thread acquires a mutex's lock, no other thread can acquire it until the first thread releases it. This ensures that only one thread can access a critical section of code at a time."
    },
    {
        question: "What is the goal of a 'smoke test'?",
        answers: ["To test the fire alarm system in the data center.", "A preliminary test to reveal simple failures severe enough to reject a prospective software release.", "A comprehensive test of all features.", "A test of the application's user interface."],
        correctAnswerIndex: 1,
        explanation: "A smoke test is a quick, broad test of the most crucial functionality of a piece of software. If the smoke test fails, there's no point in running more in-depth tests; the build is considered unstable."
    },
    {
        question: "What is the 'Same-Origin Policy' in web browsers?",
        answers: ["A policy that all web content must come from the same server.", "A security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin.", "A design guideline for making websites look consistent.", "A policy related to content caching."],
        correctAnswerIndex: 1,
        explanation: "This is a critical security concept in browsers. It prevents a malicious script on one page from obtaining sensitive data from another web page through that page's DOM. CORS is the mechanism for relaxing this policy when needed."
    },
    {
        question: "What is 'graceful degradation'?",
        answers: ["A design philosophy where you build for the latest browsers first, then ensure it works in older ones.", "The ability of a system to maintain limited functionality even when a large portion of it has been destroyed or is not functioning.", "A way to slowly shut down a server.", "A technique for reducing code quality over time."],
        correctAnswerIndex: 1,
        explanation: "Graceful degradation is a key part of fault tolerance. For example, if a recommendation service goes down, the e-commerce site should still allow users to browse and buy products, even if it can't show personalized recommendations."
    },
    {
        question: "What is a 'cookie' in the context of HTTP?",
        answers: ["A small piece of data sent from a website and stored on the user's computer by the user's web browser.", "A type of tracking pixel.", "A server-side session store.", "A small JavaScript file."],
        correctAnswerIndex: 0,
        explanation: "Cookies are used to maintain state in the otherwise stateless HTTP protocol. They are commonly used for managing user sessions, storing user preferences, and tracking user behavior."
    },
    {
        question: "In system design, what is 'throughput'?",
        answers: ["The latency of a single request.", "The number of requests a system can handle in a given time period.", "The physical size of the server.", "The amount of data a system can store."],
        correctAnswerIndex: 1,
        explanation: "Throughput, often measured in requests per second (RPS) or transactions per second (TPS), is a key metric for measuring the performance and capacity of a backend system."
    },
    {
        question: "What is a 'data warehouse'?",
        answers: ["A very large database.", "A system used for reporting and data analysis, considered a core component of business intelligence.", "A backup system for a production database.", "A physical building where data is stored."],
        correctAnswerIndex: 1,
        explanation: "Unlike a standard (OLTP) database designed for transactions, a data warehouse (OLAP) is optimized for querying and analyzing large amounts of historical data from various sources."
    },
    {
        question: "What is a 'zombie process' on a UNIX-like operating system?",
        answers: ["A process that is malicious.", "A process that has completed execution but still has an entry in the process table.", "A process that cannot be started.", "A process that consumes 100% CPU."],
        correctAnswerIndex: 1,
        explanation: "This entry is needed to allow the parent process to read its child's exit status. If the parent doesn't 'reap' the zombie, it will remain in the process table, though it consumes very few resources."
    },
    // Adding more questions to reach 100
    {
        question: "What is the purpose of the `git rebase` command?",
        answers: ["To merge two branches together, creating a merge commit.", "To reapply commits from one branch onto another branch, creating a linear history.", "To delete a branch.", "To create a backup of the repository."],
        correctAnswerIndex: 1,
        explanation: "`git rebase` is an alternative to `git merge`. It rewrites the commit history to create a clean, linear sequence of commits, which can be easier to read and understand than a history with many merge commits."
    },
    {
        question: "What is 'big-O' notation used for?",
        answers: ["To describe the exact runtime of an algorithm.", "To describe the limiting behavior of a function when the argument tends towards a particular value or infinity (algorithmic complexity).", "To document large and complex functions.", "To measure the memory usage of a program."],
        correctAnswerIndex: 1,
        explanation: "Big-O notation gives us a high-level understanding of an algorithm's efficiency. It describes how the runtime or space requirements grow as the input size grows, allowing us to compare algorithms like O(n), O(log n), or O(n^2)."
    },
    {
        question: "What is a 'DNS' (Domain Name System) server's primary job?",
        answers: ["To host websites.", "To send emails.", "To translate human-readable domain names (e.g., www.google.com) into machine-readable IP addresses (e.g., 172.217.14.228).", "To secure network traffic."],
        correctAnswerIndex: 2,
        explanation: "DNS is often called the 'phonebook of the Internet'. Without it, we would have to remember the IP addresses of all the websites we want to visit. It's a fundamental part of how the internet works."
    },
    {
        question: "What is a 'connection pool' in the context of databases?",
        answers: ["A list of all users connected to the database.", "A cache of database connections maintained so that the connections can be reused when future requests to the database are required.", "A tool to monitor database performance.", "A type of database backup."],
        correctAnswerIndex: 1,
        explanation: "Establishing a database connection can be a slow process. A connection pool pre-creates and maintains a number of connections. When the application needs a connection, it gets one from the pool, uses it, and then returns it, which is much faster than creating a new one each time."
    },
    {
        question: "What is a 'sidecar' pattern in container-based architecture?",
        answers: ["Running two identical containers for redundancy.", "A pattern where a secondary container runs alongside the main application container to provide supporting features.", "A way to connect containers on different hosts.", "A security pattern for isolating containers."],
        correctAnswerIndex: 1,
        explanation: "The sidecar pattern is used to add functionality to an existing container without changing it. Common uses for sidecars include logging, monitoring, or acting as a proxy. The sidecar shares the same lifecycle and network space as the main container."
    },
    {
        question: "Which of these is a common use for a 'hash table' data structure?",
        answers: ["To store data in a sorted order.", "To implement caches or look-up tables for fast key-based data retrieval.", "To represent hierarchical data like a file system.", "To create a first-in, first-out (FIFO) queue."],
        correctAnswerIndex: 1,
        explanation: "A hash table (or hash map) offers average O(1) time complexity for insertions, deletions, and look-ups, making it extremely efficient for any task that involves frequent key-based data access."
    },
    {
        question: "What is 'ETL' in the context of data engineering?",
        answers: ["A software testing methodology.", "Stands for Extract, Transform, Load - a process for moving data from a source to a data warehouse.", "A network protocol.", "A type of data encryption."],
        correctAnswerIndex: 1,
        explanation: "ETL is a three-phase process: data is extracted from a source system (like a production database), transformed into the proper format or structure for analysis, and then loaded into the final target (like a data warehouse)."
    },
    {
        question: "What does a `502 Bad Gateway` error typically indicate?",
        answers: ["The client sent a bad request.", "The requested resource was not found.", "The server, while acting as a gateway or proxy, received an invalid response from an upstream server.", "The service is temporarily unavailable."],
        correctAnswerIndex: 2,
        explanation: "This server-side error means that one server on the internet received an invalid response from another server. It's often caused by a problem between servers on the network, such as a proxy, a load balancer, or an upstream application server being down."
    },
    {
        question: "What is a 'distributed lock'?",
        answers: ["A lock that is physically distributed across multiple locations.", "A mechanism to ensure that only one process can access a resource at a time in a distributed system environment.", "A security feature for distributed databases.", "A way to lock down an entire network."],
        correctAnswerIndex: 1,
        explanation: "While a mutex works for threads in a single process, a distributed lock is needed when multiple processes on different machines need to coordinate access to a shared resource. They are often implemented using tools like Redis or ZooKeeper."
    },
    {
        question: "What is 'backpressure' in a data streaming system?",
        answers: ["A security mechanism to prevent data leaks.", "A mechanism that allows a system to resist overload by pushing back against a data source.", "The pressure of data moving backwards in a stream.", "A way to compress streaming data."],
        correctAnswerIndex: 1,
        explanation: "If a fast data producer is sending data to a slower consumer, the consumer can get overwhelmed. Backpressure is a way for the slow consumer to signal to the producer to slow down, preventing buffer overflows and system crashes."
    },
    {
        question: "What is the purpose of a 'health check' endpoint in a microservice?",
        answers: ["To provide performance metrics of the service.", "To allow an orchestrator (like Kubernetes) or a load balancer to determine if the service instance is running and able to handle traffic.", "To check for security vulnerabilities.", "To provide documentation for the service."],
        correctAnswerIndex: 1,
        explanation: "Health check endpoints (e.g., `/healthz` or `/status`) are crucial for automated systems. If a service instance fails its health check, the load balancer will stop sending it traffic, and an orchestrator can automatically restart it."
    },
    {
        question: "What is the 'idempotency key' pattern in APIs?",
        answers: ["A key used to encrypt the entire API.", "A unique key, provided by the client, that the server uses to recognize and de-duplicate subsequent retries of the same request.", "A primary key for an API resource.", "A key that grants access to the API."],
        correctAnswerIndex: 1,
        explanation: "Network errors can cause a client to retry a request (e.g., a payment request). By sending an `Idempotency-Key` in the header, the client can ensure that even if the request is received multiple times, the operation (like charging a credit card) is only performed once."
    },
    {
        question: "What is 'eventual consistency'?",
        answers: ["A consistency model where the system is always consistent.", "A consistency model which guarantees that, if no new updates are made to a given data item, all accesses to that item will eventually return the last updated value.", "A model where consistency is not guaranteed.", "A system that will eventually crash."],
        correctAnswerIndex: 1,
        explanation: "In many large-scale distributed systems (especially NoSQL databases), achieving immediate consistency after a write is difficult. Eventual consistency is a trade-off that allows for higher availability and performance, with the understanding that data might be briefly stale across replicas."
    },
    {
        question: "What is the 'circuit breaker' design pattern?",
        answers: ["A pattern to secure an application from electrical surges.", "A pattern used to detect failures and prevent a failing service from being constantly queried.", "A deployment pattern.", "A logging pattern."],
        correctAnswerIndex: 1,
        explanation: "If a microservice repeatedly fails to respond, a circuit breaker can 'trip' and stop sending requests to it for a period of time. This prevents the client from wasting resources on failing requests and gives the failing service time to recover."
    },
    {
        question: "What does 'SLA' (Service-Level Agreement) define?",
        answers: ["The programming language used for a service.", "A commitment between a service provider and a client regarding aspects like uptime, availability, and responsibilities.", "A list of API endpoints.", "The security protocols for a service."],
        correctAnswerIndex: 1,
        explanation: "An SLA is a formal contract. For example, a cloud provider might offer a 99.99% uptime SLA, meaning they guarantee the service will be available that percentage of the time, and will provide credits if they fail to meet that target."
    },
    {
        question: "What is 'data serialization'?",
        answers: ["Organizing data in a series.", "The process of converting a data structure or object state into a format that can be stored or transmitted and reconstructed later.", "A way to secure data.", "A type of database indexing."],
        correctAnswerIndex: 1,
        explanation: "Serialization is essential for communication and persistence. Formats like JSON, XML, or Protocol Buffers are used to serialize data so it can be sent over a network (e.g., in an API call) or saved to a file."
    },
    {
        question: "What is the primary function of a 'constructor' in an object-oriented class?",
        answers: ["To destroy an object.", "To create a copy of an object.", "A special method for creating and initializing an object instance of that class.", "To define the class's methods."],
        correctAnswerIndex: 2,
        explanation: "When you create a new instance of a class (e.g., `new User()`), the constructor method is called. It's responsible for setting up the initial state of the object, such as assigning values to its properties."
    },
    {
        question: "What is 'garbage collection' in programming languages like Java or Go?",
        answers: ["A manual process of deleting unused files.", "A form of automatic memory management where the garbage collector attempts to reclaim memory occupied by objects that are no longer in use by the program.", "A tool for cleaning up databases.", "A way to optimize code."],
        correctAnswerIndex: 1,
        explanation: "In languages without automatic garbage collection (like C/C++), the programmer is responsible for manually deallocating memory. Garbage collection simplifies development by automating this process, but it can introduce small, unpredictable pauses in application performance."
    },
    {
        question: "What is a 'deadlock' in concurrent programming?",
        answers: ["A situation where a process is terminated.", "A situation where two or more competing actions are each waiting for the other to finish, and thus neither ever does.", "A process that is not responding.", "A hardware failure."],
        correctAnswerIndex: 1,
        explanation: "A classic example of a deadlock is when Thread A locks Resource 1 and waits for Resource 2, while Thread B has locked Resource 2 and is waiting for Resource 1. Neither can proceed, and they are stuck indefinitely."
    },
    {
        question: "What is the purpose of an 'abstract class' in object-oriented programming?",
        answers: ["A class that cannot be instantiated and is meant to be subclassed.", "A class that has no methods.", "A class that is not concrete or well-defined.", "A class that can only have one instance."],
        correctAnswerIndex: 0,
        explanation: "Abstract classes serve as blueprints for other classes. They can define methods that subclasses must implement, as well as provide common functionality that subclasses can inherit, enforcing a certain structure and reducing code duplication."
    }
];

    // --- DOM Elements ---
    const quizBody = document.getElementById('quiz-body');
    const currentScoreEl = document.getElementById('current-score');
    const totalQuestionsEl = document.getElementById('total-questions');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const questionCounterEl = document.getElementById('question-counter');

    // --- State ---
    let score = parseInt(localStorage.getItem('quizScore')) || 0;
    let currentQuestionIndex = parseInt(localStorage.getItem('currentQuestionIndex')) || 0;
    const questionElements = []; // Array to hold the question card DOM elements

    // --- Main Initializer ---
    function initializeQuiz() {
        totalQuestionsEl.textContent = quizQuestions.length;
        currentScoreEl.textContent = score;
        quizBody.innerHTML = '';

        // Create all question cards and add them to the DOM (initially hidden)
        createQuestionCards();

        // Add event listeners
        quizBody.addEventListener('click', handleQuizBodyClick);
        nextBtn.addEventListener('click', showNextQuestion);
        prevBtn.addEventListener('click', showPreviousQuestion);

        // Display the current question
        displayCurrentQuestion();

        // Restore answered questions from localStorage
        restoreAnsweredQuestions();
    }

    function createQuestionCards() {
        quizQuestions.forEach((q, index) => {
            const questionCard = document.createElement('div');
            questionCard.className = 'question-card';
            questionCard.dataset.questionId = index;

            const answersHtml = q.answers.map((answer, i) => `
                <div class="answer">
                    <input type="radio" id="q${index}-a${i}" name="question-${index}" value="${i}">
                    <label for="q${index}-a${i}">${answer}</label>
                </div>
            `).join('');

            questionCard.innerHTML = `
                <h2>Q${index + 1}: ${q.question}</h2>
                <div class="answers">${answersHtml}</div>
                <div class="actions">
                    <button class="check-btn">Check Answer</button>
                    <button class="explain-btn" style="display: none;">💡 Explain</button>
                    <p class="feedback"></p>
                </div>
                <div class="explanation-text">
                    ${q.explanation}
                </div>
            `;
            questionElements.push(questionCard);
            quizBody.appendChild(questionCard);
        });
    }

    function restoreAnsweredQuestions() {
        const answeredQuestions = JSON.parse(localStorage.getItem('answeredQuestions')) || {};
        
        Object.keys(answeredQuestions).forEach(questionId => {
            const card = questionElements[questionId];
            if (!card) return;
            
            const answerData = answeredQuestions[questionId];
            const { userAnswerIndex, correctAnswerIndex } = answerData;
            
            // Mark the radio button as checked if the user had selected an answer
            if (userAnswerIndex !== null) {
                const radioInput = card.querySelector(`input[type="radio"][value="${userAnswerIndex}"]`);
                if (radioInput) radioInput.checked = true;
            }
            
            // Disable all radio inputs and show feedback if the question was answered
            card.querySelectorAll('input[type="radio"]').forEach(input => input.disabled = true);
            const checkBtn = card.querySelector('.check-btn');
            const explainBtn = card.querySelector('.explain-btn');
            const feedbackEl = card.querySelector('.feedback');
            const allLabels = card.querySelectorAll('.answer label');
            
            if (answerData.isCorrect) {
                allLabels[userAnswerIndex].classList.add('correct');
                feedbackEl.textContent = "Correct!";
                feedbackEl.className = 'feedback correct';
                card.classList.add('answered-correct');
            } else {
                allLabels[userAnswerIndex].classList.add('incorrect');
                allLabels[correctAnswerIndex].classList.add('correct');
                feedbackEl.textContent = "Incorrect.";
                feedbackEl.className = 'feedback incorrect';
                card.classList.add('answered-incorrect');
            }
            
            checkBtn.style.display = 'none';
            explainBtn.style.display = 'inline-flex';
            feedbackEl.style.display = 'flex';
        });
    }

    function displayCurrentQuestion() {
        questionElements.forEach(card => card.classList.remove('active'));
        questionElements[currentQuestionIndex].classList.add('active');

        questionCounterEl.textContent = `Question ${currentQuestionIndex + 1} / ${quizQuestions.length}`;
        prevBtn.disabled = currentQuestionIndex === 0;
        nextBtn.disabled = currentQuestionIndex === questionElements.length - 1;

        // Save current question index to localStorage
        localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
    }

    function checkAnswer(card) {
        const questionId = parseInt(card.dataset.questionId);
        if (card.classList.contains('answered-correct') || card.classList.contains('answered-incorrect')) {
            return; // Already answered
        }

        const selectedRadio = card.querySelector('input[type="radio"]:checked');
        const feedbackEl = card.querySelector('.feedback');
        const checkBtn = card.querySelector('.check-btn');
        const explainBtn = card.querySelector('.explain-btn');

        if (!selectedRadio) {
            feedbackEl.textContent = "Please select an answer first!";
            feedbackEl.className = 'feedback incorrect';
            feedbackEl.style.display = 'flex';
            setTimeout(() => { feedbackEl.style.display = 'none'; }, 2000);
            return;
        }
        
        const userAnswerIndex = parseInt(selectedRadio.value);
        const correctAnswerIndex = quizQuestions[questionId].correctAnswerIndex;
        const allLabels = card.querySelectorAll('.answer label');
        
        card.querySelectorAll('input[type="radio"]').forEach(input => input.disabled = true);
        checkBtn.style.display = 'none';
        explainBtn.style.display = 'inline-flex';
        feedbackEl.style.display = 'flex';

        const isCorrect = userAnswerIndex === correctAnswerIndex;
        
        if (isCorrect) {
            score++;
            currentScoreEl.textContent = score;
            allLabels[userAnswerIndex].classList.add('correct');
            feedbackEl.textContent = "Correct!";
            feedbackEl.className = 'feedback correct';
            card.classList.add('answered-correct');
        } else {
            allLabels[userAnswerIndex].classList.add('incorrect');
            allLabels[correctAnswerIndex].classList.add('correct');
            feedbackEl.textContent = "Incorrect.";
            feedbackEl.className = 'feedback incorrect';
            card.classList.add('answered-incorrect');
        }

        // Save the answer to localStorage
        saveAnsweredQuestion(questionId, userAnswerIndex, correctAnswerIndex, isCorrect);
        // Save the current score
        localStorage.setItem('quizScore', score);
    }

    function saveAnsweredQuestion(questionId, userAnswerIndex, correctAnswerIndex, isCorrect) {
        const answeredQuestions = JSON.parse(localStorage.getItem('answeredQuestions')) || {};
        answeredQuestions[questionId] = {
            userAnswerIndex,
            correctAnswerIndex,
            isCorrect
        };
        localStorage.setItem('answeredQuestions', JSON.stringify(answeredQuestions));
    }

    function toggleExplanation(button) {
        const card = button.closest('.question-card');
        const explanationDiv = card.querySelector('.explanation-text');
        
        const isVisible = explanationDiv.classList.toggle('visible');
        button.innerHTML = isVisible ? '💡 Hide Explanation' : '💡 Explain';
    }

    // --- Event Handlers ---
    function handleQuizBodyClick(e) {
        if (e.target.classList.contains('check-btn')) {
            checkAnswer(e.target.closest('.question-card'));
        }
        if (e.target.classList.contains('explain-btn')) {
            toggleExplanation(e.target);
        }
    }

    function showNextQuestion() {
        if (currentQuestionIndex < questionElements.length - 1) {
            currentQuestionIndex++;
            displayCurrentQuestion();
        }
    }

    function showPreviousQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayCurrentQuestion();
        }
    }
    
    document.getElementById('reset-btn').addEventListener('click', () => {
        localStorage.removeItem('quizScore');
        localStorage.removeItem('currentQuestionIndex');
        localStorage.removeItem('answeredQuestions');
        location.reload();
    });
    // --- Start the Quiz ---
    initializeQuiz();
});