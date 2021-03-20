"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = express_1.default();
// Middlewares
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
// Create Users
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, email, phone } = req.body;
    try {
        const result = yield prisma.myUser.create({
            data: {
                user,
                email,
                phone
            }
        });
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
}));
// To show Users
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUser = yield prisma.myUser.findMany();
        return res.json(allUser);
    }
    catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
}));
// Update Users
app.put('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { user, email, phone } = req.body;
    try {
        const updateUser = yield prisma.myUser.update({
            where: {
                id: Number(id)
            },
            data: {
                user,
                email,
                phone
            }
        });
        return res.json(updateUser);
    }
    catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
}));
// Delete Users
app.delete('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleteUser = yield prisma.myUser.delete({
            where: {
                id: Number(id)
            }
        });
        return res.json(deleteUser);
    }
    catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
}));
app.listen(port, () => {
    console.log(`Server on port:${port}`);
});
//# sourceMappingURL=index.js.map