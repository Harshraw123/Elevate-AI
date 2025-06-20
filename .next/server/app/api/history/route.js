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
exports.id = "app/api/history/route";
exports.ids = ["app/api/history/route"];
exports.modules = {

/***/ "(rsc)/./app/api/history/route.ts":
/*!**********************************!*\
  !*** ./app/api/history/route.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   PUT: () => (/* binding */ PUT)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _configs_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/configs/db */ \"(rsc)/./configs/db.tsx\");\n/* harmony import */ var drizzle_orm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! drizzle-orm */ \"(rsc)/./node_modules/drizzle-orm/sql/expressions/conditions.js\");\n/* harmony import */ var _clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clerk/nextjs/server */ \"(rsc)/./node_modules/@clerk/nextjs/dist/esm/app-router/server/currentUser.js\");\n/* harmony import */ var _configs_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/configs/schema */ \"(rsc)/./configs/schema.ts\");\n\n\n\n\n\nasync function POST(req) {\n    const user = await (0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_3__.currentUser)();\n    if (!user) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"Unauthorized\"\n    }, {\n        status: 401\n    });\n    const { content, recordId, aiAgentType } = await req.json();\n    try {\n        const result = await _configs_db__WEBPACK_IMPORTED_MODULE_1__.db.insert(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.HistoryTable).values({\n            recordId,\n            content,\n            userEmail: user.primaryEmailAddress?.emailAddress ?? \"unknown\",\n            createdAt: new Date().toISOString(),\n            aiAgentType: aiAgentType\n        }).returning();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(result);\n    } catch (e) {\n        console.error(\"DB Insertion Error:\", e);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"DB Error\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function PUT(req) {\n    const user = await (0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_3__.currentUser)();\n    if (!user) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Unauthorized\"\n        }, {\n            status: 401\n        });\n    }\n    const { content, recordId } = await req.json();\n    if (!recordId) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Missing recordId\"\n        }, {\n            status: 400\n        });\n    }\n    try {\n        const result = await _configs_db__WEBPACK_IMPORTED_MODULE_1__.db.update(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.HistoryTable).set({\n            content,\n            userEmail: user.primaryEmailAddress?.emailAddress ?? \"unknown\",\n            createdAt: new Date().toISOString()\n        }).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_4__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.HistoryTable.recordId, recordId)) // ✅ Make sure to filter by recordId\n        .returning();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(result);\n    } catch (e) {\n        console.error(\"DB Update Error:\", e);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"DB Error\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function GET(req) {\n    try {\n        const user = await (0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_3__.currentUser)();\n        if (!user || !user.primaryEmailAddress?.emailAddress) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized or missing email address\"\n            }, {\n                status: 401\n            });\n        }\n        const email = user.primaryEmailAddress.emailAddress;\n        const url = new URL(req.url);\n        const chatid = url.searchParams.get(\"chatid\");\n        if (chatid) {\n            // Fetch by chatid (existing behavior)\n            const result = await _configs_db__WEBPACK_IMPORTED_MODULE_1__.db.select().from(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.HistoryTable).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_4__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.HistoryTable.recordId, chatid));\n            if (!result || result.length === 0) {\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: \"No history found\"\n                }, {\n                    status: 404\n                });\n            }\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(result, {\n                status: 200\n            });\n        } else {\n            // Fetch all history for the user\n            const result = await _configs_db__WEBPACK_IMPORTED_MODULE_1__.db.select().from(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.HistoryTable).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_4__.eq)(_configs_schema__WEBPACK_IMPORTED_MODULE_2__.HistoryTable.userEmail, email));\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(result, {\n                status: 200\n            });\n        }\n    } catch (error) {\n        console.error(\"GET /api/history error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Internal Server Error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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b0MsTUFBTSxHQUNOQyxJQUFJLENBQUNsQyx5REFBWUEsRUFDakJ5QixLQUFLLENBQUMzQiwrQ0FBRUEsQ0FBQ0UseURBQVlBLENBQUNRLFFBQVEsRUFBRXNCO1lBQ25DLElBQUksQ0FBQ3BCLFVBQVVBLE9BQU95QixNQUFNLEtBQUssR0FBRztnQkFDbEMsT0FBT3ZDLHFEQUFZQSxDQUFDUSxJQUFJLENBQUM7b0JBQUVDLE9BQU87Z0JBQW1CLEdBQUc7b0JBQUVDLFFBQVE7Z0JBQUk7WUFDeEU7WUFDQSxPQUFPVixxREFBWUEsQ0FBQ1EsSUFBSSxDQUFDTSxRQUFRO2dCQUFFSixRQUFRO1lBQUk7UUFDakQsT0FBTztZQUNMLGlDQUFpQztZQUNqQyxNQUFNSSxTQUFTLE1BQU1iLDJDQUFFQSxDQUNwQm9DLE1BQU0sR0FDTkMsSUFBSSxDQUFDbEMseURBQVlBLEVBQ2pCeUIsS0FBSyxDQUFDM0IsK0NBQUVBLENBQUNFLHlEQUFZQSxDQUFDYSxTQUFTLEVBQUVjO1lBQ3BDLE9BQU8vQixxREFBWUEsQ0FBQ1EsSUFBSSxDQUFDTSxRQUFRO2dCQUFFSixRQUFRO1lBQUk7UUFDakQ7SUFDRixFQUFFLE9BQU9ELE9BQU87UUFDZGdCLFFBQVFoQixLQUFLLENBQUMsMkJBQTJCQTtRQUN6QyxPQUFPVCxxREFBWUEsQ0FBQ1EsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBd0IsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDN0U7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL2hhcnNocmF3YXQvZmFzdC1uZXh0anMtdjIvQWktQ2FycmVyLUNvYWNoLUFnZW50L2FwcC9hcGkvaGlzdG9yeS9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgeyBkYiB9IGZyb20gJ0AvY29uZmlncy9kYic7XG5pbXBvcnQgeyBlcSB9IGZyb20gJ2RyaXp6bGUtb3JtJzsgXG5cblxuaW1wb3J0IHtjdXJyZW50VXNlcn0gZnJvbSAnQGNsZXJrL25leHRqcy9zZXJ2ZXInO1xuaW1wb3J0IHsgSGlzdG9yeVRhYmxlIH0gZnJvbSAnQC9jb25maWdzL3NjaGVtYSc7XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBSZXF1ZXN0KSB7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IGN1cnJlbnRVc2VyKCk7XG4gICAgaWYgKCF1c2VyKSByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9LCB7IHN0YXR1czogNDAxIH0pO1xuICBcbiAgICBjb25zdCB7IGNvbnRlbnQsIHJlY29yZElkICxhaUFnZW50VHlwZX0gPSBhd2FpdCByZXEuanNvbigpO1xuICBcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIuaW5zZXJ0KEhpc3RvcnlUYWJsZSkudmFsdWVzKHtcbiAgICAgICAgcmVjb3JkSWQsXG4gICAgICAgIGNvbnRlbnQsXG4gICAgICAgIHVzZXJFbWFpbDogdXNlci5wcmltYXJ5RW1haWxBZGRyZXNzPy5lbWFpbEFkZHJlc3MgPz8gXCJ1bmtub3duXCIsXG4gICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICBhaUFnZW50VHlwZTphaUFnZW50VHlwZSxcbiAgICAgIH0pLnJldHVybmluZygpO1xuICBcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihyZXN1bHQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJEQiBJbnNlcnRpb24gRXJyb3I6XCIsIGUpO1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiREIgRXJyb3JcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xuICAgIH1cbiAgfVxuICBcblxuICBcblxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQVVQocmVxOiBSZXF1ZXN0KSB7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IGN1cnJlbnRVc2VyKCk7XG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9LCB7IHN0YXR1czogNDAxIH0pO1xuICAgIH1cbiAgXG4gICAgY29uc3QgeyBjb250ZW50LCByZWNvcmRJZCB9ID0gYXdhaXQgcmVxLmpzb24oKTtcbiAgXG4gICAgaWYgKCFyZWNvcmRJZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiTWlzc2luZyByZWNvcmRJZFwiIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuICBcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGJcbiAgICAgICAgLnVwZGF0ZShIaXN0b3J5VGFibGUpXG4gICAgICAgIC5zZXQoe1xuICAgICAgICAgIGNvbnRlbnQsXG4gICAgICAgICAgdXNlckVtYWlsOiB1c2VyLnByaW1hcnlFbWFpbEFkZHJlc3M/LmVtYWlsQWRkcmVzcyA/PyBcInVua25vd25cIixcbiAgICAgICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgfSlcbiAgICAgICAgLndoZXJlKGVxKEhpc3RvcnlUYWJsZS5yZWNvcmRJZCwgcmVjb3JkSWQpKSAvLyDinIUgTWFrZSBzdXJlIHRvIGZpbHRlciBieSByZWNvcmRJZFxuICAgICAgICAucmV0dXJuaW5nKCk7XG4gIFxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHJlc3VsdCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihcIkRCIFVwZGF0ZSBFcnJvcjpcIiwgZSk7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJEQiBFcnJvclwiIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gICAgfVxuICB9XG5cblxuXG4gIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxOiBSZXF1ZXN0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBjdXJyZW50VXNlcigpO1xuICAgICAgaWYgKCF1c2VyIHx8ICF1c2VyLnByaW1hcnlFbWFpbEFkZHJlc3M/LmVtYWlsQWRkcmVzcykge1xuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJVbmF1dGhvcml6ZWQgb3IgbWlzc2luZyBlbWFpbCBhZGRyZXNzXCIgfSwgeyBzdGF0dXM6IDQwMSB9KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGVtYWlsID0gdXNlci5wcmltYXJ5RW1haWxBZGRyZXNzLmVtYWlsQWRkcmVzcztcbiAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocmVxLnVybCk7XG4gICAgICBjb25zdCBjaGF0aWQgPSB1cmwuc2VhcmNoUGFyYW1zLmdldChcImNoYXRpZFwiKTtcblxuICAgICAgaWYgKGNoYXRpZCkge1xuICAgICAgICAvLyBGZXRjaCBieSBjaGF0aWQgKGV4aXN0aW5nIGJlaGF2aW9yKVxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkYlxuICAgICAgICAgIC5zZWxlY3QoKVxuICAgICAgICAgIC5mcm9tKEhpc3RvcnlUYWJsZSlcbiAgICAgICAgICAud2hlcmUoZXEoSGlzdG9yeVRhYmxlLnJlY29yZElkLCBjaGF0aWQpKTtcbiAgICAgICAgaWYgKCFyZXN1bHQgfHwgcmVzdWx0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIk5vIGhpc3RvcnkgZm91bmRcIiB9LCB7IHN0YXR1czogNDA0IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihyZXN1bHQsIHsgc3RhdHVzOiAyMDAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGZXRjaCBhbGwgaGlzdG9yeSBmb3IgdGhlIHVzZXJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGJcbiAgICAgICAgICAuc2VsZWN0KClcbiAgICAgICAgICAuZnJvbShIaXN0b3J5VGFibGUpXG4gICAgICAgICAgLndoZXJlKGVxKEhpc3RvcnlUYWJsZS51c2VyRW1haWwsIGVtYWlsKSk7XG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihyZXN1bHQsIHsgc3RhdHVzOiAyMDAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJHRVQgL2FwaS9oaXN0b3J5IGVycm9yOlwiLCBlcnJvcik7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xuICAgIH1cbiAgfSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJkYiIsImVxIiwiY3VycmVudFVzZXIiLCJIaXN0b3J5VGFibGUiLCJQT1NUIiwicmVxIiwidXNlciIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImNvbnRlbnQiLCJyZWNvcmRJZCIsImFpQWdlbnRUeXBlIiwicmVzdWx0IiwiaW5zZXJ0IiwidmFsdWVzIiwidXNlckVtYWlsIiwicHJpbWFyeUVtYWlsQWRkcmVzcyIsImVtYWlsQWRkcmVzcyIsImNyZWF0ZWRBdCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsInJldHVybmluZyIsImUiLCJjb25zb2xlIiwiUFVUIiwidXBkYXRlIiwic2V0Iiwid2hlcmUiLCJHRVQiLCJlbWFpbCIsInVybCIsIlVSTCIsImNoYXRpZCIsInNlYXJjaFBhcmFtcyIsImdldCIsInNlbGVjdCIsImZyb20iLCJsZW5ndGgiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/history/route.ts\n");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fhistory%2Froute&page=%2Fapi%2Fhistory%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fhistory%2Froute.ts&appDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fhistory%2Froute&page=%2Fapi%2Fhistory%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fhistory%2Froute.ts&appDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_harshrawat_fast_nextjs_v2_Ai_Carrer_Coach_Agent_app_api_history_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/history/route.ts */ \"(rsc)/./app/api/history/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/history/route\",\n        pathname: \"/api/history\",\n        filename: \"route\",\n        bundlePath: \"app/api/history/route\"\n    },\n    resolvedPagePath: \"/Users/harshrawat/fast-nextjs-v2/Ai-Carrer-Coach-Agent/app/api/history/route.ts\",\n    nextConfigOutput,\n    userland: _Users_harshrawat_fast_nextjs_v2_Ai_Carrer_Coach_Agent_app_api_history_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZoaXN0b3J5JTJGcm91dGUmcGFnZT0lMkZhcGklMkZoaXN0b3J5JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGaGlzdG9yeSUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmhhcnNocmF3YXQlMkZmYXN0LW5leHRqcy12MiUyRkFpLUNhcnJlci1Db2FjaC1BZ2VudCUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZoYXJzaHJhd2F0JTJGZmFzdC1uZXh0anMtdjIlMkZBaS1DYXJyZXItQ29hY2gtQWdlbnQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQytCO0FBQzVHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvaGFyc2hyYXdhdC9mYXN0LW5leHRqcy12Mi9BaS1DYXJyZXItQ29hY2gtQWdlbnQvYXBwL2FwaS9oaXN0b3J5L3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9oaXN0b3J5L3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvaGlzdG9yeVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvaGlzdG9yeS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9oYXJzaHJhd2F0L2Zhc3QtbmV4dGpzLXYyL0FpLUNhcnJlci1Db2FjaC1BZ2VudC9hcHAvYXBpL2hpc3Rvcnkvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fhistory%2Froute&page=%2Fapi%2Fhistory%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fhistory%2Froute.ts&appDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@clerk","vendor-chunks/@opentelemetry","vendor-chunks/tslib","vendor-chunks/cookie","vendor-chunks/map-obj","vendor-chunks/no-case","vendor-chunks/lower-case","vendor-chunks/snakecase-keys","vendor-chunks/snake-case","vendor-chunks/dot-case","vendor-chunks/drizzle-orm","vendor-chunks/@neondatabase"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fhistory%2Froute&page=%2Fapi%2Fhistory%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fhistory%2Froute.ts&appDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();