FROM node:14.15.1

# Install dependencies
RUN apt update \
    && apt install -y curl locales \
    && rm -rf /var/lib/apt/lists/*

# make the "en_US.UTF-8" locale so postgres will be utf-8 enabled by default
RUN localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG en_US.utf8