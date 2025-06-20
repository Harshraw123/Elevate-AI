/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/user/route";
exports.ids = ["app/api/user/route"];
exports.modules = {

/***/ "(rsc)/./app/api/user/route.tsx":
/*!********************************!*\
  !*** ./app/api/user/route.tsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var drizzle_orm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! drizzle-orm */ \"(rsc)/./node_modules/drizzle-orm/sql/expressions/conditions.js\");\n/* harmony import */ var _configs_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/configs/db */ \"(rsc)/./configs/db.tsx\");\n/* harmony import */ var _configs_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/configs/schema */ \"(rsc)/./configs/schema.ts\");\n/* harmony import */ var _clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clerk/nextjs/server */ \"(rsc)/./node_modules/@clerk/nextjs/dist/esm/app-router/server/currentUser.js\");\n\n\n\n\n\nasync function POST(req) {\n    try {\n        const user = await (0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_3__.currentUser)();\n        if (!user || !user.primaryEmailAddress?.emailAddress) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized or missing email address\"\n            }, {\n                status: 401\n            });\n        }\n        const email = user.primaryEmailAddress.emailAddress;\n        // Check if user already exists\n        const existingUsers = await _configs_db__WEBPACK_IMPORTED_MODULE_1__.db.select().from(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.usersTable).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_4__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.usersTable.email, email));\n        if (existingUsers.length > 0) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(existingUsers[0]);\n        }\n        // Insert new user\n        const insertedUsers = await _configs_db__WEBPACK_IMPORTED_MODULE_1__.db.insert(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.usersTable).values({\n            name: user.fullName ?? \"\",\n            email: email\n        }).returning();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(insertedUsers[0]);\n    } catch (e) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: e.message || \"Server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3VzZXIvcm91dGUudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUF3RDtBQUN2QjtBQUNDO0FBQ1k7QUFDSztBQUU1QyxlQUFlSyxLQUFLQyxHQUFnQjtJQUN2QyxJQUFJO1FBQ0EsTUFBTUMsT0FBTyxNQUFNSCxpRUFBV0E7UUFFOUIsSUFBSSxDQUFDRyxRQUFRLENBQUNBLEtBQUtDLG1CQUFtQixFQUFFQyxjQUFjO1lBQ2xELE9BQU9ULHFEQUFZQSxDQUFDVSxJQUFJLENBQ3BCO2dCQUFFQyxPQUFPO1lBQXdDLEdBQ2pEO2dCQUFFQyxRQUFRO1lBQUk7UUFFdEI7UUFFQSxNQUFNQyxRQUFRTixLQUFLQyxtQkFBbUIsQ0FBQ0MsWUFBWTtRQUVuRCwrQkFBK0I7UUFDL0IsTUFBTUssZ0JBQWdCLE1BQU1aLDJDQUFFQSxDQUN6QmEsTUFBTSxHQUNOQyxJQUFJLENBQUNiLHVEQUFVQSxFQUNmYyxLQUFLLENBQUNoQiwrQ0FBRUEsQ0FBQ0UsdURBQVVBLENBQUNVLEtBQUssRUFBRUE7UUFFaEMsSUFBSUMsY0FBY0ksTUFBTSxHQUFHLEdBQUc7WUFDMUIsT0FBT2xCLHFEQUFZQSxDQUFDVSxJQUFJLENBQUNJLGFBQWEsQ0FBQyxFQUFFO1FBQzdDO1FBRUEsa0JBQWtCO1FBQ2xCLE1BQU1LLGdCQUFnQixNQUFNakIsMkNBQUVBLENBQ3pCa0IsTUFBTSxDQUFDakIsdURBQVVBLEVBQ2pCa0IsTUFBTSxDQUFDO1lBQ0pDLE1BQU1mLEtBQUtnQixRQUFRLElBQUk7WUFDdkJWLE9BQU9BO1FBQ1gsR0FDQ1csU0FBUztRQUVkLE9BQU94QixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDUyxhQUFhLENBQUMsRUFBRTtJQUM3QyxFQUFFLE9BQU9NLEdBQVE7UUFDYixPQUFPekIscURBQVlBLENBQUNVLElBQUksQ0FBQztZQUFFQyxPQUFPYyxFQUFFQyxPQUFPLElBQUk7UUFBZSxHQUFHO1lBQUVkLFFBQVE7UUFBSTtJQUNuRjtBQUNKIiwic291cmNlcyI6WyIvVXNlcnMvaGFyc2hyYXdhdC9mYXN0LW5leHRqcy12Mi9BaS1DYXJyZXItQ29hY2gtQWdlbnQvYXBwL2FwaS91c2VyL3JvdXRlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgeyBlcSB9IGZyb20gXCJkcml6emxlLW9ybVwiO1xuaW1wb3J0IHsgZGIgfSBmcm9tIFwiQC9jb25maWdzL2RiXCI7XG5pbXBvcnQgeyB1c2Vyc1RhYmxlIH0gZnJvbSBcIkAvY29uZmlncy9zY2hlbWFcIjtcbmltcG9ydCB7IGN1cnJlbnRVc2VyIH0gZnJvbSBcIkBjbGVyay9uZXh0anMvc2VydmVyXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogTmV4dFJlcXVlc3QpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgY3VycmVudFVzZXIoKTtcblxuICAgICAgICBpZiAoIXVzZXIgfHwgIXVzZXIucHJpbWFyeUVtYWlsQWRkcmVzcz8uZW1haWxBZGRyZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgICAgICAgICAgeyBlcnJvcjogXCJVbmF1dGhvcml6ZWQgb3IgbWlzc2luZyBlbWFpbCBhZGRyZXNzXCIgfSxcbiAgICAgICAgICAgICAgICB7IHN0YXR1czogNDAxIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlbWFpbCA9IHVzZXIucHJpbWFyeUVtYWlsQWRkcmVzcy5lbWFpbEFkZHJlc3M7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdXNlciBhbHJlYWR5IGV4aXN0c1xuICAgICAgICBjb25zdCBleGlzdGluZ1VzZXJzID0gYXdhaXQgZGJcbiAgICAgICAgICAgIC5zZWxlY3QoKVxuICAgICAgICAgICAgLmZyb20odXNlcnNUYWJsZSlcbiAgICAgICAgICAgIC53aGVyZShlcSh1c2Vyc1RhYmxlLmVtYWlsLCBlbWFpbCkpO1xuXG4gICAgICAgIGlmIChleGlzdGluZ1VzZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihleGlzdGluZ1VzZXJzWzBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEluc2VydCBuZXcgdXNlclxuICAgICAgICBjb25zdCBpbnNlcnRlZFVzZXJzID0gYXdhaXQgZGJcbiAgICAgICAgICAgIC5pbnNlcnQodXNlcnNUYWJsZSlcbiAgICAgICAgICAgIC52YWx1ZXMoe1xuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIuZnVsbE5hbWUgPz8gXCJcIixcbiAgICAgICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnJldHVybmluZygpO1xuXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihpbnNlcnRlZFVzZXJzWzBdKTtcbiAgICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IGUubWVzc2FnZSB8fCBcIlNlcnZlciBlcnJvclwiIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImVxIiwiZGIiLCJ1c2Vyc1RhYmxlIiwiY3VycmVudFVzZXIiLCJQT1NUIiwicmVxIiwidXNlciIsInByaW1hcnlFbWFpbEFkZHJlc3MiLCJlbWFpbEFkZHJlc3MiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJlbWFpbCIsImV4aXN0aW5nVXNlcnMiLCJzZWxlY3QiLCJmcm9tIiwid2hlcmUiLCJsZW5ndGgiLCJpbnNlcnRlZFVzZXJzIiwiaW5zZXJ0IiwidmFsdWVzIiwibmFtZSIsImZ1bGxOYW1lIiwicmV0dXJuaW5nIiwiZSIsIm1lc3NhZ2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/user/route.tsx\n");

