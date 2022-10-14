# Stage 1 - Build React App inside temporary Node container
### GET ###
FROM alpine:latest as get

# prepare environment
WORKDIR /tmp
RUN apk --no-cache add unzip

# get bun
ADD https://github.com/oven-sh/bun/releases/latest/download/bun-linux-aarch64.zip bun-linux-aarch64.zip
RUN unzip bun-linux-aarch64.zip

### IMAGE ###
FROM debian:bookworm-slim as react-build

# install bun
COPY --from=get /tmp/bun-linux-aarch64/bun /usr/local/bin

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y nodejs

# smoke test
RUN bun --version

WORKDIR /usr/src/app
COPY . ./
RUN bun install
RUN bun run build

# Stage 2 - Deploy with NGNIX
FROM nginx:latest

COPY --from=react-build /usr/src/app/dist /var/www
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000

ENTRYPOINT ["nginx","-g","daemon off;"]
