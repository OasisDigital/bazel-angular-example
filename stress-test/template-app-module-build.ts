export function appModuleBuildContents(moduleNames: string[]) {
  const deps = moduleNames.map((name) => '//src/app/' + name);

  return `load("//tools:angular_ts_project.bzl", "ng_ts_project")

package(default_visibility = ["//:__subpackages__"])

ng_ts_project(
    name = "app",
    srcs = glob(
        include = ["*.ts"],
        exclude = ["app.server.module.ts"],
    ),
    angular_assets = ["app.component.html"],
    deps = [
        "//src/app/hello-world",
        "//src/app/home",
        "//src/app/todos",
        "//src/app/todos/reducers",
        "//src/shared/material",
        "@npm//@angular/common",
        "@npm//@angular/core",
        "@npm//@angular/platform-browser",
        "@npm//@angular/router",
        "@npm//@angular/service-worker",
        "@npm//@ngrx/store",
        "@npm//rxjs",
    ] + ${JSON.stringify(deps, undefined, 4)},
)

ng_ts_project(
    name = "app_server",
    srcs = ["app.server.module.ts"],
    deps = [
        ":app",
        "@npm//@angular/core",
        "@npm//@angular/platform-server",
    ],
)
`;
}
