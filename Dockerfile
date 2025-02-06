# FROM nginx:alpine
FROM ghcr.io/home-assistant/aarch64-base:3.21

# 添加 envsubst 命令
RUN apk add --no-cache gettext nginx

# 复制文件
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html
COPY ./public/env.template.js /usr/share/nginx/html/env.template.js
RUN rm /usr/share/nginx/html/config/userConfig.json
# 创建启动脚本
RUN echo '#!/bin/sh' > /docker-entrypoint.sh && \
    echo 'envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js' >> /docker-entrypoint.sh && \
    echo 'nginx -g "daemon off;"' >> /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh

EXPOSE 5123

# 使用启动脚本
CMD ["/docker-entrypoint.sh"]