FROM node:16
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .

ENV SERVER_PORT=4000
ENV DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/wepost?schema=public"
ENV JWT_SECRET=olliethegoat

EXPOSE 4000
CMD ["npm", "start"]
