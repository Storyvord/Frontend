FROM node:20

RUN corepack enable && corepack prepare yarn@4.3.1 --activate

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
