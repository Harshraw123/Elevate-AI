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
exports.id = "app/api/ai-resume-agent/route";
exports.ids = ["app/api/ai-resume-agent/route"];
exports.modules = {

/***/ "(rsc)/./app/api/ai-resume-agent/route.tsx":
/*!*******************************************!*\
  !*** ./app/api/ai-resume-agent/route.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _langchain_community_document_loaders_web_pdf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @langchain/community/document_loaders/web/pdf */ \"(rsc)/./node_modules/@langchain/community/document_loaders/web/pdf.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _inngest_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/inngest/client */ \"(rsc)/./inngest/client.ts\");\n/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! buffer */ \"buffer\");\n/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(buffer__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @clerk/nextjs/server */ \"(rsc)/./node_modules/@clerk/nextjs/dist/esm/app-router/server/currentUser.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ \"(rsc)/./node_modules/axios/lib/axios.js\");\n// app/api/ai-resume-agent/route.ts\n\n\n\n\n\n\nasync function POST(req) {\n    const formData = await req.formData();\n    const resumefile = formData.get(\"resumefile\");\n    const recordId = formData.get(\"recordId\");\n    if (!resumefile || !recordId) {\n        console.error(\"❌ Missing file or recordId\");\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Missing file or recordId\"\n        }, {\n            status: 400\n        });\n    }\n    console.log(\"🔹 Received resume file:\", resumefile.name);\n    const user = await (0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_4__.currentUser)();\n    const loader = new _langchain_community_document_loaders_web_pdf__WEBPACK_IMPORTED_MODULE_0__.WebPDFLoader(resumefile);\n    const docs = await loader.load();\n    console.log(\"Loaded documents:\", docs[0]);\n    //resume file ko blob me taki cloud pe ja ske\n    const arraybuffer = await resumefile.arrayBuffer();\n    const base64 = buffer__WEBPACK_IMPORTED_MODULE_3__.Buffer.from(arraybuffer).toString('base64');\n    const resultIds = await _inngest_client__WEBPACK_IMPORTED_MODULE_2__.inngest.send({\n        name: \"AiResumeAgent\",\n        data: {\n            recordId: recordId,\n            base64ResumeFile: base64,\n            pdfText: docs[0]?.pageContent,\n            userEmail: user?.primaryEmailAddress?.emailAddress\n        }\n    });\n    const runId = resultIds.ids[0];\n    let runStatus;\n    while(true){\n        runStatus = await getRuns(runId);\n        if (runStatus?.data[0]?.status === \"Completed\") break;\n        await new Promise((resolve)=>setTimeout(resolve, 500));\n    }\n    const content = runStatus.data[0].output?.response?.output?.[0]?.content || \"No response.\";\n    return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n        output: content\n    });\n}\nasync function getRuns(runId) {\n    const result = await axios__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(`${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`, {\n        headers: {\n            Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`\n        }\n    });\n    return result.data;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FpLXJlc3VtZS1hZ2VudC9yb3V0ZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBbUM7QUFFMEM7QUFDbEM7QUFDQTtBQUNYO0FBQ21CO0FBRXpCO0FBS25CLGVBQWVNLEtBQUtDLEdBQVk7SUFFbkMsTUFBTUMsV0FBVyxNQUFNRCxJQUFJQyxRQUFRO0lBQ25DLE1BQU1DLGFBQWtCRCxTQUFTRSxHQUFHLENBQUM7SUFDckMsTUFBTUMsV0FBV0gsU0FBU0UsR0FBRyxDQUFDO0lBRTlCLElBQUksQ0FBQ0QsY0FBYyxDQUFDRSxVQUFVO1FBQzVCQyxRQUFRQyxLQUFLLENBQUM7UUFDZCxPQUFPWixxREFBWUEsQ0FBQ2EsSUFBSSxDQUFDO1lBQUVELE9BQU87UUFBMkIsR0FBRztZQUFFRSxRQUFRO1FBQUk7SUFDaEY7SUFFQUgsUUFBUUksR0FBRyxDQUFDLDRCQUE0QlAsV0FBV1EsSUFBSTtJQUN2RCxNQUFNQyxPQUFLLE1BQU1kLGlFQUFXQTtJQUU1QixNQUFNZSxTQUFRLElBQUluQix1RkFBWUEsQ0FBQ1M7SUFDL0IsTUFBTVcsT0FBSyxNQUFNRCxPQUFPRSxJQUFJO0lBQzVCVCxRQUFRSSxHQUFHLENBQUMscUJBQW9CSSxJQUFJLENBQUMsRUFBRTtJQUV2Qyw2Q0FBNkM7SUFHakQsTUFBTUUsY0FBWSxNQUFNYixXQUFXYyxXQUFXO0lBQzlDLE1BQU1DLFNBQU9yQiwwQ0FBTUEsQ0FBQ3NCLElBQUksQ0FBQ0gsYUFBYUksUUFBUSxDQUFDO0lBRzdDLE1BQU1DLFlBQVUsTUFBTXpCLG9EQUFPQSxDQUFDMEIsSUFBSSxDQUFDO1FBQ2pDWCxNQUFLO1FBQ0xZLE1BQUs7WUFDTmxCLFVBQVNBO1lBR1RtQixrQkFBaUJOO1lBQ2pCTyxTQUFRWCxJQUFJLENBQUMsRUFBRSxFQUFFWTtZQUNqQkMsV0FBVWYsTUFBTWdCLHFCQUFxQkM7UUFDcEM7SUFFRjtJQUNGLE1BQU1DLFFBQU1ULFVBQVVVLEdBQUcsQ0FBQyxFQUFFO0lBQzVCLElBQUlDO0lBQ0osTUFBTSxLQUFLO1FBQ1RBLFlBQVUsTUFBTUMsUUFBUUg7UUFDeEIsSUFBR0UsV0FBV1QsSUFBSSxDQUFDLEVBQUUsRUFBRWQsV0FBUyxhQUM5QjtRQUNGLE1BQU0sSUFBSXlCLFFBQVFDLENBQUFBLFVBQVNDLFdBQVdELFNBQVE7SUFFaEQ7SUFDQSxNQUFNRSxVQUFVTCxVQUFVVCxJQUFJLENBQUMsRUFBRSxDQUFDZSxNQUFNLEVBQUVDLFVBQVVELFFBQVEsQ0FBQyxFQUFFLEVBQUVELFdBQVc7SUFDNUUsT0FBTzFDLHFEQUFZQSxDQUFDYSxJQUFJLENBQUM7UUFBRThCLFFBQVFEO0lBQVE7QUFJM0M7QUFFQyxlQUFlSixRQUFRSCxLQUFhO0lBQ25DLE1BQU1VLFNBQVMsTUFBTXpDLDZDQUFLQSxDQUFDSyxHQUFHLENBRTVCLEdBQUdxQyxRQUFRQyxHQUFHLENBQUNDLG1CQUFtQixDQUFDLFdBQVcsRUFBRWIsTUFBTSxLQUFLLENBQUMsRUFDNUQ7UUFDRWMsU0FBUztZQUNQQyxlQUFlLENBQUMsT0FBTyxFQUFFSixRQUFRQyxHQUFHLENBQUNJLG1CQUFtQixFQUFFO1FBQzVEO0lBQ0Y7SUFFRixPQUFPTixPQUFPakIsSUFBSTtBQUNwQiIsInNvdXJjZXMiOlsiL1VzZXJzL2hhcnNocmF3YXQvZmFzdC1uZXh0anMtdjIvQWktQ2FycmVyLUNvYWNoLUFnZW50L2FwcC9hcGkvYWktcmVzdW1lLWFnZW50L3JvdXRlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHAvYXBpL2FpLXJlc3VtZS1hZ2VudC9yb3V0ZS50c1xuXG5pbXBvcnQgeyBXZWJQREZMb2FkZXIgfSBmcm9tIFwiQGxhbmdjaGFpbi9jb21tdW5pdHkvZG9jdW1lbnRfbG9hZGVycy93ZWIvcGRmXCI7XG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbmltcG9ydCB7IGlubmdlc3QgfSBmcm9tIFwiQC9pbm5nZXN0L2NsaWVudFwiO1xuaW1wb3J0IHsgQnVmZmVyIH0gZnJvbSBcImJ1ZmZlclwiO1xuaW1wb3J0IHsgY3VycmVudFVzZXIgfSBmcm9tIFwiQGNsZXJrL25leHRqcy9zZXJ2ZXJcIjtcblxuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuXG5cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IFJlcXVlc3QpIHtcblxuICAgIGNvbnN0IGZvcm1EYXRhID0gYXdhaXQgcmVxLmZvcm1EYXRhKCk7XG4gICAgY29uc3QgcmVzdW1lZmlsZTogYW55ID0gZm9ybURhdGEuZ2V0KFwicmVzdW1lZmlsZVwiKTtcbiAgICBjb25zdCByZWNvcmRJZCA9IGZvcm1EYXRhLmdldChcInJlY29yZElkXCIpO1xuXG4gICAgaWYgKCFyZXN1bWVmaWxlIHx8ICFyZWNvcmRJZCkge1xuICAgICAgY29uc29sZS5lcnJvcihcIuKdjCBNaXNzaW5nIGZpbGUgb3IgcmVjb3JkSWRcIik7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJNaXNzaW5nIGZpbGUgb3IgcmVjb3JkSWRcIiB9LCB7IHN0YXR1czogNDAwIH0pO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKFwi8J+UuSBSZWNlaXZlZCByZXN1bWUgZmlsZTpcIiwgcmVzdW1lZmlsZS5uYW1lKTtcbiAgICBjb25zdCB1c2VyPWF3YWl0IGN1cnJlbnRVc2VyKCk7XG5cbiAgICBjb25zdCBsb2FkZXI9IG5ldyBXZWJQREZMb2FkZXIocmVzdW1lZmlsZSlcbiAgICBjb25zdCBkb2NzPWF3YWl0IGxvYWRlci5sb2FkKCk7XG4gICAgY29uc29sZS5sb2coXCJMb2FkZWQgZG9jdW1lbnRzOlwiLGRvY3NbMF0pXG5cbiAgICAvL3Jlc3VtZSBmaWxlIGtvIGJsb2IgbWUgdGFraSBjbG91ZCBwZSBqYSBza2VcblxuXG5jb25zdCBhcnJheWJ1ZmZlcj1hd2FpdCByZXN1bWVmaWxlLmFycmF5QnVmZmVyKCk7XG5jb25zdCBiYXNlNjQ9QnVmZmVyLmZyb20oYXJyYXlidWZmZXIpLnRvU3RyaW5nKCdiYXNlNjQnKTtcblxuXG4gIGNvbnN0IHJlc3VsdElkcz1hd2FpdCBpbm5nZXN0LnNlbmQoe1xuICAgIG5hbWU6XCJBaVJlc3VtZUFnZW50XCIsXG4gICAgZGF0YTp7XG4gICByZWNvcmRJZDpyZWNvcmRJZCxcbiAgXG4gIFxuICAgYmFzZTY0UmVzdW1lRmlsZTpiYXNlNjQsXG4gICBwZGZUZXh0OmRvY3NbMF0/LnBhZ2VDb250ZW50LFxuICAgdXNlckVtYWlsOnVzZXI/LnByaW1hcnlFbWFpbEFkZHJlc3M/LmVtYWlsQWRkcmVzc1xuICAgIH1cblxuICB9KVxuY29uc3QgcnVuSWQ9cmVzdWx0SWRzLmlkc1swXTtcbmxldCBydW5TdGF0dXM7XG53aGlsZSh0cnVlKXtcbiAgcnVuU3RhdHVzPWF3YWl0IGdldFJ1bnMocnVuSWQpXG4gIGlmKHJ1blN0YXR1cz8uZGF0YVswXT8uc3RhdHVzPT09XCJDb21wbGV0ZWRcIilcbiAgICBicmVhaztcbiAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZT0+c2V0VGltZW91dChyZXNvbHZlLDUwMCkpXG5cbn1cbmNvbnN0IGNvbnRlbnQgPSBydW5TdGF0dXMuZGF0YVswXS5vdXRwdXQ/LnJlc3BvbnNlPy5vdXRwdXQ/LlswXT8uY29udGVudCB8fCBcIk5vIHJlc3BvbnNlLlwiO1xucmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgb3V0cHV0OiBjb250ZW50IH0pO1xuXG5cblxufVxuXG4gYXN5bmMgZnVuY3Rpb24gZ2V0UnVucyhydW5JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGF4aW9zLmdldChcblxuICAgIGAke3Byb2Nlc3MuZW52LklOTkdFU1RfU0VSVkVSX0hPU1R9L3YxL2V2ZW50cy8ke3J1bklkfS9ydW5zYCxcbiAgICB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtwcm9jZXNzLmVudi5JTk5HRVNUX1NJR05JTkdfS0VZfWAsXG4gICAgICB9LFxuICAgIH1cbiAgKTtcbiAgcmV0dXJuIHJlc3VsdC5kYXRhO1xufVxuXG5cblxuXG5cblxuXG5cbiAgICAiXSwibmFtZXMiOlsiV2ViUERGTG9hZGVyIiwiTmV4dFJlc3BvbnNlIiwiaW5uZ2VzdCIsIkJ1ZmZlciIsImN1cnJlbnRVc2VyIiwiYXhpb3MiLCJQT1NUIiwicmVxIiwiZm9ybURhdGEiLCJyZXN1bWVmaWxlIiwiZ2V0IiwicmVjb3JkSWQiLCJjb25zb2xlIiwiZXJyb3IiLCJqc29uIiwic3RhdHVzIiwibG9nIiwibmFtZSIsInVzZXIiLCJsb2FkZXIiLCJkb2NzIiwibG9hZCIsImFycmF5YnVmZmVyIiwiYXJyYXlCdWZmZXIiLCJiYXNlNjQiLCJmcm9tIiwidG9TdHJpbmciLCJyZXN1bHRJZHMiLCJzZW5kIiwiZGF0YSIsImJhc2U2NFJlc3VtZUZpbGUiLCJwZGZUZXh0IiwicGFnZUNvbnRlbnQiLCJ1c2VyRW1haWwiLCJwcmltYXJ5RW1haWxBZGRyZXNzIiwiZW1haWxBZGRyZXNzIiwicnVuSWQiLCJpZHMiLCJydW5TdGF0dXMiLCJnZXRSdW5zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwiY29udGVudCIsIm91dHB1dCIsInJlc3BvbnNlIiwicmVzdWx0IiwicHJvY2VzcyIsImVudiIsIklOTkdFU1RfU0VSVkVSX0hPU1QiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsIklOTkdFU1RfU0lHTklOR19LRVkiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/ai-resume-agent/route.tsx\n");

