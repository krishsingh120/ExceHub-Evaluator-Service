const PYTHON_IMAGE = "python:3.11.14-alpine3.23";
const JAVA_IMAGE = "openjdk:27-ea-jdk-slim";
const CPP_IMAGE = "gcc";
const EXECUTION_TIMEOUT_MS = 5000;

// This will represent the header size of docker stream
// docker stream header will contain data about type of stream i.e. stdout/stderr
// and the length of data
const DOCKER_STREAM_HEADER_SIZE = 8; // In Bytes

export { PYTHON_IMAGE, JAVA_IMAGE, CPP_IMAGE, EXECUTION_TIMEOUT_MS, DOCKER_STREAM_HEADER_SIZE };
