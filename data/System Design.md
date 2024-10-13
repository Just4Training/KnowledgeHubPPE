# System Design
## System Design Template
1. Requirement analysis
2. API
3. structure
4. Dive deep

## Key Concept
### Scaling
Work Distribution: The first challenge of horizontal scaling is getting the work to the right machine. This is often done via a load balancer

- Round-robin
- Queueing System

Data Distribution: Sharding
Consistency

Amazon Elastic Container Service (ECS) is a fully managed container orchestration service that helps you to more efficiently deploy, manage, and scale containerized applications. [AWS ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html)
### Locking: 
Locking is the process of ensuring that only one client can access a shared resource at a time.
- Pessimistic Locking: database is directly utilized to lock a specific ticket row, ensuring exclusive access to the first user trying to book it. Done by *SELECT FOR UPDATE* SQL.
- Status & Expiration Time with Cron: adding a status field and expiration time on the ticket table.
- Distributed Lock with TTL: use a key-value store to store a lock and then use the atomicity of the key-value store to ensure that only one process can acquire the lock at a time.

#### Distributed Locks
1. **Locking Mechanisms:** There are different ways to implement distributed locks. One common implementation uses Redis and is called **Redlock**. Redlock uses multiple Redis instances to ensure that a lock is acquired and released in a safe and consistent manner.
2. **Lock Expiry:** Distributed locks can be set to expire after a certain amount of time. This is important for ensuring that locks don't get stuck in a locked state if a process crashes or is killed.
3. **Locking Granularity:** Distributed locks can be used to lock a single resource or a group of resources. For example, you might want to lock a single ticket in a ticketing system or you might want to lock a group of tickets in a section of a stadium.
4. **Deadlocks:** Deadlocks can occur when two or more processes are waiting for each other to release a lock. 

Communication Protocols: Websockets are necessary if you need realtime, bidirectional communication between the client and the server
Security

