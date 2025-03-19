# Stage 1 build production

FROM node:20 as builder

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Build app

WORKDIR /app

# RUN mkdir
WORKDIR /app/application

COPY app/package.json ./
RUN npm install
ENV PUBLIC_URL /card-sorter
COPY app ./

RUN npm run build

# Stage 2 serve the files
FROM nginx:1.27

# Install nano, this is for debuging
#RUN apt-get update
#RUN apt-get install nano

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/application/build ./application

WORKDIR /

# RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/conf.d/ /etc/nginx/conf.d/

EXPOSE 8000 8500
CMD ["nginx", "-g", "daemon off;"]
