import AppDependenciesConfigurations from "./ports/Input/appDependenciesConfigurations";

const app = new AppDependenciesConfigurations()
  .useOpenApiDocs()
  .addPersonController()
  .start();

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