Good reference for System Design interviews
- [Hello Interview](https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction)
- [Postman API Design](https://blog.postman.com/what-is-caching/)

## Redis
- Redis is a **single thread, in-memory** data structure **server**.
- The core structure underneath Redis is a key-value store.

### Redis Data Structures
- Strings
- Hashes (Objects)
- Lists
- Sets
- Sorted Sets (Priority Queues)
- Bloom Filters
- Geospatial Indexes
- Time Series

Redis can run as a single node, with a high availability (HA) replica, or as a cluster.

### Redis as a Cache
![Redis as Cache](https://d248djf5mc6iku.cloudfront.net/excalidraw/03fba3a54a617b9dae9cf4ea8edfb691)
### Redis as Rate Limiting
Situation: Redis limits access to expensive service
How: 
1. INCR the key,
2. Set EXPIRE time for key
### Redis for event sourcing
The basic idea behind Redis streams is that we want to durably add items to a log and then have a distributed mechanism for consuming items from these logs.
![Redis as Stream](https://d248djf5mc6iku.cloudfront.net/excalidraw/f52b1452c753d9cfd127d58bfd1792c1)

### Kafka
**Apache Kafka** is an open-source distributed event streaming platform that can be used either as a **message queue** or as a **stream processing system**.

One of the fundamental ideas behind Kafka: messages sent and received through Kafka require a user specified distribution strategy (partitioning).

A message consists of one required field, the value, and three optional fields: a key, a timestamp, and headers.

![Kafka Message](https://d248djf5mc6iku.cloudfront.net/excalidraw/ea72a3302bc0beca8e45c13c70b04b10)

## API Design
API components:
- Methods: GET, POST, UPDATE, DELETE, LIST
- URI
- REQUEST HEAD
- REQUEST BODY

### Restful API
**REST architectural style**
- **Uniform interface**: 
- **Statelessness**: Each request is independent
- **Layered system**:
- **Cacheability**
- **Code on demand**

#### RESTful API Authentication methods
- HTTP Authentication
    - Basic authentication (Base64)
    - Bearer authentication (Token)
- API keys
- OAuth (Combines password and tokens)

reference: [AWS -> REST API](https://aws.amazon.com/what-is/restful-api/)

### API Gateway
API Gateway handles all the tasks involved in accepting and processing up to hundreds of thousands of concurrent API calls, including traffic management, CORS support, authorization and access control, throttling, monitoring, and API version management.

For example, if the sytem receives a request to GET /users/123, the API gateway would route that request to the users service and return the response to the client.

![API Gateway](https://d248djf5mc6iku.cloudfront.net/excalidraw/4b201e3dd46821c1b73b389c548b54c4)

### Open API
![OPEN API](https://www.openapis.org/wp-content/uploads/sites/3/2023/05/What-is-OpenAPI-Simple-API-Lifecycle-Vertical.png)

#### prefetching, prerendering, and service worker precaching
#### Lazy load

## Load Balancer

## Queue
1. **Message Ordering:** Most queues are FIFO (first in, first out), meaning that messages are processed in the order they were received. However, some queues (like Kafka) allow for more complex ordering guarantees, such as ordering based on a specified priority or time.
2. **Retry Mechanisms:** Many queues have built-in retry mechanisms that attempt to re-deliver a message a certain number of times before considering it a failure. You can configure retries, including the delay between attempts, and the maximum number of attempts.
3. **Dead Letter Queues:** Dead letter queues are used to store messages that cannot be processed. They're useful for **debugging** and **auditing**, as it allows you to inspect messages that failed to be processed and understand why they failed.
4. **Scaling with Partitions:** Queues can be partitioned across multiple servers so that they can scale to handle more messages. Each partition can be processed by a different set of workers. Just like databases, you will need to specify **a partition key** to ensure that related messages are stored in the same partition.
5. **Backpressure:** Backpressure is a way of slowing down the production of messages when the queue is overwhelmed. This helps prevent the queue from becoming a bottleneck in your system. For example, if a queue is full, you might want to reject new messages or slow down the rate at which new messages are accepted, potentially returning an error to the user or producer.

### AWS SQS
[Amazon Simple Queue Service](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)

## Streaming / Event Sourcing
Event sourcing is a technique where changes in application state are stored as a sequence of events. These events can be replayed to reconstruct the application's state at any point in time, making it an effective strategy for systems that require a detailed audit trail or the ability to reverse or replay transactions.

1. **Scaling with Partitioning:** In order to scale streams, they can be partitioned across multiple servers. Each partition can be processed by a different consumer, allowing for horizontal scaling. Just like databases, you will need to specify a partition key to ensure that related events are stored in the same partition.
2. **Multiple Consumer Groups:** Streams can support multiple consumer groups, allowing different consumers to read from the same stream independently. This is useful for scenarios where you need to process the same data in different ways. For example, in a real-time analytics system, one consumer group might process events to update a dashboard, while another group processes the same events to store them in a database for historical analysis.
3. **Replication:** In order to support fault tolerance, just like databases, streams can replicate data across multiple servers. This ensures that if a server fails, the data can still be read from another server.
4 **Windowing:** Streams can support windowing, which is a way of grouping events together based on time or count. This is useful for scenarios where you need to process events in batches, such as calculating hourly or daily aggregates of data. Think about a real-time dashboard that shows mean delivery time per region over the last 24 hours.

## Cache
1. **Server-side:** Redis, MomentoServer-side code must return a certain set of headers if it expects the caller to cache the returned data
2. Client-side
3. CDN
4. Database


## Database
- invert index
- full text indexes
### Database Types & Usage
| Type                        | Usage                                                | Examples                                           |
|-----------------------------|------------------------------------------------------|----------------------------------------------------|
| Relational Database (RDBMS) | Customer, Product, Financial transaction data, etc   | MySQL, PostgreSQL, Oracle Database                 |
| Key-Value Store             | Session Storage, Caching, real-time data processing  | Redis, DynamoDB                                    |
| Document DataBase           | Document-oriented info, CMS, reviews, json, etc      | MongoDB, Couchbase, Apache CouchDB                 |
| Graph Databse               | social Network, recommendation systems               | Neo4j, Amazon Neptune                              |
| In-Memory Database          | RAM, Online Gaming, High-Frequency Trading           | Redis, Memcached                                   |
| Time-Serise Database (TSDB) | Time-stamped or time-series data, Monitor, IoT       | InfluxDB, TimescaleDB, Prometheus                  |
| Wide-Column Stores          | Web analytics and user tracking, Real-Time Analytics | Apache Cassandra, Apache HBase, Google Bigtable    |
| Object-Oriented Database    | OOP application, multi-media                         | ObjectDB, db4o                                     |
| Text Search Database        | Seach Engine, Log analysis                           | Elastic Search, Apache Solr, Sphinx                |
| Spatial Database            | geographical or spatial information.                 | PostGIS (extension for PostgreSQL), Oracle Spatial |
| Vector Database             |  Image and Video Search                              | Faiss, Milvus, Pinecone                            |
| Blob Datastore              | Files, images, audio and videos, CDN                 | Amazon S3, Azure Blob Storage, HDFS                |

ref: [15 types of Database](https://blog.algomaster.io/p/15-types-of-databases)
### SQL vs NoSQL
RDBMS Transactions: Transactions are a way of grouping multiple operations together into a single atomic operation. For example, if you have a users table and a posts table, you might want to create a new user and a new post for that user at the same time. If you do this in a transaction, either both operations will succeed or both will fail. This is important for maintaining data integrity.
- ACID: Atomicity, Consistency, Isolation and Durability
	![NoSQL](https://d248djf5mc6iku.cloudfront.net/excalidraw/641b9db6ecff33edf227cec61e2f6d86)



### Blob Storage
Blob storage services are simple. You can upload a blob of data and that data is stored and get back a URL. You can then use this URL to download the blob of data.
![Bolb Storage](https://d248djf5mc6iku.cloudfront.net/excalidraw/3ef55fb26ee657d2dad4c158b16c26c6)

#### Blob Storage attributes
- **Durability:** Blob storage services are designed to be incredibly durable. They use techniques like replication and erasure coding to ensure that your data is safe even if a disk or server fails.
- **Scalability:** Hosted blob storage solutions like AWS S3 can be considered infinitely scalable. They can store an unlimited amount of data and can handle an unlimited number of requests (obviously within the limits of your account). As a result, in your interview, you don't need to explicitly consider the scalability of blob storage services -- consider this as a given.
- **Cost:** Blob storage services are designed to be cost effective. They are much cheaper than storing large blobs of data in a traditional database. For example, AWS S3 charges $0.023 per GB per month for the first 50 TB of storage. This is much cheaper than storing the same data in a database like DynamoDB, which charges $1.25 per GB per month for the first 10 TB of storage.
- **Security:** Blob storage services have built-in security features like encryption at rest and in transit. They also have access control features that allow you to control who can access your data.
- **Upload and Download Directly from the Client:** Blob storage services allow you to upload and download blobs directly from the client. This is useful for applications that need to store and retrieve large blobs of data, like images or videos. Familiarize yourself with **presigned URLs** and how they can be used to grant temporary access to a blob -- either for upload or download.
- **Chunking:** When uploading large files, it's common to use chunking to upload the file in smaller pieces. This allows you to **resume an upload** if it fails partway through, and it also allows you to upload the file in parallel. This is especially useful for large files, where uploading the entire file at once might take a long time. Modern blob storage services like S3 support chunking out of the box via the multipart upload API. Chunking needs to be done on the **client** so that the file can be broken into pieces before it is sent to the server, or blob storage like S3.

### Search Optimized Database
1. Inverted index: An inverted index is a data structure that maps from words to the documents that contain them
2. Tokenization: Tokenization is the process of breaking a piece of text into individual words. This allows you to map from words to documents in the inverted index.
3. Stemming: Stemming is the process of reducing words to their root form. This allows you to match different forms of the same word.
4. Fuzzy Search: Fuzzy search is the ability to find results that are similar to a given search term.
5. Scaling: Just like traditional databases, search optimized databases scale by adding more nodes to a cluster and sharding data across those nodes.

### CDN
**Content Delivery Network**  is a type of cache that uses distributed servers to deliver content to users based on their geographic location.

- **CDNs are not just for static assets.** While CDNs are often used to cache static assets like images, videos, and javascript files, they can also be used to cache dynamic content. This is especially useful for content that is accessed frequently, but changes infrequently. For example, a blog post that is updated once a day can be cached by a CDN.
- **CDNs can be used to cache API responses.** If you have an API that is accessed frequently, you can use a CDN to cache the responses. This can help reduce the load on your servers and improve the performance of your API.
- **Eviction policies.** Like other caches, CDNs have eviction policies that determine when cached content is removed. For example, you can set a time-to-live (TTL) for cached content, or you can use a cache invalidation mechanism to remove content from the cache when it changes.

### What is Sharding
Database sharding is the process of **storing a large database across multiple machines**. A single machine, or database server, can store and process only a limited amount of data. Database sharding overcomes this limitation by splitting data into smaller chunks, called **shards**, and storing them across several database servers. All database servers usually have the same underlying technologies, and they work together to store and process large volumes of data.

Sharding is also often done in combination with **data replication** across shards

ref: [AWS database-sharding](https://aws.amazon.com/what-is/database-sharding/)

## Security
User data should always be passed in the session or JWT, while timestamps should be generated by the server
### Single Sign On
ref [SSO](https://www.cloudflare.com/learning/access-management/what-is-sso/)
#### JWT
JSON Web token (JWT), A JWT contains all the required information about an entity to avoid querying a database more than once. The recipient of a JWT also does not need to call a server to validate the token.
#### AWS IAM
AWS Identity and Access Management (IAM) is a web service that helps you securely control access to AWS resources.
ref: [How IAM works](https://docs.aws.amazon.com/IAM/latest/UserGuide/intro-structure.html)

## Serverless & Docker
- AWS offers **Serverless technologies** for running code, managing data, and integrating applications, all without managing servers.
- AWS Lambda: You can use AWS Lambda to run code without provisioning or managing servers. [Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- AWS VPC: Amazon Virtual Private Cloud (Amazon VPC), you can launch AWS resources in a logically isolated virtual network that you've defined. This virtual network closely resembles a traditional network that you'd operate in your own data center, with the benefits of using the scalable infrastructure of AWS
- AWS 