/***/ }),

/***/ "(rsc)/./configs/db.tsx":
/*!************************!*\
  !*** ./configs/db.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var drizzle_orm_neon_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! drizzle-orm/neon-http */ \"(rsc)/./node_modules/drizzle-orm/neon-http/driver.js\");\n\nconst db = (0,drizzle_orm_neon_http__WEBPACK_IMPORTED_MODULE_0__.drizzle)(\"postgresql://Carrer-ai_owner:npg_WZfj9MxIBX2w@ep-cold-bread-a8b6z4dh-pooler.eastus2.azure.neon.tech/Carrer-ai?sslmode=require\");\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9jb25maWdzL2RiLnRzeCIsIm1hcHBpbmdzIjoiOzs7OztBQUFnRDtBQUN6QyxNQUFNQyxLQUFLRCw4REFBT0EsQ0FBQ0UsK0hBQWlELEVBQUciLCJzb3VyY2VzIjpbIi9Vc2Vycy9oYXJzaHJhd2F0L2Zhc3QtbmV4dGpzLXYyL0FpLUNhcnJlci1Db2FjaC1BZ2VudC9jb25maWdzL2RiLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkcml6emxlIH0gZnJvbSAnZHJpenpsZS1vcm0vbmVvbi1odHRwJztcbmV4cG9ydCBjb25zdCBkYiA9IGRyaXp6bGUocHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfTkVPTl9EQl9DT05ORUNUSU9OX1NUUklORyEpOyJdLCJuYW1lcyI6WyJkcml6emxlIiwiZGIiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfTkVPTl9EQl9DT05ORUNUSU9OX1NUUklORyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./configs/db.tsx\n");

