FROM node:12.18-alpine as dev
RUN apk update && \
    apk add git
EXPOSE 3000
CMD ["/bin/sh"]

FROM node:12.18-alpine as prod
COPY . /todo-view-next
WORKDIR /todo-view-next
RUN npm install --production
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]