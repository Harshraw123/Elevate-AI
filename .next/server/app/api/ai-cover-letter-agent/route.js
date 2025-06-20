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
exports.id = "app/api/ai-cover-letter-agent/route";
exports.ids = ["app/api/ai-cover-letter-agent/route"];
exports.modules = {

/***/ "(rsc)/./app/api/ai-cover-letter-agent/route.tsx":
/*!*************************************************!*\
  !*** ./app/api/ai-cover-letter-agent/route.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _inngest_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/inngest/client */ \"(rsc)/./inngest/client.ts\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"(rsc)/./node_modules/axios/lib/axios.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @clerk/nextjs/server */ \"(rsc)/./node_modules/@clerk/nextjs/dist/esm/app-router/server/currentUser.js\");\n\n\n\n\nasync function POST(req) {\n    console.log(\"🚀 Starting cover letter generation request\");\n    try {\n        const { coverLetterId, userName, position, resumeSummary, jobDescription } = await req.json();\n        console.log(\"📝 Request data:\", {\n            coverLetterId,\n            userName: userName || \"Not provided\",\n            position: position || \"Not provided\",\n            resumeSummary: resumeSummary ? \"Provided\" : \"Not provided\",\n            jobDescription: jobDescription ? \"Provided\" : \"Not provided\"\n        });\n        const user = await (0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_2__.currentUser)();\n        const userEmail = user?.primaryEmailAddress?.emailAddress || \"unknown\";\n        console.log(\"👤 User:\", userEmail);\n        // Send Inngest Event\n        console.log(\"📤 Sending event to Inngest...\");\n        const resultIds = await _inngest_client__WEBPACK_IMPORTED_MODULE_0__.inngest.send({\n            name: \"AiCoverLetterAgent\",\n            data: {\n                coverLetterId,\n                userName,\n                position,\n                resumeSummary,\n                jobDescription,\n                userEmail\n            }\n        });\n        const runId = resultIds.ids[0];\n        console.log(\"🟢 Inngest Run ID:\", runId);\n        let runStatus;\n        while(true){\n            runStatus = await getRuns(runId);\n            const status = runStatus?.data?.[0]?.status;\n            console.log(\"⏳ Inngest run status:\", status);\n            if (status === \"Completed\") break;\n            await new Promise((resolve)=>setTimeout(resolve, 500));\n        }\n        const content = runStatus.data?.[0]?.output?.response?.output?.[0]?.content || \"⚠️ No response.\";\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            output: content\n        });\n    } catch (e) {\n        console.error(\"❌ Error in POST /ai-cover-letter-agent:\", e);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Something went wrong\"\n        }, {\n            status: 500\n        });\n    }\n}\n// ✅ Moved outside and exported cleanly\nasync function getRuns(runId) {\n    const result = await axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(`${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`, {\n        headers: {\n            Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`\n        }\n    });\n    return result.data;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FpLWNvdmVyLWxldHRlci1hZ2VudC9yb3V0ZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBMkM7QUFDakI7QUFDaUI7QUFDUTtBQUU1QyxlQUFlSSxLQUFLQyxHQUFZO0lBQ3JDQyxRQUFRQyxHQUFHLENBQUM7SUFFWixJQUFJO1FBQ0YsTUFBTSxFQUFFQyxhQUFhLEVBQUVDLFFBQVEsRUFBRUMsUUFBUSxFQUFFQyxhQUFhLEVBQUVDLGNBQWMsRUFBRSxHQUN4RSxNQUFNUCxJQUFJUSxJQUFJO1FBRWhCUCxRQUFRQyxHQUFHLENBQUMsb0JBQW9CO1lBQzlCQztZQUNBQyxVQUFVQSxZQUFZO1lBQ3RCQyxVQUFVQSxZQUFZO1lBQ3RCQyxlQUFlQSxnQkFBZ0IsYUFBYTtZQUM1Q0MsZ0JBQWdCQSxpQkFBaUIsYUFBYTtRQUNoRDtRQUVBLE1BQU1FLE9BQU8sTUFBTVgsaUVBQVdBO1FBQzlCLE1BQU1ZLFlBQVlELE1BQU1FLHFCQUFxQkMsZ0JBQWdCO1FBRTdEWCxRQUFRQyxHQUFHLENBQUMsWUFBWVE7UUFFeEIscUJBQXFCO1FBQ3JCVCxRQUFRQyxHQUFHLENBQUM7UUFDWixNQUFNVyxZQUFZLE1BQU1sQixvREFBT0EsQ0FBQ21CLElBQUksQ0FBQztZQUNuQ0MsTUFBTTtZQUNOQyxNQUFNO2dCQUNKYjtnQkFDQUM7Z0JBQ0FDO2dCQUNBQztnQkFDQUM7Z0JBQ0FHO1lBQ0Y7UUFDRjtRQUVBLE1BQU1PLFFBQVFKLFVBQVVLLEdBQUcsQ0FBQyxFQUFFO1FBQzlCakIsUUFBUUMsR0FBRyxDQUFDLHNCQUFzQmU7UUFFbEMsSUFBSUU7UUFDSixNQUFPLEtBQU07WUFDWEEsWUFBWSxNQUFNQyxRQUFRSDtZQUMxQixNQUFNSSxTQUFTRixXQUFXSCxNQUFNLENBQUMsRUFBRSxFQUFFSztZQUNyQ3BCLFFBQVFDLEdBQUcsQ0FBQyx5QkFBeUJtQjtZQUNyQyxJQUFJQSxXQUFXLGFBQWE7WUFFNUIsTUFBTSxJQUFJQyxRQUFRLENBQUNDLFVBQVlDLFdBQVdELFNBQVM7UUFDckQ7UUFFQSxNQUFNRSxVQUNKTixVQUFVSCxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUVVLFFBQVFDLFVBQVVELFFBQVEsQ0FBQyxFQUFFLEVBQUVELFdBQVc7UUFFakUsT0FBTzVCLHFEQUFZQSxDQUFDVyxJQUFJLENBQUM7WUFBRWtCLFFBQVFEO1FBQVE7SUFDN0MsRUFBRSxPQUFPRyxHQUFHO1FBQ1YzQixRQUFRNEIsS0FBSyxDQUFDLDJDQUEyQ0Q7UUFDekQsT0FBTy9CLHFEQUFZQSxDQUFDVyxJQUFJLENBQUM7WUFBRXFCLE9BQU87UUFBdUIsR0FBRztZQUFFUixRQUFRO1FBQUk7SUFDNUU7QUFDRjtBQUVBLHVDQUF1QztBQUN0QyxlQUFlRCxRQUFRSCxLQUFhO0lBQ25DLE1BQU1hLFNBQVMsTUFBTWxDLDZDQUFLQSxDQUFDbUMsR0FBRyxDQUM1QixHQUFHQyxRQUFRQyxHQUFHLENBQUNDLG1CQUFtQixDQUFDLFdBQVcsRUFBRWpCLE1BQU0sS0FBSyxDQUFDLEVBQzVEO1FBQ0VrQixTQUFTO1lBQ1BDLGVBQWUsQ0FBQyxPQUFPLEVBQUVKLFFBQVFDLEdBQUcsQ0FBQ0ksbUJBQW1CLEVBQUU7UUFDNUQ7SUFDRjtJQUVGLE9BQU9QLE9BQU9kLElBQUk7QUFDcEIiLCJzb3VyY2VzIjpbIi9Vc2Vycy9oYXJzaHJhd2F0L2Zhc3QtbmV4dGpzLXYyL0FpLUNhcnJlci1Db2FjaC1BZ2VudC9hcHAvYXBpL2FpLWNvdmVyLWxldHRlci1hZ2VudC9yb3V0ZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5uZ2VzdCB9IGZyb20gXCJAL2lubmdlc3QvY2xpZW50XCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbmltcG9ydCB7IGN1cnJlbnRVc2VyIH0gZnJvbSBcIkBjbGVyay9uZXh0anMvc2VydmVyXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xuICBjb25zb2xlLmxvZyhcIvCfmoAgU3RhcnRpbmcgY292ZXIgbGV0dGVyIGdlbmVyYXRpb24gcmVxdWVzdFwiKTtcblxuICB0cnkge1xuICAgIGNvbnN0IHsgY292ZXJMZXR0ZXJJZCwgdXNlck5hbWUsIHBvc2l0aW9uLCByZXN1bWVTdW1tYXJ5LCBqb2JEZXNjcmlwdGlvbiB9ID1cbiAgICAgIGF3YWl0IHJlcS5qc29uKCk7XG5cbiAgICBjb25zb2xlLmxvZyhcIvCfk50gUmVxdWVzdCBkYXRhOlwiLCB7XG4gICAgICBjb3ZlckxldHRlcklkLFxuICAgICAgdXNlck5hbWU6IHVzZXJOYW1lIHx8IFwiTm90IHByb3ZpZGVkXCIsXG4gICAgICBwb3NpdGlvbjogcG9zaXRpb24gfHwgXCJOb3QgcHJvdmlkZWRcIixcbiAgICAgIHJlc3VtZVN1bW1hcnk6IHJlc3VtZVN1bW1hcnkgPyBcIlByb3ZpZGVkXCIgOiBcIk5vdCBwcm92aWRlZFwiLFxuICAgICAgam9iRGVzY3JpcHRpb246IGpvYkRlc2NyaXB0aW9uID8gXCJQcm92aWRlZFwiIDogXCJOb3QgcHJvdmlkZWRcIixcbiAgICB9KTtcblxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBjdXJyZW50VXNlcigpO1xuICAgIGNvbnN0IHVzZXJFbWFpbCA9IHVzZXI/LnByaW1hcnlFbWFpbEFkZHJlc3M/LmVtYWlsQWRkcmVzcyB8fCBcInVua25vd25cIjtcblxuICAgIGNvbnNvbGUubG9nKFwi8J+RpCBVc2VyOlwiLCB1c2VyRW1haWwpO1xuXG4gICAgLy8gU2VuZCBJbm5nZXN0IEV2ZW50XG4gICAgY29uc29sZS5sb2coXCLwn5OkIFNlbmRpbmcgZXZlbnQgdG8gSW5uZ2VzdC4uLlwiKTtcbiAgICBjb25zdCByZXN1bHRJZHMgPSBhd2FpdCBpbm5nZXN0LnNlbmQoe1xuICAgICAgbmFtZTogXCJBaUNvdmVyTGV0dGVyQWdlbnRcIixcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgY292ZXJMZXR0ZXJJZCxcbiAgICAgICAgdXNlck5hbWUsXG4gICAgICAgIHBvc2l0aW9uLFxuICAgICAgICByZXN1bWVTdW1tYXJ5LFxuICAgICAgICBqb2JEZXNjcmlwdGlvbixcbiAgICAgICAgdXNlckVtYWlsLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHJ1bklkID0gcmVzdWx0SWRzLmlkc1swXTtcbiAgICBjb25zb2xlLmxvZyhcIvCfn6IgSW5uZ2VzdCBSdW4gSUQ6XCIsIHJ1bklkKTtcblxuICAgIGxldCBydW5TdGF0dXM7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHJ1blN0YXR1cyA9IGF3YWl0IGdldFJ1bnMocnVuSWQpO1xuICAgICAgY29uc3Qgc3RhdHVzID0gcnVuU3RhdHVzPy5kYXRhPy5bMF0/LnN0YXR1cztcbiAgICAgIGNvbnNvbGUubG9nKFwi4o+zIElubmdlc3QgcnVuIHN0YXR1czpcIiwgc3RhdHVzKTtcbiAgICAgIGlmIChzdGF0dXMgPT09IFwiQ29tcGxldGVkXCIpIGJyZWFrO1xuXG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCA1MDApKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb250ZW50ID1cbiAgICAgIHJ1blN0YXR1cy5kYXRhPy5bMF0/Lm91dHB1dD8ucmVzcG9uc2U/Lm91dHB1dD8uWzBdPy5jb250ZW50IHx8IFwi4pqg77iPIE5vIHJlc3BvbnNlLlwiO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgb3V0cHV0OiBjb250ZW50IH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihcIuKdjCBFcnJvciBpbiBQT1NUIC9haS1jb3Zlci1sZXR0ZXItYWdlbnQ6XCIsIGUpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlNvbWV0aGluZyB3ZW50IHdyb25nXCIgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuXG4vLyDinIUgTW92ZWQgb3V0c2lkZSBhbmQgZXhwb3J0ZWQgY2xlYW5seVxuIGFzeW5jIGZ1bmN0aW9uIGdldFJ1bnMocnVuSWQ6IHN0cmluZykge1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCBheGlvcy5nZXQoXG4gICAgYCR7cHJvY2Vzcy5lbnYuSU5OR0VTVF9TRVJWRVJfSE9TVH0vdjEvZXZlbnRzLyR7cnVuSWR9L3J1bnNgLFxuICAgIHtcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Byb2Nlc3MuZW52LklOTkdFU1RfU0lHTklOR19LRVl9YCxcbiAgICAgIH0sXG4gICAgfVxuICApO1xuICByZXR1cm4gcmVzdWx0LmRhdGE7XG59XG4iXSwibmFtZXMiOlsiaW5uZ2VzdCIsImF4aW9zIiwiTmV4dFJlc3BvbnNlIiwiY3VycmVudFVzZXIiLCJQT1NUIiwicmVxIiwiY29uc29sZSIsImxvZyIsImNvdmVyTGV0dGVySWQiLCJ1c2VyTmFtZSIsInBvc2l0aW9uIiwicmVzdW1lU3VtbWFyeSIsImpvYkRlc2NyaXB0aW9uIiwianNvbiIsInVzZXIiLCJ1c2VyRW1haWwiLCJwcmltYXJ5RW1haWxBZGRyZXNzIiwiZW1haWxBZGRyZXNzIiwicmVzdWx0SWRzIiwic2VuZCIsIm5hbWUiLCJkYXRhIiwicnVuSWQiLCJpZHMiLCJydW5TdGF0dXMiLCJnZXRSdW5zIiwic3RhdHVzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwiY29udGVudCIsIm91dHB1dCIsInJlc3BvbnNlIiwiZSIsImVycm9yIiwicmVzdWx0IiwiZ2V0IiwicHJvY2VzcyIsImVudiIsIklOTkdFU1RfU0VSVkVSX0hPU1QiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsIklOTkdFU1RfU0lHTklOR19LRVkiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/ai-cover-letter-agent/route.tsx\n");

