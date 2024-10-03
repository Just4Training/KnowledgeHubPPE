# System Design
Good reference for System Design interviews
- [Hello Interview](https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction)
- 
## API Design

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

#### prefetching, prerendering, and service worker precaching
#### Lazy load

## Database
### Database Types & Usage
| Type                        | Usage                                                | Examples                                           |
|-----------------------------|------------------------------------------------------|----------------------------------------------------|
| Relational Database (RDBMS) | Customer, Product, Financial transaction data, etc   | MySQL, PostgreSQL, Oracle Database                 |
| Key-Value Store             | Session Storage, Caching, real-time data processing  | Redis, DynamoDB                                    |
| Document DataBase           | Document-oriented info, CMS, reviews, json, etc      | MongoDB, Couchbase, Apache CouchDB                 |
| Graph Databse               | social Network, recommendation systems               | Neo4j, Amazon Neptune                              |
| In-Memory Database          | RAM, Online Gaming, High-Frequency Trading           | Redis, Memcached                                   |
| Wide-Column Stores          | Web analytics and user tracking, Real-Time Analytics | Apache Cassandra, Apache HBase, Google Bigtable    |
| Object-Oriented Database    | OOP application, multi-media                         | ObjectDB, db4o                                     |
| Text Search Database        | Seach Engine, Log analysis                           | Elastic Search, Apache Solr, Sphinx                |
|Spatial Database             | geographical or spatial information.                 | PostGIS (extension for PostgreSQL), Oracle Spatial |
|Vector Database              |  Image and Video Search                              | Faiss, Milvus, Pinecone                            |

ref: [15 types of Database](https://blog.algomaster.io/p/15-types-of-databases)
### SQL vs NoSQL

### What is Sharding
Database sharding is the process of **storing a large database across multiple machines**. A single machine, or database server, can store and process only a limited amount of data. Database sharding overcomes this limitation by splitting data into smaller chunks, called **shards**, and storing them across several database servers. All database servers usually have the same underlying technologies, and they work together to store and process large volumes of data.

Sharding is also often done in combination with **data replication** across shards

ref: [AWS database-sharding](https://aws.amazon.com/what-is/database-sharding/)