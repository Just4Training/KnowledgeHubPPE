# System Design

## Key Concept


> **Consistency:** Strong consistency means lock before next move, weak consistency means eventually consistent. Use locking methods to achieve consistency.

: 
Security



### Monitoring
Good reference for System Design interviews

- [Postman API Design](https://blog.postman.com/what-is-caching/)

#### Rate Limiting
Rate limiting is a strategy for limiting network traffic. It puts a cap on how often someone can repeat an action within a certain timeframe


## Docker
Docker is a container technology. Container is a package of code and dependencies to run that code.

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
### Redis as Leaderboards
Redis can sort set
[Redis Sort](https://www.hellointerview.com/learn/system-design/deep-dives/redis#redis-for-leaderboards)
### Redis as Rate Limiting
Situation: Redis limits access to expensive service
How: 
1. INCR the key,
2. Set EXPIRE time for key
### Redis for event sourcing
The basic idea behind Redis streams is that we want to durably add items to a log and then have a distributed mechanism for consuming items from these logs.
![Redis as Stream](https://d248djf5mc6iku.cloudfront.net/excalidraw/f52b1452c753d9cfd127d58bfd1792c1)

### Redus for Distributed Lock

[redlock](https://redis.io/docs/latest/develop/use/patterns/distributed-locks/#the-redlock-algorithm)
### Redis Pub/Sub
Good for chatting room
Subscribing to a channel: SUBSCRIBE crazy_channel
Publishing to a chaneel: PUBLISH crazy_channel "This channel is hella crazy"

### Kafka
**Apache Kafka** is an open-source distributed event streaming platform that can be used either as a **message queue** or as a **stream processing system**.

One of the fundamental ideas behind Kafka: messages sent and received through Kafka require a user specified distribution strategy (partitioning).

A message consists of one required field, the value, and three optional fields: a key, a timestamp, and headers.

![Kafka Message](https://d248djf5mc6iku.cloudfront.net/excalidraw/ea72a3302bc0beca8e45c13c70b04b10)

### Elasticsearch
#### Basic Concepts
    The important concepts of Elasticsearch from a client perspective are documents, indices, mappings, and fields.

![Elastic Search](https://d248djf5mc6iku.cloudfront.net/excalidraw/8b4a98e0a2659dc35b2e8f1226e77430)

- Document: Documents are the individual units of data that you're searching over. 
- Indices: An index is a collection of documents. Each document is associated with a unique ID and a set of fields, which are key-value pairs that contain the data you're searching over.
- Mappings and Fields: a mapping is the schema of the index. It defines the fields that the index will have, the data type of each field, and any other properties like how the field is processed and indexed.

#### Basic Use
- Create an Index: A simple PUT request will create an index with a dynamic mapping, 1 shard, and 1 replica
- Set a Mapping: If dynamic mapping isn't appropriate (maybe most of the fields in my data aren't searchable), I can set a mapping for the index up front. This lets Elasticsearch know that certain fields should be treated as searchable and what types to expect in those fields
- Add Documents: Each of POST requests will return a document ID along with data about how the document was persisted across the cluster.
- Updating Documents: Updating a document is similar to creating a document, but you need to specify the document ID in the URL.
- Elasticsearch is distributed, asynchronous, and concurrent. Your request is potentially sent to many different nodes and the requests can arrive out of order.
- Search: 
- Sort:

## System design Pattern
- Single DB with CRUD service
![CRUD](https://d248djf5mc6iku.cloudfront.net/excalidraw/a1fba7e81a4a3fcc60cebeb61bc1c128)
- Async job worker pool
![Async](https://d248djf5mc6iku.cloudfront.net/excalidraw/da47f13932e254edd8227cc5f09d3581)

## Event Driven
An event-driven architecture uses events to trigger and communicate between decoupled services and is common in modern applications built with microservices. An event is a change in state, or an update, like an item being placed in a shopping cart on an e-commerce website.

Event-driven architectures have three key components: event producers (Event Emitter), event routers(Message Broker or Event Bus), and event consumers. A producer publishes an event to the router, which filters and pushes the events to consumers. Producer services and consumer services are decoupled, which allows them to be scaled, updated, and deployed independently.

### EventBridge
EventBridge is a serverless service that uses events to connect application components together, making it easier for you to build scalable event-driven applications. Event-driven architecture is a style of building loosely-coupled software systems that work together by emitting and responding to events. Event-driven architecture can help you boost agility and build reliable, scalable applications.

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

### WebSocket API
The WebSocket API makes it possible to open a two-way interactive communication session between the user's browser and a server. With this API, you can send messages to a server and receive responses without having to poll the server for a reply.

### API Gateway
API Gateway handles all the tasks involved in accepting and processing up to hundreds of thousands of concurrent API calls, including traffic management, CORS support, authorization and access control, throttling, monitoring, and API version management.

For example, if the sytem receives a request to GET /users/123, the API gateway would route that request to the users service and return the response to the client.

![API Gateway](https://d248djf5mc6iku.cloudfront.net/excalidraw/4b201e3dd46821c1b73b389c548b54c4)

### Open API
![OPEN API](https://www.openapis.org/wp-content/uploads/sites/3/2023/05/What-is-OpenAPI-Simple-API-Lifecycle-Vertical.png)

#### PUT vs. PATCH
[stackoverflow](https://stackoverflow.com/questions/28459418/use-of-put-vs-patch-methods-in-rest-api-real-life-scenarios)

#### prefetching, prerendering, and service worker precaching
#### Lazy load

## Load Balancer
- Algorithms: Round-robin
- Examples: [AWS Elastic Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html), NGINX


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

### Things to know
**Eviction Policy**
- LRU
- FIFO
- LFU

**Invalidation**
- Invalidate cache when update Database

**Write**


## Database

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
#### API
[API](https://github.com/shieldfy/API-Security-Checklist?tab=readme-ov-file#input)


## Serverless & Docker
- AWS offers **Serverless technologies** for running code, managing data, and integrating applications, all without managing servers.
- AWS Lambda: You can use AWS Lambda to run code without provisioning or managing servers. [Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- AWS VPC: Amazon Virtual Private Cloud (Amazon VPC), you can launch AWS resources in a logically isolated virtual network that you've defined. This virtual network closely resembles a traditional network that you'd operate in your own data center, with the benefits of using the scalable infrastructure of AWS
- AWS 

#### Amazon CloudFront
Amazon CloudFront is a web service that speeds up distribution of your static and dynamic web content, such as .html, .css, .js, and image files, to your users. CloudFront delivers your content through a worldwide network of data centers called edge locations. When a user requests content that you're serving with CloudFront, the request is routed to the edge location that provides the lowest latency (time delay), so that content is delivered with the best possible performance.

If the content is already in the edge location with the lowest latency, CloudFront delivers it immediately.

If the content is not in that edge location, CloudFront retrieves it from an origin that you've defined—such as an Amazon S3 bucket, a MediaPackage channel, or an HTTP server (for example, a web server) that you have identified as the source for the definitive version of your content.