/***/ }),

/***/ "(rsc)/./inngest/client.ts":
/*!***************************!*\
  !*** ./inngest/client.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   inngest: () => (/* binding */ inngest)\n/* harmony export */ });\n/* harmony import */ var inngest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inngest */ \"(rsc)/./node_modules/inngest/index.js\");\n/* harmony import */ var inngest__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inngest__WEBPACK_IMPORTED_MODULE_0__);\n\n// Create a client to send and receive events\nconst inngest = new inngest__WEBPACK_IMPORTED_MODULE_0__.Inngest({\n    id: \"Ai-Carrer-Coach\"\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9pbm5nZXN0L2NsaWVudC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBa0M7QUFFbEMsNkNBQTZDO0FBQ3RDLE1BQU1DLFVBQVUsSUFBSUQsNENBQU9BLENBQUM7SUFBRUUsSUFBSTtBQUFrQixHQUFHIiwic291cmNlcyI6WyIvVXNlcnMvaGFyc2hyYXdhdC9mYXN0LW5leHRqcy12Mi9BaS1DYXJyZXItQ29hY2gtQWdlbnQvaW5uZ2VzdC9jbGllbnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5uZ2VzdCB9IGZyb20gXCJpbm5nZXN0XCI7XG5cbi8vIENyZWF0ZSBhIGNsaWVudCB0byBzZW5kIGFuZCByZWNlaXZlIGV2ZW50c1xuZXhwb3J0IGNvbnN0IGlubmdlc3QgPSBuZXcgSW5uZ2VzdCh7IGlkOiBcIkFpLUNhcnJlci1Db2FjaFwiIH0pO1xuIl0sIm5hbWVzIjpbIklubmdlc3QiLCJpbm5nZXN0IiwiaWQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./inngest/client.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fai-cover-letter-agent%2Froute&page=%2Fapi%2Fai-cover-letter-agent%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fai-cover-letter-agent%2Froute.tsx&appDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fai-cover-letter-agent%2Froute&page=%2Fapi%2Fai-cover-letter-agent%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fai-cover-letter-agent%2Froute.tsx&appDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_harshrawat_fast_nextjs_v2_Ai_Carrer_Coach_Agent_app_api_ai_cover_letter_agent_route_tsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/ai-cover-letter-agent/route.tsx */ \"(rsc)/./app/api/ai-cover-letter-agent/route.tsx\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/ai-cover-letter-agent/route\",\n        pathname: \"/api/ai-cover-letter-agent\",\n        filename: \"route\",\n        bundlePath: \"app/api/ai-cover-letter-agent/route\"\n    },\n    resolvedPagePath: \"/Users/harshrawat/fast-nextjs-v2/Ai-Carrer-Coach-Agent/app/api/ai-cover-letter-agent/route.tsx\",\n    nextConfigOutput,\n    userland: _Users_harshrawat_fast_nextjs_v2_Ai_Carrer_Coach_Agent_app_api_ai_cover_letter_agent_route_tsx__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhaS1jb3Zlci1sZXR0ZXItYWdlbnQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFpLWNvdmVyLWxldHRlci1hZ2VudCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmFpLWNvdmVyLWxldHRlci1hZ2VudCUyRnJvdXRlLnRzeCZhcHBEaXI9JTJGVXNlcnMlMkZoYXJzaHJhd2F0JTJGZmFzdC1uZXh0anMtdjIlMkZBaS1DYXJyZXItQ29hY2gtQWdlbnQlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGaGFyc2hyYXdhdCUyRmZhc3QtbmV4dGpzLXYyJTJGQWktQ2FycmVyLUNvYWNoLUFnZW50JmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUM4QztBQUMzSDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2hhcnNocmF3YXQvZmFzdC1uZXh0anMtdjIvQWktQ2FycmVyLUNvYWNoLUFnZW50L2FwcC9hcGkvYWktY292ZXItbGV0dGVyLWFnZW50L3JvdXRlLnRzeFwiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYWktY292ZXItbGV0dGVyLWFnZW50L3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYWktY292ZXItbGV0dGVyLWFnZW50XCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9haS1jb3Zlci1sZXR0ZXItYWdlbnQvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvaGFyc2hyYXdhdC9mYXN0LW5leHRqcy12Mi9BaS1DYXJyZXItQ29hY2gtQWdlbnQvYXBwL2FwaS9haS1jb3Zlci1sZXR0ZXItYWdlbnQvcm91dGUudHN4XCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fai-cover-letter-agent%2Froute&page=%2Fapi%2Fai-cover-letter-agent%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fai-cover-letter-agent%2Froute.tsx&appDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

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

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/@clerk","vendor-chunks/next","vendor-chunks/@opentelemetry","vendor-chunks/axios","vendor-chunks/mime-db","vendor-chunks/follow-redirects","vendor-chunks/debug","vendor-chunks/tslib","vendor-chunks/form-data","vendor-chunks/asynckit","vendor-chunks/combined-stream","vendor-chunks/cookie","vendor-chunks/mime-types","vendor-chunks/proxy-from-env","vendor-chunks/ms","vendor-chunks/supports-color","vendor-chunks/delayed-stream","vendor-chunks/map-obj","vendor-chunks/no-case","vendor-chunks/lower-case","vendor-chunks/snakecase-keys","vendor-chunks/has-flag","vendor-chunks/snake-case","vendor-chunks/dot-case","vendor-chunks/@inngest","vendor-chunks/inngest","vendor-chunks/tr46","vendor-chunks/node-fetch","vendor-chunks/whatwg-url","vendor-chunks/hash.js","vendor-chunks/color-convert","vendor-chunks/chalk","vendor-chunks/webidl-conversions","vendor-chunks/color-name","vendor-chunks/serialize-error-cjs","vendor-chunks/inherits","vendor-chunks/json-stringify-safe","vendor-chunks/canonicalize","vendor-chunks/cross-fetch","vendor-chunks/minimalistic-assert"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fai-cover-letter-agent%2Froute&page=%2Fapi%2Fai-cover-letter-agent%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fai-cover-letter-agent%2Froute.tsx&appDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();