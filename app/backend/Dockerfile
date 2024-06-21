FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm install --only=production

EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]