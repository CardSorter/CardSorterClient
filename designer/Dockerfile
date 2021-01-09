FROM node:12 as deps

WORKDIR /app

COPY . .
RUN yarn install

EXPOSE 3002

CMD ["yarn", "start"]



