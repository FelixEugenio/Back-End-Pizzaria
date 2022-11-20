import { Router } from "express";
import multer from "multer";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailsUserController } from "./controllers/user/DetailsUserController";
import { CategoryController } from "./controllers/categories/CategoriesController";
import { ListCategoryController } from "./controllers/categories/ListCategoryController";
import { CreateProductController } from "./controllers/products/CreateProductController";
import { ListByCategoryController } from "./controllers/products/ListByCategoryController";
import { CreateOrderController } from "./controllers/orders/CreateOrderController";
import { RemoveOrderController } from "./controllers/orders/RemoveOrderController";
import { AddItemController } from "./controllers/orders/AddItemController";
import { RemoveItemController } from "./controllers/orders/RemoveItemController";
import { SendOrderController } from "./controllers/orders/SendOrderController";
import { ListOrderController } from "./controllers/orders/ListOrderController";
import { DetailsOrderController } from "./controllers/orders/DetailsOrderController";
import { FinishOrderController } from "./controllers/orders/FinishOrderController";
import uploadConfig from './config/multer';

import {isAuthtenticaded }  from './middlewares/isAuthenticaded'

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"))

// rotas users
router.post('/users', new CreateUserController().handle);
router.post('/sessions', new AuthUserController().handle);
router.get('/me',isAuthtenticaded, new DetailsUserController().handle);

// rotas categorias
router.post('/category',isAuthtenticaded, new CategoryController().handle);
router.get('/category',isAuthtenticaded, new ListCategoryController().handle);

// rotas dos produtos 
router.post('/product',isAuthtenticaded,upload.single('file'),new CreateProductController().handle)
router.get('/category/product',isAuthtenticaded, new ListByCategoryController().handle);

// rota dos orders 
router.post('/order',isAuthtenticaded, new CreateOrderController().handle);
router.delete('/order',isAuthtenticaded,new RemoveOrderController().handle);
router.post('/order/add',isAuthtenticaded, new AddItemController().handle);
router.delete('/order/remove',isAuthtenticaded,new RemoveItemController().handle);
router.put('/order/send',isAuthtenticaded, new SendOrderController().handle);
router.get('/order/list',isAuthtenticaded, new ListOrderController().handle);
router.get('/order/details',isAuthtenticaded, new DetailsOrderController().handle);
router.put('/order/finish',isAuthtenticaded, new FinishOrderController().handle);


export {router};