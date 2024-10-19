# Use a base image with support for multiple languages
FROM ubuntu:20.04

# Set the environment variable to make apt-get non-interactive
ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies
RUN apt-get update && apt-get install -y \
    python3 python3-pip \
    nodejs npm \
    g++ \
    tzdata \
    && apt-get clean

# Set the working directory
WORKDIR /sandbox

# Create a non-root user for running code
RUN useradd -m sandboxuser

# Set permissions and switch to the new user
RUN chown -R sandboxuser:sandboxuser /sandbox
USER sandboxuser

# Command to keep the container running
CMD ["sleep", "infinity"]