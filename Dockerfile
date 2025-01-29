# Use the official Bun image
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy package.json to leverage Docker caching
COPY package.json .

# Install dependencies with Bun
RUN bun install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN bun run build

# Expose the port your app will run on
EXPOSE 3000

# Command to start the application
CMD ["bun", "run", "start"]
