"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAr7idFromToken = void 0;
const getUserAr7idFromToken = (request) => {
    return new Promise((resolve, reject) => {
        try {
            const { authenticationToken } = request.body;
        }
        catch (error) { }
    });
};
exports.getUserAr7idFromToken = getUserAr7idFromToken;
