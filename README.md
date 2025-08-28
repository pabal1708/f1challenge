# 🏎️💨 F1Challenge - Tu Rincón de la Fórmula 1 🏁

¡Bienvenido al proyecto F1Challenge! Aquí podrás explorar datos de la Fórmula 1 de una manera rápida y divertida. ¿Listo para arrancar los motores? 🚀

## 🔧 Puesta a punto (Instalación)

Para que esta belleza funcione en tu máquina, sigue estos sencillos pasos. ¡No te preocupes, es más fácil que cambiar una rueda en boxes! 😉

### Requisitos previos:

Asegúrate de tener instalado:
*   **Node.js**: Si no lo tienes, descárgalo de [nodejs.org](https://nodejs.org/).
*   **npm** (viene con Node.js) o **pnpm** (recomendado para la velocidad). Si prefieres pnpm:
    ```bash
    npm install -g pnpm
    ```
*   **Angular CLI**: La navaja suiza de Angular. Si no la tienes:
    ```bash
    npm install -g @angular/cli
    # o si usas pnpm
    pnpm install -g @angular/cli
    ```

### Instalación de dependencias:

1.  **Clona el repositorio** (si aún no lo has hecho):
    ```bash
    git clone https://github.com/tu-usuario/f1challenge.git
    cd f1challenge
    ```
2.  **Instala las dependencias**: Puedes elegir entre npm o pnpm.
    ```bash
    npm install
    # o si usas pnpm (¡más rápido!)
    pnpm install
    ```

¡Y listo! Ya casi estamos listos para la carrera. 🏎️

## 🏁 En marcha (Uso)

### Arrancar el servidor de desarrollo:

Para ver la aplicación en acción y hacer tus propias modificaciones:

```bash
ng serve
```

Una vez que el servidor esté corriendo, abre tu navegador favorito y dirígete a `http://localhost:4200/`. La aplicación se recargará automáticamente cada vez que guardes un cambio. ¡Como por arte de magia! ✨

### Construir el proyecto para producción:

Si quieres preparar la aplicación para desplegarla en un servidor, para que todo el mundo la vea (¡y sea súper rápida!):

```bash
ng build
```

Esto generará los archivos optimizados en la carpeta `dist/`. ¡Lista para volar! 🚀

### Ejecutar los tests (si los reinstalas 😉):

Aunque los tests se eliminaron a petición tuya, si en algún momento decides volver a agregarlos (¡lo cual es una buena idea para mantener la calidad!):

```bash
ng test
```

Esto ejecutará los tests unitarios y te mostrará si todo está en orden. ✅

## ✨ Recursos adicionales

*   [**Documentación de Angular CLI**](https://angular.dev/tools/cli): Para los curiosos que quieran profundizar en todos los comandos de Angular CLI.
*   [**ng-zorro-antd**](https://ng.ant.design/docs/introduce/en): El set de componentes UI que le da ese toque profesional a la app.
*   [**ngx-echarts**](https://xieziyu.github.io/ngx-echarts/): Para esos gráficos espectaculares que muestran las clasificaciones.

¡Disfruta tu viaje por el mundo de la Fórmula 1 con F1Challenge! Si tienes alguna duda o sugerencia, ¡no dudes en preguntar! 👋
