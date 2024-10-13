# Design Youtube
## 1. Requirement

## 2. Core Entities
> **User:** A user of the system, either an uploader or viewer.
> **Video:** A video that is uploaded / watched.
> **VideoMetadata:** This is metadata associated with the video, such as the uploading user, URL reference to a transcript, etc.

## 3. High level
### 3.1 Video Knowledge Prerequisite
- **Video Codec:** A video codec compresses and decompresses digital video, making it more efficient for storage and transmission. Codec is an abbreviation for *"encoder/decoder."* Codecs attempt to reduce the size of the video while preserving quality.
    >   Codecs usually trade-off on the following: 
    >   1. time required to compress a file 
    >   2. support on different platforms 
    >   3. compression efficiency (a.k.a. how much the original file is reduced in size) 
    >   4. compression quality (lossy or not). Some popular codecs include: H.264, H.265 (HEVC), VP9, AV1, MPEG-2, and MPEG-4.
- **Video Container:** A video container is a file format that stores video data (frames, audio) and metadata. A container might house information like video transcripts as well. It differs from a codec in the sense that a codec determines how a video is compressed / decompressed, whereas a container dictates file format for how the video is stored. Support for video containers varies by device / OS.
- **Bitrate:** The bitrate of a video is the number of bits transmitted over a period of time, typically measured in kilobytes per second (kbps) or megabytes per second (mbps). The size and quality of the video affect the bitrate. High resolution videos with higher framerates (measured in FPS) have significantly higher bitrates vs. low resolution videos at lower framerates. This is because there's literally more data that needs to be transferred in order for the video to play. Compression via codecs can also have an effect on bitrate, as more efficient compression can lead to a larger video being compressed to a much smaller size prior to transmission.
- **Manifest Files:** Manifest files are text-based documents that give details about video streams. There's typically 2 types of manifest files: primary and media files. A primary manifest file lists all the available versions of a video (the different formats). The primary is the "root" file and points to media manifest files, each representing a different version of the video. A video version is typically split into small segments, each a few seconds long. Media manifest files list out the links to these clip files and are used by video players to stream video by serving as an "index" to these segments.

reference: [Background: Video Streaming](https://www.hellointerview.com/learn/system-design/answer-keys/youtube#background-video-streaming)

### 3.2 Upload Video
![kaka](https://d248djf5mc6iku.cloudfront.net/excalidraw/faeaa8ebae2a79f3cf5d0a71f92510c2)
### 3.3 Watch Vidoe
## 4. Deep Dive
##