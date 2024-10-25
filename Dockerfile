FROM node:20-alpine

WORKDIR /app

COPY package*.json yarn.lock ./

RUN npm install

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4001

CMD ["yarn", "preview", "--host"]