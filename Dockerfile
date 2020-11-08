# Stage 1 build production

FROM node:13 as builder

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Build auth

# RUN mkdir auth
WORKDIR /app/auth

COPY ./auth/package.json ./
RUN npm install

COPY ./auth ./

RUN npm run build

# Build designer

WORKDIR /app

# RUN mkdir designer
WORKDIR /app/designer

COPY ./designer/package.json ./
RUN npm install

COPY ./designer ./

RUN npm run build

# Build sorter

WORKDIR /app

# RUN mkdir sorter
WORKDIR /app/sorter

COPY ./sorter/package.json ./
RUN npm install

COPY ./sorter ./

RUN npm run build



# Stage 2 serve the files
FROM nginx:1.19

# Install nano, this is for debuging
RUN apt-get update
RUN apt-get install nano

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/auth/build ./auth
COPY --from=builder /app/designer/build ./designer
COPY --from=builder /app/sorter/build ./sort

WORKDIR /

# RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/conf.d/ /etc/nginx/conf.d/

EXPOSE 8000 8500
CMD ["nginx", "-g", "daemon off;"]