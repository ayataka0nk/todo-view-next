FROM node:12-buster-slim as dev
ENV NODE_ENV 'development'
RUN apt-get update && apt-get install -y \
    git locales \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
RUN echo "source /usr/share/bash-completion/completions/git" >> ~/.bashrc
RUN echo "ja_JP.UTF-8 UTF-8" > /etc/locale.gen && \
    locale-gen ja_JP.UTF-8 && \
    /usr/sbin/update-locale LANG=ja_JP.UTF-8
ENV LC_ALL ja_JP.UTF-8
EXPOSE 3000
CMD ["/bin/sh"]

FROM node:12-buster-slim as stag
ENV NODE_ENV 'staging'
COPY . /todo-view-next
WORKDIR /todo-view-next
RUN npm install --production
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]

FROM node:12-buster-slim as prod
ENV NODE_ENV 'production'
COPY . /todo-view-next
WORKDIR /todo-view-next
RUN npm install --production
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]