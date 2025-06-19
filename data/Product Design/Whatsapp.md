# Whatsapp
## Requirements
### Functional
- User should send/receive message from others
- User should create/send/receive message from groups
- User should receive media messages
- User should receive offline messages

### Non Functional
- Accessibility is most important (Low latency)
- Support Billions of users

## Core Entities
- User
- Message
- Group (Chats)

### Key points
- User should received message (fault-tolerance)
- USer receives message in real-time (Latency < 500ms)

## API design
- POST createChat 
{
    body:123,
    {
        message: Hello World
    }
}
## High Level Design
1. Delivery message to users
    > we'll create a new events table which functions as a queue for a given client of events that they need to process to get up to date.
    > On the recipient side, our clients are polling for these messages and events periodicially.
2. Real-time delivery to users
## Dive Deep
1. How to handle billons of simultaneous users?
- Using redis pub/sub
2. Chat lookup
![Look up](https://d248djf5mc6iku.cloudfront.net/excalidraw/86688fc61b504c9b1993a6a7c49448a9)
3. How to handle high throughput and global users
4. Multiple devices

## Take away
- **Consistent hashing** is a special kind of hashing technique used in distributed systems to ensure efficient, balanced, and scalable distribution of data across nodes
    - The key idea is to map both nodes and data onto the same hash space, usually a circular or ring-like structure. This way, data is assigned to the closest node on the ring, and when nodes are added or removed, only data near that node is affected.