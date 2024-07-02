# 1. Aşama: Build aşaması
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

# 2. Aşama: Runtime aşaması
FROM nginx:alpine

# Nginx ayar dosyasını kopyalayalım
COPY nginx.conf /etc/nginx/nginx.conf

# Build edilmiş dosyaları Nginx'in servis edeceği klasöre kopyalayalım
COPY --from=build /app/.next /usr/share/nginx/html/.next
COPY --from=build /app/public /usr/share/nginx/html/public

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
