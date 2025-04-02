# Use the official Deno base image
FROM denoland/deno:latest

# Set the working directory inside the container
WORKDIR /app

# Copy project files to the container
COPY . .

RUN deno cache --unstable --reload src/index.ts

RUN deno install

# Expose the port your application listens on
EXPOSE 4000

# Define the default command to run the application
CMD ["deno", "task", "dev"]