/***/ }),

/***/ "(rsc)/./inngest/client.ts":
/*!***************************!*\
  !*** ./inngest/client.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   inngest: () => (/* binding */ inngest)\n/* harmony export */ });\n/* harmony import */ var inngest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inngest */ \"(rsc)/./node_modules/inngest/index.js\");\n/* harmony import */ var inngest__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inngest__WEBPACK_IMPORTED_MODULE_0__);\n\n// Create a client to send and receive events\nconst inngest = new inngest__WEBPACK_IMPORTED_MODULE_0__.Inngest({\n    id: \"Ai-Carrer-Coach\"\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9pbm5nZXN0L2NsaWVudC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBa0M7QUFFbEMsNkNBQTZDO0FBQ3RDLE1BQU1DLFVBQVUsSUFBSUQsNENBQU9BLENBQUM7SUFBRUUsSUFBSTtBQUFrQixHQUFHIiwic291cmNlcyI6WyIvVXNlcnMvaGFyc2hyYXdhdC9mYXN0LW5leHRqcy12Mi9BaS1DYXJyZXItQ29hY2gtQWdlbnQvaW5uZ2VzdC9jbGllbnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5uZ2VzdCB9IGZyb20gXCJpbm5nZXN0XCI7XG5cbi8vIENyZWF0ZSBhIGNsaWVudCB0byBzZW5kIGFuZCByZWNlaXZlIGV2ZW50c1xuZXhwb3J0IGNvbnN0IGlubmdlc3QgPSBuZXcgSW5uZ2VzdCh7IGlkOiBcIkFpLUNhcnJlci1Db2FjaFwiIH0pO1xuIl0sIm5hbWVzIjpbIklubmdlc3QiLCJpbm5nZXN0IiwiaWQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./inngest/client.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fai-resume-agent%2Froute&page=%2Fapi%2Fai-resume-agent%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fai-resume-agent%2Froute.tsx&appDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fai-resume-agent%2Froute&page=%2Fapi%2Fai-resume-agent%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fai-resume-agent%2Froute.tsx&appDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_harshrawat_fast_nextjs_v2_Ai_Carrer_Coach_Agent_app_api_ai_resume_agent_route_tsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/ai-resume-agent/route.tsx */ \"(rsc)/./app/api/ai-resume-agent/route.tsx\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/ai-resume-agent/route\",\n        pathname: \"/api/ai-resume-agent\",\n        filename: \"route\",\n        bundlePath: \"app/api/ai-resume-agent/route\"\n    },\n    resolvedPagePath: \"/Users/harshrawat/fast-nextjs-v2/Ai-Carrer-Coach-Agent/app/api/ai-resume-agent/route.tsx\",\n    nextConfigOutput,\n    userland: _Users_harshrawat_fast_nextjs_v2_Ai_Carrer_Coach_Agent_app_api_ai_resume_agent_route_tsx__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhaS1yZXN1bWUtYWdlbnQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFpLXJlc3VtZS1hZ2VudCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmFpLXJlc3VtZS1hZ2VudCUyRnJvdXRlLnRzeCZhcHBEaXI9JTJGVXNlcnMlMkZoYXJzaHJhd2F0JTJGZmFzdC1uZXh0anMtdjIlMkZBaS1DYXJyZXItQ29hY2gtQWdlbnQlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGaGFyc2hyYXdhdCUyRmZhc3QtbmV4dGpzLXYyJTJGQWktQ2FycmVyLUNvYWNoLUFnZW50JmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUN3QztBQUNySDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2hhcnNocmF3YXQvZmFzdC1uZXh0anMtdjIvQWktQ2FycmVyLUNvYWNoLUFnZW50L2FwcC9hcGkvYWktcmVzdW1lLWFnZW50L3JvdXRlLnRzeFwiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYWktcmVzdW1lLWFnZW50L3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYWktcmVzdW1lLWFnZW50XCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9haS1yZXN1bWUtYWdlbnQvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvaGFyc2hyYXdhdC9mYXN0LW5leHRqcy12Mi9BaS1DYXJyZXItQ29hY2gtQWdlbnQvYXBwL2FwaS9haS1yZXN1bWUtYWdlbnQvcm91dGUudHN4XCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fai-resume-agent%2Froute&page=%2Fapi%2Fai-resume-agent%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fai-resume-agent%2Froute.tsx&appDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/@clerk","vendor-chunks/next","vendor-chunks/@opentelemetry","vendor-chunks/tslib","vendor-chunks/cookie","vendor-chunks/map-obj","vendor-chunks/no-case","vendor-chunks/lower-case","vendor-chunks/snakecase-keys","vendor-chunks/snake-case","vendor-chunks/dot-case","vendor-chunks/axios","vendor-chunks/mime-db","vendor-chunks/follow-redirects","vendor-chunks/debug","vendor-chunks/form-data","vendor-chunks/asynckit","vendor-chunks/combined-stream","vendor-chunks/mime-types","vendor-chunks/proxy-from-env","vendor-chunks/ms","vendor-chunks/supports-color","vendor-chunks/delayed-stream","vendor-chunks/has-flag","vendor-chunks/@inngest","vendor-chunks/zod","vendor-chunks/inngest","vendor-chunks/tr46","vendor-chunks/zod-to-json-schema","vendor-chunks/node-fetch","vendor-chunks/whatwg-url","vendor-chunks/hash.js","vendor-chunks/color-convert","vendor-chunks/chalk","vendor-chunks/webidl-conversions","vendor-chunks/color-name","vendor-chunks/serialize-error-cjs","vendor-chunks/inherits","vendor-chunks/json-stringify-safe","vendor-chunks/canonicalize","vendor-chunks/cross-fetch","vendor-chunks/minimalistic-assert","vendor-chunks/@langchain","vendor-chunks/semver","vendor-chunks/langsmith","vendor-chunks/@cfworker","vendor-chunks/retry","vendor-chunks/p-queue","vendor-chunks/p-timeout","vendor-chunks/p-retry","vendor-chunks/p-finally","vendor-chunks/eventemitter3","vendor-chunks/decamelize","vendor-chunks/camelcase"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fai-resume-agent%2Froute&page=%2Fapi%2Fai-resume-agent%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fai-resume-agent%2Froute.tsx&appDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fharshrawat%2Ffast-nextjs-v2%2FAi-Carrer-Coach-Agent&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();