/***/ }),

/***/ "(rsc)/./configs/schema.ts":
/*!***************************!*\
  !*** ./configs/schema.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HistoryTable: () => (/* binding */ HistoryTable),\n/* harmony export */   usersTable: () => (/* binding */ usersTable)\n/* harmony export */ });\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/table.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/integer.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/varchar.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/json.js\");\n\nconst usersTable = (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__.pgTable)(\"users\", {\n    id: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.integer)().primaryKey().generatedAlwaysAsIdentity(),\n    name: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 255\n    }).notNull(),\n    email: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 255\n    }).notNull().unique()\n});\nconst HistoryTable = (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__.pgTable)(\"HistoryTable\", {\n    id: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.integer)().primaryKey().generatedAlwaysAsIdentity(),\n    recordId: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)().notNull(),\n    content: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_3__.json)(),\n    userEmail: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)('userEmail').references(()=>usersTable.email),\n    createdAt: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)(),\n    metaData: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_3__.json)().$type().$default(()=>({})),\n    aiAgentType: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)('aiAgentType')\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9jb25maWdzL3NjaGVtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBcUU7QUFDOUQsTUFBTUksYUFBYUgsNERBQU9BLENBQUMsU0FBUztJQUN2Q0ksSUFBSUwsNERBQU9BLEdBQUdNLFVBQVUsR0FBR0MseUJBQXlCO0lBQ3BEQyxNQUFNTiw0REFBT0EsQ0FBQztRQUFFTyxRQUFRO0lBQUksR0FBR0MsT0FBTztJQUN0Q0MsT0FBT1QsNERBQU9BLENBQUM7UUFBRU8sUUFBUTtJQUFJLEdBQUdDLE9BQU8sR0FBR0UsTUFBTTtBQUVwRCxHQUFHO0FBRUksTUFBTUMsZUFBYVosNERBQU9BLENBQUMsZ0JBQWU7SUFDN0NJLElBQUlMLDREQUFPQSxHQUFHTSxVQUFVLEdBQUdDLHlCQUF5QjtJQUNyRE8sVUFBVVosNERBQU9BLEdBQUdRLE9BQU87SUFDMUJLLFNBQVNaLHlEQUFJQTtJQUNqQmEsV0FBV2QsNERBQU9BLENBQUMsYUFBYWUsVUFBVSxDQUFDLElBQUliLFdBQVdPLEtBQUs7SUFDNURPLFdBQVdoQiw0REFBT0E7SUFDbEJpQixVQUFVaEIseURBQUlBLEdBQUdpQixLQUFLLEdBQTJCQyxRQUFRLENBQUMsSUFBTyxFQUFDO0lBQ2xFQyxhQUFZcEIsNERBQU9BLENBQUM7QUFFdkIsR0FBRSIsInNvdXJjZXMiOlsiL1VzZXJzL2hhcnNocmF3YXQvZmFzdC1uZXh0anMtdjIvQWktQ2FycmVyLUNvYWNoLUFnZW50L2NvbmZpZ3Mvc2NoZW1hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGludGVnZXIsIHBnVGFibGUsIHZhcmNoYXIsanNvbiB9IGZyb20gXCJkcml6emxlLW9ybS9wZy1jb3JlXCI7XG5leHBvcnQgY29uc3QgdXNlcnNUYWJsZSA9IHBnVGFibGUoXCJ1c2Vyc1wiLCB7XG4gICAgaWQ6IGludGVnZXIoKS5wcmltYXJ5S2V5KCkuZ2VuZXJhdGVkQWx3YXlzQXNJZGVudGl0eSgpLFxuICAgIG5hbWU6IHZhcmNoYXIoeyBsZW5ndGg6IDI1NSB9KS5ub3ROdWxsKCksXG4gICAgZW1haWw6IHZhcmNoYXIoeyBsZW5ndGg6IDI1NSB9KS5ub3ROdWxsKCkudW5pcXVlKCksXG5cbn0pO1xuXG5leHBvcnQgY29uc3QgSGlzdG9yeVRhYmxlPXBnVGFibGUoXCJIaXN0b3J5VGFibGVcIix7XG4gICAgaWQ6IGludGVnZXIoKS5wcmltYXJ5S2V5KCkuZ2VuZXJhdGVkQWx3YXlzQXNJZGVudGl0eSgpLFxuICAgcmVjb3JkSWQ6IHZhcmNoYXIoKS5ub3ROdWxsKCksXG4gICAgY29udGVudDoganNvbigpLFxudXNlckVtYWlsOiB2YXJjaGFyKCd1c2VyRW1haWwnKS5yZWZlcmVuY2VzKCgpPT51c2Vyc1RhYmxlLmVtYWlsKSxcbiAgIGNyZWF0ZWRBdDogdmFyY2hhcigpLFxuICAgbWV0YURhdGE6IGpzb24oKS4kdHlwZTx7IFtrZXk6IHN0cmluZ106IGFueSB9PigpLiRkZWZhdWx0KCgpID0+ICh7fSkpLFxuICAgYWlBZ2VudFR5cGU6dmFyY2hhcignYWlBZ2VudFR5cGUnKSxcblxufSkiXSwibmFtZXMiOlsiaW50ZWdlciIsInBnVGFibGUiLCJ2YXJjaGFyIiwianNvbiIsInVzZXJzVGFibGUiLCJpZCIsInByaW1hcnlLZXkiLCJnZW5lcmF0ZWRBbHdheXNBc0lkZW50aXR5IiwibmFtZSIsImxlbmd0aCIsIm5vdE51bGwiLCJlbWFpbCIsInVuaXF1ZSIsIkhpc3RvcnlUYWJsZSIsInJlY29yZElkIiwiY29udGVudCIsInVzZXJFbWFpbCIsInJlZmVyZW5jZXMiLCJjcmVhdGVkQXQiLCJtZXRhRGF0YSIsIiR0eXBlIiwiJGRlZmF1bHQiLCJhaUFnZW50VHlwZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./configs/schema.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.tsx&appDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.tsx&appDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_harshrawat_fast_nextjs_v2_Ai_Carrer_Coach_Agent_app_api_user_route_tsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/user/route.tsx */ \"(rsc)/./app/api/user/route.tsx\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/user/route\",\n        pathname: \"/api/user\",\n        filename: \"route\",\n        bundlePath: \"app/api/user/route\"\n    },\n    resolvedPagePath: \"/Users/harshrawat/fast-nextjs-v2/Ai-Carrer-Coach-Agent/app/api/user/route.tsx\",\n    nextConfigOutput,\n    userland: _Users_harshrawat_fast_nextjs_v2_Ai_Carrer_Coach_Agent_app_api_user_route_tsx__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ1c2VyJTJGcm91dGUmcGFnZT0lMkZhcGklMkZ1c2VyJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdXNlciUyRnJvdXRlLnRzeCZhcHBEaXI9JTJGVXNlcnMlMkZoYXJzaHJhd2F0JTJGZmFzdC1uZXh0anMtdjIlMkZBaS1DYXJyZXItQ29hY2gtQWdlbnQlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGaGFyc2hyYXdhdCUyRmZhc3QtbmV4dGpzLXYyJTJGQWktQ2FycmVyLUNvYWNoLUFnZW50JmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUM2QjtBQUMxRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2hhcnNocmF3YXQvZmFzdC1uZXh0anMtdjIvQWktQ2FycmVyLUNvYWNoLUFnZW50L2FwcC9hcGkvdXNlci9yb3V0ZS50c3hcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3VzZXIvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS91c2VyXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS91c2VyL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL2hhcnNocmF3YXQvZmFzdC1uZXh0anMtdjIvQWktQ2FycmVyLUNvYWNoLUFnZW50L2FwcC9hcGkvdXNlci9yb3V0ZS50c3hcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.tsx&appDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/server/app-render/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:async_hooks":
/*!***********************************!*\
  !*** external "node:async_hooks" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:async_hooks");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@clerk","vendor-chunks/@opentelemetry","vendor-chunks/tslib","vendor-chunks/cookie","vendor-chunks/map-obj","vendor-chunks/no-case","vendor-chunks/lower-case","vendor-chunks/snakecase-keys","vendor-chunks/snake-case","vendor-chunks/dot-case","vendor-chunks/drizzle-orm","vendor-chunks/@neondatabase"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.tsx&appDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();