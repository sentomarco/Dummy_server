# Stage 1: Costruzione dell'interfaccia con Node.js
FROM node:16-alpine as builder
WORKDIR /app
# Copia i file package.json e package-lock.json (se presenti) e installa le dipendenze
COPY package.json package-lock.json* ./
RUN npm install
# Copia il resto dei file sorgente
COPY . .
# Esegui la build TypeScript (assicurati che il comando 'build' in package.json compili i file TS e metta l'output nella cartella 'dist')
RUN npm run build

# Stage 2: Servire i file statici con Nginx
FROM nginx:alpine
# Rimuovi il file di default di Nginx
RUN rm /usr/share/nginx/html/*

# Copia i file costruiti (assumendo che l'output della build sia in 'dist')
COPY --from=builder /app/dist /usr/share/nginx/html

# Se hai altri file statici (es. index.html, styles.css) che non vengono processati da tsc, assicurati di copiarli
# Ad esempio, se non sono stati copiati nella cartella dist:
# COPY index.html /usr/share/nginx/html
# COPY styles.css /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
