FROM node:10

# Install zh_TW locale and font
RUN \
    apt-get update -y && \
    apt-get install -y -qq \
        locales \
        fonts-arphic-bkai00mp

RUN \
    sed -ie 's/# zh_TW.UTF-8 UTF-8/zh_TW.UTF-8 UTF-8/g' /etc/locale.gen && \
    locale-gen

ENV LANG zh_TW.UTF-8

WORKDIR /repo
