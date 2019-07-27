"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlPort = process.env.GRAPHQL_PORT || 5000;
exports.jwtSecret = process.env.JWT_KEY || 'secret_key';
