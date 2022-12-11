# imagen base de un servidor de aplicaciones para aplicaciones web hechas en react, angular, vue , entre otros.
FROM nginx:stable-alpine 
# copiar el contenido de la aplicacion web al contenedor
COPY build/ /usr/share/nginx/html
# exponer el puerto de nginx
EXPOSE 80
# iniciar el servicio de nginx 
CMD ["nginx", "-g", "daemon off;"]