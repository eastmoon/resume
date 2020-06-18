FROM node:10

# Install carlibre
RUN \
    apt-get update -y && \
    apt-get install -y -qq \
        xdg-utils \
        xz-utils && \
    wget -nv -O- https://download.calibre-ebook.com/linux-installer.sh | sh /dev/stdin version=3.48.0

WORKDIR /repo
