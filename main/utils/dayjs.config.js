"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
require("dayjs/locale/pt-br");
dayjs_1.default.locale("pt-br");
exports.default = dayjs_1.default;
