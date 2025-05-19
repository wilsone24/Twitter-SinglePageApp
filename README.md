
# Twitter Single Page App 🐦

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![CSS](https://img.shields.io/badge/CSS-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Jest](https://img.shields.io/badge/Jest-C21325.svg?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)

</div>

## 👥 Integrantes

- **Wilson Manuel Estrada Ortega**  
- **Darwin Daniel Charris Hernandez**

## 📄 Descripción

Este proyecto es una SPA (Single Page Application) que imita el flujo básico de Twitter: ver tus posts, escribir posts, comentar en tus post y navegar sin recargar la página. 

---

## 🚀 Features

- 🐦 **Inicio**: Visualización de los tuits más recientes.
- 📝 **Posteo**: Permite escribir y publicar un tuit.
- 💬 **Comentarios**: Los usuarios pueden comentar los tuits publicados.
- 📄 **Perfil**: Visualización de tus propios posts.
- 🔐 **Autenticación**: Sistema de login para acceder a las funciones.
- 🧭 **SPA Routing**: Navegación fluida sin recarga.
- 🧪 **Tests**: Cobertura básica con **Jest** y pruebas automatizadas para los componentes.
- ⚠️ **Sentry**: Integración con Sentry para capturar y registrar errores en producción.
- 🚩 **Feature Flags con GrowthBook**: Funcionalidades experimentales activadas dinámicamente.
- 🔄 **CI con GitHub Actions**: Automatización de tests en cada push o pull request.

---

## 🧪 Tests

Para correr los tests del proyecto usamos **Jest**. Ejecuta el siguiente comando:

```bash
npm run test
```

Esto corre todos los tests definidos bajo la configuración actual.

---

## 🔁 CI/CD

Usamos **GitHub Actions** como pipeline de integración continua. Cada vez que se hace push a una rama del repositorio:

- Se instalan las dependencias.
- Se ejecutan automáticamente los tests.
- Se muestra el resultado del pipeline en la pestaña *Actions* del repositorio.

---

## ⚙️ Herramientas Usadas

| Herramienta     | Uso                                      |
|------------------|------------------------------------------|
| **Jest**         | Testing automatizado                    |
| **Sentry**       | Registro y seguimiento de errores       |
| **GrowthBook**   | Control de funcionalidades experimentales |
| **GitHub Actions** | Pipeline de integración continua      |

---

## 🛠 Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/TuUsuario/Twitter-SinglePageApp.git
   ```

2. Entra al proyecto:

   ```bash
   cd Twitter-SinglePageApp
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

---

## 📁 Estructura del Proyecto

```
Twitter-SinglePageApp/
├── src/
│   ├── components/       # Componentes de la SPA
│   ├── pages/            # Páginas como Home, Tweet, etc.
│   ├── routes/           # Configuración del enrutamiento
│   └── utils/            # Funciones reutilizables y helpers
├── tests/                # Tests con Jest
├── .github/workflows/    # Configuraciones de CI
├── .env                  # Variables de entorno (incluye Sentry/GrowthBook)
├── index.html            # HTML principal
├── package.json
└── README.md
```

---

## 🤝 Contribuir

1. Haz un fork del proyecto.
2. Crea una rama: `git checkout -b feature/TuFeature`
3. Haz commit: `git commit -m 'Agrega nueva funcionalidad'`
4. Haz push: `git push origin feature/TuFeature`
5. Abre un Pull Request y discútelo con el equipo.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más información.

---

## 📞 Contacto

- **Wilson Estrada** – [@wilsone24](https://github.com/wilsone24)  
- **Darwin Charris** – [@DarwinCharris](https://github.com/DarwinCharris)

---
