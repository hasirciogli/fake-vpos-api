# Kullanılacak temel imaj
FROM node:20

# Çalışma dizini oluştur ve ayarla
WORKDIR /app

# Paket dosyalarını kopyala ve bağımlılıkları yükle
COPY . .

RUN rm -rf node_modules
RUN rm -rf dist
RUN rm -rf .next

RUN npm install

# Uygulama dosyalarını kopyala

# Build işlemi
RUN npm run build

# Uygulama çalıştırma
CMD ["npm", "start"]