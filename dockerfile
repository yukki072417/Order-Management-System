FROM node:23 AS Frontend
WORKDIR /usr/app/
COPY ./Frontend /usr/app/
RUN npm install

FROM node:23 AS Backend
WORKDIR /usr/app/
COPY ./Backend /usr/app/
RUN npm install